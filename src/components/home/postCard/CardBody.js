import React, { useState } from "react";
import Carousel from "../../Carousel";

const CardBody = ({ post }) => {

    const [readMore, setReadMore] = useState(false)

    return (
        <div className="card_body">
            <div className="content">
                <span>
                    {
                        post.desc.length < 100
                            ? post.desc
                            : readMore ? post.desc + " " : post.desc.slice(0, 200) + " ..."
                    }
                </span>
                {
                    post.desc.length > 100 &&
                    <span className="readMore" onClick={() => setReadMore(!readMore)}>
                        {readMore ? "Ẩn bớt" : "Xem thêm"}
                    </span>
                }
            </div>
            <small>{post.hashtag}</small>
            {
                post.img.length > 0 && <Carousel images={post.img} id={post._id} />
            }
        </div>
    );
};

export default CardBody;
