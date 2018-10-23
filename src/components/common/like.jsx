import React from "react";

const Like = ({ liked, onClick }) => {
  let classes = "fa fa-heart";
  classes += liked ? "" : "-o";
  return (
    <i
      onClick={onClick}
      style={{ cursor: "pointer" }}
      className={classes}
      aria-hidden="true"
    />
  );
};

export default Like;
