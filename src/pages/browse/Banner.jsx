import React from "react";
import classes from "./Banner.module.css";

const Banner = (props) => {
  return (
    <React.Fragment>
      <div className={classes.banner}>
        <h1>{props.movie.name}</h1>
        <div className={classes.button}>
          <button>Play</button>
          <button>My List</button>
        </div>
        <p>{props.movie.overview}</p>
        {/* <img src={image1} /> */}
      </div>
    </React.Fragment>
  );
};

export default Banner;
