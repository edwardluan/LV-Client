import React from "react";

const LikeBtn = ({ isLike, handleLike, handleUnLike }) => {
    return (
        <>
            {isLike ? (
                <span
                    className="material-symbols-outlined text-danger"
                    onClick={handleUnLike}
                >
                    favorite
                </span>
            ) : (
                <span className="material-symbols-outlined"
                    onClick={handleLike}>
                    favorite
                </span>
            )}
        </>
    );
};

export default LikeBtn;
