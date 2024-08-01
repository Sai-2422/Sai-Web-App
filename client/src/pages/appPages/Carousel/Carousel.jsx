import React from "react";

const turmericPolishingMachine =
  "https://res.cloudinary.com/dqy2ts9h6/image/upload/v1722083081/SAI%20Products/turmericPolishingMachine.png";
const turmericBoilerTwoWheeler =
  "https://res.cloudinary.com/dqy2ts9h6/image/upload/v1722083007/SAI%20Products/turmericBoilerTwoWheeler.png";
const cultivatorMogada =
  "https://res.cloudinary.com/dqy2ts9h6/image/upload/v1722082948/SAI%20Products/cultivatorMogada.png";
const twoWheelerBoth =
  "https://res.cloudinary.com/dqy2ts9h6/image/upload/v1722083161/SAI%20Products/twoWheelerBoth.png";
const waterTanker =
  "https://res.cloudinary.com/dqy2ts9h6/image/upload/v1722083259/SAI%20Products/waterTanker.png";
const natureBG =
  "https://res.cloudinary.com/dqy2ts9h6/image/upload/v1722082756/SAI%20WebApp/natureBG.jpg";

const Carousel = () => {
  return (
    <div
      id="carouselExampleCaptions"
      className="carousel slide"
      data-bs-ride="carousel"
    >
      <div className="carousel-indicators">
        <button
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide-to="0"
          className="active"
          aria-current="true"
          aria-label="Slide 1"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide-to="1"
          aria-label="Slide 2"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide-to="2"
          aria-label="Slide 3"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide-to="3"
          aria-label="Slide 4"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide-to="4"
          aria-label="Slide 5"
        ></button>
      </div>
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img
            style={{
              backgroundImage: `url(${natureBG})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            src={twoWheelerBoth}
            className="d-block w-100"
            alt="First Slide"
            width="100vw"
            height="644vh"
          />
          <div className="carousel-caption d-none d-md-block">
            <h5>Two Wheeler &amp; Four Wheeler Trailer</h5>
            <p>available Dumping and without Dumping in showroom.</p>
          </div>
        </div>
        <div className="carousel-item">
          <img
            style={{
              backgroundImage: `url(${natureBG})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            src={waterTanker}
            className="d-block w-100"
            alt="First Slide"
            width="100vw"
            height="644vh"
          />
          <div className="carousel-caption d-none d-md-block">
            <h5>Water Tanker</h5>
            <p>available in required Liter capacity.</p>
          </div>
        </div>
        <div className="carousel-item">
          <img
            style={{
              backgroundImage: `url(${natureBG})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            src={turmericBoilerTwoWheeler}
            className="d-block w-100"
            alt="First Slide"
            width="100vw"
            height="644vh"
          />
          <div className="carousel-caption d-none d-md-block">
            <h5>Turmeric Boiler</h5>
            <p>available in Two Wheeler &amp; Four Wheeler.</p>
          </div>
        </div>
        <div className="carousel-item">
          <img
            style={{
              backgroundImage: `url(${natureBG})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            src={turmericPolishingMachine}
            className="d-block w-100"
            alt="First Slide"
            width="100vw"
            height="644vh"
          />
          <div className="carousel-caption d-none d-md-block">
            <h5>Turmeric Polishing Machine</h5>
            <p>available as per no. sacks requirement.</p>
          </div>
        </div>
        <div className="carousel-item">
          <img
            style={{
              backgroundImage: `url(${natureBG})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            src={cultivatorMogada}
            className="d-block w-100"
            alt="First Slide"
            width="100vw"
            height="644vh"
          />
          <div className="carousel-caption d-none d-md-block">
            <h5>Cultivator Mogada</h5>
            <p>available in required quantity.</p>
          </div>
        </div>
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleCaptions"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleCaptions"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default Carousel;
