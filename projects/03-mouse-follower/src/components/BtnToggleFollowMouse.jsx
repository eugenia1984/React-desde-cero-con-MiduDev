import React from "react";

const BtnToggleFollowMouse = ({ mounted, setMounted }) => {
  return (
    <button onClick={() => setMounted(!mounted)}>
      Toggle mounted FollowMouse component
    </button>
  );
};

export default BtnToggleFollowMouse;
