import React from "react";
import {
  EmailShareButton,
  EmailIcon,
  FacebookShareButton,
  FacebookIcon,
  LinkedinShareButton,
  LinkedinIcon,
  TelegramShareButton,
  TelegramIcon,
  TwitterShareButton,
  TwitterIcon,
} from "react-share";

const ShareModal = ({ url }) => {
  return (
    <div className="d-flex justify-content-between p-4 shareModal">
      <FacebookShareButton url={url}>
        <FacebookIcon round={true} size={32} />
      </FacebookShareButton>
      <EmailShareButton url={url}>
        <EmailIcon round={true} size={32} />
      </EmailShareButton>
      <LinkedinShareButton url={url}>
        <LinkedinIcon round={true} size={32} />
      </LinkedinShareButton>
      <TelegramShareButton url={url}>
        <TelegramIcon round={true} size={32} />
      </TelegramShareButton>
      <TwitterShareButton url={url}>
        <TwitterIcon round={true} size={32} />
      </TwitterShareButton>
    </div>
  );
};

export default ShareModal;
