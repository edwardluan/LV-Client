import React from "react";

const Avatar = ({ src, size }) => {
  return (
    <div>
      <img src={src} alt="avatar" className={size} />
    </div>
  );
};

export default Avatar;
