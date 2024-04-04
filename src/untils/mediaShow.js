
export const imageShow = (src) => {
    return <img src={src} alt="images" className="img-thumbnail" />;
  };

export const videoShow = (src) => {
    return <video controls src={src} alt="images" className="img-thumbnail" />;
  };