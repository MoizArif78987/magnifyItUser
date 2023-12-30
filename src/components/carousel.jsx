import React from "react";
import "./carousel.css";

export default function Carousel() {
  return (
    <>
      <div className="CarouselComponent">
        <video controls autoPlay loop muted playsInline className="video">
          <source
            src="https://webvisioneering.com/clients/magnify-it/wp-content/uploads/2023/11/video.mp4"
            type="video/mp4"
          />
        </video>
      </div>
    </>
  );
}
