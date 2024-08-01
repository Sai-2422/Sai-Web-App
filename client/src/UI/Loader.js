import { GridLoader } from "react-spinners";

const Loader = () => {
  return (
    <div
      style={{
        position: "fixed",
        left: 0,
        top: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(255, 255, 255, 0.8)", // Optional semi-transparent background
        zIndex: 9999, // High z-index to cover other elements
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <GridLoader color="#7064e5" />
    </div>
  );
};

export default Loader;
