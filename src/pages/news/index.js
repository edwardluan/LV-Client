import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNewsPosts } from "../../redux/actions/postAction";
import NewsCard from "../../components/newsPost/newsCard";
import UserCard from "../../components/UserCard";
import FollowBtn from "../../components/profileUser/FollowBtn";
import moment from "moment";
import { GLOBALTYPES } from "../../redux/actions/globalTyles";
import UserCardVertical from "../../components/UserCardVertical";

const Index = () => {
  const auth = useSelector((state) => state.auth);
  const newsPost = useSelector((state) => state.newsPost);
  const suggestions = useSelector((state) => state.suggestions);

  const dispatch = useDispatch();
  const [top10Post, setTop10Post] = useState([]);
  const [currentTime, setCurrentTime] = useState(moment());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(moment());
    }, 60000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    if (newsPost) {
      const postCp = [...newsPost.posts];
      const userPosts = postCp.filter((post) => post.user.roles === "user");
      const sortedPost = userPosts.sort(
        (a, b) => b.like.length - a.like.length
      );
      const top10 = sortedPost.slice(0, 10);
      setTop10Post(top10);
    }
  }, [newsPost]);

  useEffect(() => {
    dispatch({ type: GLOBALTYPES.NOTIFY, payload: { loading: true } });
    dispatch(getNewsPosts(auth.token));
    dispatch({ type: GLOBALTYPES.NOTIFY, payload: { loading: false } });
  }, [auth, dispatch]);

  return (
    <div className="news_post">
      <div className="news_times">{currentTime.format("YYYY-MM-DD HH:mm")}</div>
      <div>
        <h5 className="title_post">Chuyên gia đầu nghành</h5>
        <div
          className="suggestions d-flex justify-content-center"
          style={{ overflow: "auto" }}
        >
          {suggestions.users
            .filter((item) => item.roles === "expert")
            .map((user) => (
              <UserCardVertical key={user._id} user={user}>
                <FollowBtn user={user} />
              </UserCardVertical>
            ))}
        </div>
      </div>
      <div className="expert_post">
        <h5 className="title_post">Bài viết từ chuyên gia</h5>
        {newsPost.posts
          .filter((post) => post.user.roles === "expert")
          .map((post, index) => (
            <NewsCard key={post._id} posts={post} />
          ))}
      </div>
      <div>
        <h5 className="title_post">Người dùng hàng đầu</h5>
        <div
          className="suggestions d-flex justify-content-center"
          style={{ overflow: "auto" }}
        >
          {suggestions.users
            .filter((item) => item.roles === "user")
            .map((user) => (
              <UserCardVertical key={user._id} user={user}>
                <FollowBtn user={user} />
              </UserCardVertical>
            ))}
        </div>
      </div>
      <div className="user_post">
        <h5 className="title_post">Nổi bật từ người dùng</h5>
        {top10Post.map((post, index) => (
          <NewsCard key={post._id} posts={post} />
        ))}
      </div>
    </div>
  );
};

export default Index;
