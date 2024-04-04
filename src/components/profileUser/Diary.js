import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GLOBALTYPES } from "../../redux/actions/globalTyles";
import { imageShow, videoShow } from "../../untils/mediaShow";
import { createDiary } from "../../redux/actions/diaryAction";

const Diary = ({ id, profile, setOnDiary }) => {

  const auth = useSelector((state) => state.auth)

  const dispatch = useDispatch();
  const [content, setContent] = useState("");
  const [images, setImages] = useState([]);
  const [posts, setPosts] = useState([]);
  const [arrId, setArrId] = useState([]);

  const handleChangePost = () => {
    const foundData = profile.posts.find((data) => data._id === id);

    if (foundData) {
      setPosts(foundData.posts);
    }
  }

  const handlleChangeImages = (e) => {
    const files = [...e.target.files];
    let err = "";
    let newImgs = [];

    files.forEach((file) => {
      if (!file) return (err = "File không tồn tại !");
      if (file.size > 1024 * 1024 * 5) {
        return (err = "Dung lượng file quá lớn !");
      }

      return newImgs.push(file);
    });
    if (err) dispatch({ type: GLOBALTYPES.NOTIFY, payload: { err: err } });
    setImages([...newImgs]);
  };

  const handleCheckPost = (postId) => {
    if (arrId.includes(postId)) {
      setArrId(arrId.filter(id => id !== postId));
    } else {
      setArrId([...arrId, postId]);
    }
  };

  const delImage = (index) => {
    const newArr = [...images];
    newArr.splice(index, 1);
    setImages(newArr);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createDiary(({ content, images, arrId, auth })))
    setOnDiary(false)
  }

  return (
    <div className="d-flex justify-content-center">
      <div className="status_modal">
        <form onSubmit={handleSubmit}>
          <div className="status_title">
            <h5 className="m-0">Thêm nhật ký mới</h5>
            <span onClick={() => setOnDiary(false)}>&times;</span>
          </div>
          <div className="status_container">
            <textarea
              name="content"
              placeholder="Nội dung"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <div className="show_imgs">
              {images.map((img, index) => (
                <div key={index} id="file_img">
                  {img.url ? (
                    <>
                      {img.url.match(/video/i)
                        ? videoShow(img.url)
                        : imageShow(img.url)}
                    </>
                  ) : (
                    <>
                      {img.type.match(/video/i)
                        ? videoShow(URL.createObjectURL(img))
                        : imageShow(URL.createObjectURL(img))}
                    </>
                  )}
                  <span onClick={() => delImage(index)}>&times;</span>
                </div>
              ))}
            </div>
            <div className="show_post">
              {posts.map((post, index) => (
                <div key={post._id} className="d-flex justify-content-between">
                  <div>{post.desc.slice(0, 30)}</div>
                  {arrId.includes(post._id) && (
                    <span>Giai đoạn: {arrId.indexOf(post._id) + 1}</span>
                  )}
                  <input
                    type="checkbox"
                    checked={arrId.includes(post._id)}
                    onChange={() => {
                      handleCheckPost(post._id);
                    }}
                  />
                </div>
              ))}
            </div>
            <div className="input_images">
              <div className="file_upload">
                <i className="fas fa-camera" />
                <input
                  type="file"
                  name="file"
                  id="file"
                  accept="image/*"
                  onChange={handlleChangeImages}
                />
              </div>
              <i className="fas fa-book" onClick={() => handleChangePost()} />
            </div>

            <button className="btn btn-secondary w-100">Đăng</button>
          </div>
        </form>
      </div>
      <div>
      </div>
    </div>
  );
};

export default Diary;
