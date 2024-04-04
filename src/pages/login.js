import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { login } from "../redux/actions/authAction";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Logo from "../images/logo.png";

const LoginPage = () => {
  const initialState = { phoneNumber: "", password: "" };
  const [userData, setUserData] = useState(initialState);
  const { phoneNumber, password } = userData;

  const navigate = useNavigate();

  const [typePass, setTypePass] = useState(false);
  const dispatch = useDispatch();
  const notify = useSelector((state) => state.notify?.err);
  const auth = useSelector((state) => state.auth?.token);

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(userData));
  };

  useEffect(() => {
    if (auth) {
      navigate("/");
    }
  });

  return (
    <div className="login_page">
      <form onSubmit={handleSubmit}>
        <img src={Logo} alt="logo" className="logo_login" />
        <div className="mb-3">
          <label htmlFor="phoneNumberInput" className="form-label">
            Số điện thoại
          </label>
          <input
            type="text"
            className="form-control"
            id="phoneNumberInput"
            aria-describedby="phoneNumberHelp"
            onChange={handleChangeInput}
            value={phoneNumber}
            name="phoneNumber"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Mật khẩu
          </label>
          <div className="pass">
            <input
              type={typePass ? "text" : "password"}
              className="form-control"
              id="exampleInputPassword1"
              onChange={handleChangeInput}
              value={password}
              name="password"
            />
            <small onClick={() => setTypePass(!typePass)}>
              {typePass ? <i className="far fa-eye-slash"></i> : <i className="fas fa-eye"></i>}
            </small>
          </div>
        </div>
        <small className="text-danger">{notify}</small>
        <button
          type="submit"
          className="login_btn"
          disabled={phoneNumber && password ? false : true}
        >
          Đăng nhập
        </button>
        <p className="my-4 text-center">
          Bạn chưa có tài khoản?{" "}
          <Link to="/register" style={{ textDecoration: "none" }}>
            Đăng ký
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
