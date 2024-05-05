import React from "react";
import Logo from "../images/logo.png";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { GLOBALTYPES } from "../redux/actions/globalTyles";
import { deleteProduct } from "../redux/actions/productAction";
import { MESS_TYPES, addMessage } from "../redux/actions/messageAction";

const ProductCard = ({ product }) => {
  const auth = useSelector((state) => state.auth);
  const socket = useSelector((state) => state.socket);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleUpdateProduct = () => {
    dispatch({
      type: GLOBALTYPES.STATUS,
      payload: { ...product, onEditProduct: true },
    });
  };

  const handleDeleteProduct = () => {
    const confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này?");
    if (confirmDelete) {
      dispatch(deleteProduct({ product, auth }));
      return navigate(window.location.pathname);
    }
  };

  const handleGetProduct = () => {
    navigate(`/market/${product._id}`);
  };

  const handleMessage = () => {
    dispatch({
      type: MESS_TYPES.ADD_USER,
      payload: { ...product.user, text: "", media: [] },
    });
    navigate(`/message/${product.user._id}`);

    const msg = {
      sender: auth.user._id,
      recipient: product.user._id,
      text: "Tôi muốn biết thêm thông tin về dịch vụ: " + product.productName,
      media: product.img,
      createdAt: new Date().toISOString(),
    };

    dispatch(addMessage({ msg, auth, socket }));
  };

  return (
    <div className="product_card">
      <div className="product_card_header">
        <img
          src={product.img[0] ? product.img[0].url : Logo}
          alt="product_pic"
        />
        <div className="btn_product px-2">
          {product.user._id === auth.user._id ? (
            <div>
              <button
                className="btn btn-info mb-2 w-50"
                onClick={handleUpdateProduct}
              >
                <i className="fas fa-pencil-alt"></i>
              </button>
              <button
                className="btn btn-danger mb-2 w-50"
                onClick={handleDeleteProduct}
              >
                <i className="fas fa-trash"></i>
              </button>
            </div>
          ) : (
            <button className="btn btn-info mb-2 w-100" onClick={handleMessage}>
              Nhắn với người bán
            </button>
          )}
          <button
            className="btn btn-secondary w-100"
            onClick={handleGetProduct}
          >
            Xem chi tiết
          </button>
        </div>
      </div>
      <div className="product_card_body">
        <div className="product_card_title">{product.productName}</div>
        <div className="product_card_content">
          <div className="product_card_price">{product.price}</div>
          <div>{product.typeProduct}</div>
          <div>
            <i className="fas fa-map-marker-alt"></i>
            <small style={{ paddingLeft: "5px" }}>{product.address}</small>
          </div>
          <span className="text-muted">
            {moment(product.createdAt).fromNow()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
