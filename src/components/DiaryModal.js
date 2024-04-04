import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GLOBALTYPES } from "../redux/actions/globalTyles";
import { imageShow, videoShow } from "../untils/mediaShow";
import { useEffect } from "react";
import { updateDiary } from "../redux/actions/diaryAction";
import { getDataAPI } from "../untils/fetchData";

const DiaryModal = ({ diary, setOnEdit }) => {
  const auth = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const [content, setContent] = useState("");
  const [images, setImages] = useState([]);
  const [posts, setPosts] = useState([]);
  const [arrIdPost, setArrIdPost] = useState([]);

  const handleChangePost = async () => {
    const resPosts = await getDataAPI(
      `/post/user_posts/${auth.user._id}`,
      auth.token
    );
    if (resPosts) {
      setPosts(resPosts.data.posts);
    }
  };

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
    if (arrIdPost.includes(postId)) {
      setArrIdPost(arrIdPost.filter((id) => id !== postId));
    } else {
      setArrIdPost([...arrIdPost, postId]);
    }
  };

  const delImage = (index) => {
    const newArr = [...images];
    newArr.splice(index, 1);
    setImages(newArr);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateDiary({ content, images, arrIdPost, auth, diary }));

    setOnEdit(false)

  };

  useEffect(() => {
    setContent(diary.text);
    setImages(diary.media);
    const recipientIds = diary.recipients.map((recipient) => recipient._id);
    setArrIdPost(recipientIds);
  }, [diary.media, diary.recipients, diary.text]);

  return (
    <div className="d-flex justify-content-center">
      <div className="status_modal">
        <form onSubmit={handleSubmit}>
          <div className="status_title">
            <h5 className="m-0">Cập nhật nhật ký</h5>
            <span onClick={() => setOnEdit(false)}>&times;</span>
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
                  {arrIdPost.includes(post._id) && (
                    <span>Giai đoạn: {arrIdPost.indexOf(post._id) + 1}</span>
                  )}
                  <input
                    type="checkbox"
                    checked={arrIdPost.includes(post._id)}
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
    </div>
  );
};

export default DiaryModal;
