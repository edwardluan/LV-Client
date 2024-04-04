import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkImage } from "../../untils/imageUpload";
import { GLOBALTYPES } from "../../redux/actions/globalTyles";
import { updateUserProfile } from "../../redux/actions/profileUserAction";

const EditProfile = ({ setOnEdit }) => {
  const initState = {
    username: "",
    phoneNumber: "",
    password: "",
    desc: "",
  };

  const dispatch = useDispatch();
  const [userData, setUserData] = useState(initState);
  const { username, phoneNumber, password, desc } = userData;
  const [profilePicture, setProfilePicture] = useState("");

  const currentUser = useSelector((state) => state.auth?.user);
  const auth = useSelector((state) => state.auth);

  const changeAvatar = (e) => {
    const file = e.target.files[0];
    const err = checkImage(file);
    if (err)
      return dispatch({ type: GLOBALTYPES.NOTIFY, payload: { error: err } });
    setProfilePicture(file);
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      updateUserProfile({
        userData,
        profilePicture,
        auth,
      })
    );
  };

  useEffect(() => {
    setUserData(currentUser);
    console.log(currentUser);
  }, [currentUser]);

  return (
    <div className="edit_profile">
      <button
        className="btn btn-danger btn_close"
        onClick={() => setOnEdit(false)}
      >
        Close
      </button>
      <form onSubmit={handleSubmit}>
        <div className="info_profilePicture">
          <img
            src={
              profilePicture
                ? URL.createObjectURL(profilePicture)
                : currentUser.profilePicture
            }
            alt="profilePicture"
            height={200}
            width={200}
          />
          <span>
            <i className="fas fa-camera"></i>
            <p>Chỉnh sửa</p>
            <input
              type="file"
              name="file"
              id="file_up"
              accept="image/*"
              onChange={changeAvatar}
            />
          </span>
        </div>
        <div className="form-group my-2">
          <label htmlFor="username">Tên</label>
          <div className="position-relative">
            <input
              type="text"
              className="form-control"
              id="username"
              name="username"
              value={username}
              onChange={handleInput}
            />
            <small
              className="text-danger position-absolute"
              style={{
                top: "50%",
                right: "5px",
                transform: "translateY(-50%)",
              }}
            >
              {username.length}/25
            </small>
          </div>
        </div>

        <div className="form-group my-2">
          <label htmlFor="phoneNumber">Số điện thoại</label>
          <input
            type="text"
            name="phoneNumber"
            value={phoneNumber}
            className="form-control"
            onChange={handleInput}
          />
        </div>

        <div className="form-group my-2">
          <label htmlFor="password">Mật khẩu</label>
          <input
            type="text"
            name="password"
            value={password}
            className="form-control"
            onChange={handleInput}
          />
        </div>

        <div className="form-group my-2">
          <label htmlFor="desc">Thông tin</label>
          <textarea
            type="text"
            name="desc"
            value={desc}
            cols={30}
            rows={4}
            className="form-control"
            onChange={handleInput}
          />
        </div>
        <button className="btn btn-info w-100 mt-2" type="submit">
          Lưu
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
