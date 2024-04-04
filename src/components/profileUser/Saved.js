import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PostThumb from "./PostThumb";
import LoadMoreBtn from "../LoadMoreBtn";
import { getDataAPI } from "../../untils/fetchData";
import { GLOBALTYPES } from "../../redux/actions/globalTyles";

const Saved = ({ auth, dispatch }) => {
  const [savePosts, setSavePosts] = useState([]);
  const [saveDiaries, setSaveDiaries] = useState([]);

  const [postTab, setPostTab] = useState(true);

  const [result, setResult] = useState(9);
  const [page, setPage] = useState(2);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    setLoad(true);
    getDataAPI("/post/getSavePosts/result", auth.token)
      .then((res) => {
        setSavePosts(res.data.savePosts);
        setResult(res.data.result);
        setLoad(false);
      })
      .catch((err) => {
        dispatch({
          type: GLOBALTYPES.NOTIFY,
          payload: { err: err.response.data.msg },
        });
      });

    return () => setSavePosts([]);
  }, [auth.token, dispatch]);

  useEffect(() => {
    setLoad(true);
    getDataAPI("/diary/getSaveDiaries/result", auth.token)
      .then((res) => {
        setSaveDiaries(res.data.savedDiaries);
        setLoad(false);
      })
      .catch((err) => {
        dispatch({
          type: GLOBALTYPES.NOTIFY,
          payload: { err: err.response.data.msg },
        });
      });
    return () => setSaveDiaries([]);
  }, [auth.token, dispatch]);

  const handleLoadMore = async () => {
    setLoad(true);
    const res = await getDataAPI(
      `/post/getSavePosts/result?limit=${page * 9}`,
      auth.token
    );
    setSavePosts(res.data.savePosts);
    setResult(res.data.result);
    setPage(page + 1);
    setLoad(false);
  };

  return (
    <div>
      <div className="profile_tab" style={{border: "none"}}>
        <button
          className={postTab ? "active" : ""}
          onClick={() => setPostTab(true)}
        >
          Bài viết
        </button>
        <button
          className={postTab ? "" : "active"}
          onClick={() => setPostTab(false)}
        >
          Nhật ký
        </button>
      </div>

      {postTab ? (
        <PostThumb posts={savePosts} result={result} />
      ) : (
        <div className="diary_thumb">
          {saveDiaries.length > 0 ? (
            saveDiaries.map((item) => (
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
                    <span style={{ color: "#fff" }}>
                      {item.text.slice(0, 50)}
                    </span>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <h5>Chưa có nhật ký!</h5>
          )}
        </div>
      )}

      {load && <p>Loading ...</p>}

      <LoadMoreBtn
        result={result}
        page={page}
        load={load}
        handleLoadMore={handleLoadMore}
      />
    </div>
  );
};

export default Saved;
