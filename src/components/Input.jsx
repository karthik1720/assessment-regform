import React from "react";

function Input(props) {
  return (
    <div className="InputContainer">
      <label>{props.name}</label>
      <input
        type="text"
        name={props.name}
        className="InputArea"
        value={props.value}
        onChange={props.onChange}
      />
      <span>{props.span}</span>
    </div>
  );
}

export default Input;
