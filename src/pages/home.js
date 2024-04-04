import React, { useState } from "react";
import Status from "../components/home/Status";
import Posts from "../components/home/Posts";
import { useSelector } from "react-redux";
import RightSideBar from "../components/home/RightSideBar";
import Diaries from "../components/home/Diaries";

const HomePage = () => {
  const postHome = useSelector((state) => state.postHome);

  const [postsBtn, setPostsBtn] = useState(false);

  return (
    <div>
      <div className="home row mx-0">
        <div>
          <Status />
          <RightSideBar />
          {postHome.loading ? (
            <h5>Đang tải dữ liệu ...</h5>
          ) : postHome.result === 0 ? (
            <h1 className="text-center">Không có bài viết nào !</h1>
          ) : (
            <>
              <div
                onClick={() => setPostsBtn(!postsBtn)}
                className="switch_post mt-4"
              >
                <span>
                  Xem {postsBtn ? "bài viết" : "nhật ký"} từ những người bạn đã
                  theo dõi !!
                </span>
              </div>
              {postsBtn ? <Diaries /> : <Posts />}
            </>
          )}
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default HomePage;
