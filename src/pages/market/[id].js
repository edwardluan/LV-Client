import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getProduct } from "../../redux/actions/productAction";
import Carousel from "../../components/Carousel";
import Avatar from "../../components/Avatar";
import { MESS_TYPES } from "../../redux/actions/messageAction";
import { addMessage } from "../../redux/actions/messageAction";

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth);
  const productDetail = useSelector((state) => state.market.product);
  const socket = useSelector((state) => state.socket);

  useEffect(() => {
    dispatch(getProduct({ productDetail, auth, id }));
    if (productDetail.length > 0) {
      const newArr = productDetail.filter((product) => product._id === id);
      setProduct(newArr);
    }
  }, [dispatch, auth, id, productDetail]);

  const handleMessage = () => {
    dispatch({
      type: MESS_TYPES.ADD_USER,
      payload: { ...product[0].user, text: "", media: [] },
    });
    navigate(`/message/${product[0].user._id}`);

    const msg = {
      sender: auth.user._id,
      recipient: product[0].user._id,
      text: "Tôi muốn biết thêm thông tin về sản phẩm: " + product[0].productName,
      media: product[0].img,
      createdAt: new Date().toISOString(),
    };
    dispatch(addMessage({ msg, auth, socket }));
  };

  return (
    <div className="card_detail">
      {product.map((item) => (
        <div key={item._id} className="row">
          {/* Left product detail */}
          <div className="col-md-8">
            <div className="carousel_detail_product">
              {item.img.length > 0 && (
                <Carousel images={item.img} id={item._id} />
              )}
            </div>
            <h3 className="py-2">{item.productName}</h3>
            <h5 className="product_card_price">{item.price}</h5>
            <br />
            <h5>Mô tả sản phẩm</h5>
            <p>{item.desc}</p>
          </div>
          {/* Right product detail */}
          <div className="col-md-4">
            <div>
              <div className="d-flex align-items-center">
                <Avatar src={item.user.profilePicture} size="big-avatar" />
                <div className="card_name m-2">
                  <h6 className="m-0">
                    <Link
                      to={`/user/${item.user._id}`}
                      className="text-dark"
                      style={{ textDecoration: "none" }}
                    >
                      {item.user.username}
                    </Link>
                    {item.user.roles === "expert" && (
                      <i
                        className="fa-solid fa-circle-check text-success"
                        style={{ fontSize: "10px", paddingLeft: "5px" }}
                      ></i>
                    )}
                  </h6>
                  <small>
                    <i className="fas fa-circle text-success"></i> Đang hoạt
                    động
                  </small>
                </div>
              </div>
              <div className="contact_user">
                <h5>Liên hệ người bán</h5>
                <div className="contact_phone">
                  <i className="fas fa-phone-alt fa-rotate-90"></i>
                  <span>{item.user.phoneNumber}</span>
                </div>
                <div className="contact_message" onClick={handleMessage} style={{cursor: "pointer"}}>
                  <i className="fas fa-comments"></i>
                  <span>Nhắn tin</span>
                </div>
              </div>
              <div className="attention_product">
                <i className="fas fa-angle-double-right"></i>
                <i>
                  Chân thành và trung thực là yếu tố quan trọng để xây dựng lòng tin.
                  Hãy để chúng tôi lo lắng về việc sửa dồ cho bạn.
                </i>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Product;
