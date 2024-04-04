import React from "react";

const Icons = ({setContent, content}) => {
  const emoji = [
    "🙂","😄","😆","😅","😂","🤣","😊","☺️","😌","😉",
    "😏","😍","😘","😗","😙","😚","🤗","😳","🙃","👻",
    "💀","👽","🤖","💩"
  ];
  return (
    <li
      className="nav-item dropdown align-items-center d-flex"
    >
      <span
        className="nav-link position-relative"
        id="navbarDropdown"
        role="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
        aria-haspopup="true"
      >
        <span>😍</span>
      </span>
      <div
        className="dropdown-menu position-absolute dropdown-menu-end"
        aria-labelledby="navbarDropdown"
      >
        <div className="emoji">
          {emoji.map((icon) => (
            <span key={icon} onClick={() => setContent(content + icon)}>{icon}</span>
          ))}
        </div>
      </div>
    </li>
  );
};

export default Icons;
