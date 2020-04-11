import React from "react";

const Option = (props) => {
  const style = {
    backgroundColor: "darkgray",
  };
  return (
    <button
      className="option"
      onClick={() => props.click(props.name, props.type)}
      onKeyPress={(e) => props.keyDown(e, props.name, props.type)}
    >
      {props.name}
    </button>
  );
};

export default Option;
