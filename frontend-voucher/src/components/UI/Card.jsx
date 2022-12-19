import React from "react";
import classes from "./Card.module.css";
// reuseable card wrapper

const Card = (props) => {
  return <div className={classes.card}>{props.children}</div>;
};

export default Card;
