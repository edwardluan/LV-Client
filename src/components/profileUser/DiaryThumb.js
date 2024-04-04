import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const DiaryThumb = () => {

  const diary = useSelector((state) => state.diary?.diaries)

  if (diary.length === 0) return <h5>Chưa có nhật ký !</h5>


  return (
    <div className="diary_thumb">
      {diary.length > 0 && (
        diary.map((item) => (
          <Link
            to={`/diary/${item._id}`}
            key={item._id}
            style={{ textDecoration: "none" }}
          >
            <div className="diary_thumb_display">
              {item.media.length > 0 ? (
                item.media[0].url.match(/video/i) ? (
                  <video
                    controls
                    src={item.media[0].url}
                    alt={item.media[0].url}
                  />
                ) : (
                  <img src={item.media[0].url} alt={item.media[0].url} />
                )
              ) : (
                <img
                  src={item.user.profilePicture}
                  alt={item.user.profilePicture}
                />
              )}
              <div className="diary_thumb_menu">
                <span style={{ color: "#fff" }}>{item.text.slice(0, 50)}</span>
              </div>
            </div>
          </Link>
        ))
      )}
    </div>
  );
};

export default DiaryThumb;
