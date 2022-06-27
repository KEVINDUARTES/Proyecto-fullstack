import React from "react";
import "./Card.css";

export default function Card({ name, image, nickname }) {
  return (
    <div className="background-color">
      <div className="border">
        <img src={image} alt="img not found" width="200px" height="250px" />
        <h5 className="h5">{nickname}</h5>
        <h3 className="h5">{name}</h3>
      </div>
    </div>
  );
}
