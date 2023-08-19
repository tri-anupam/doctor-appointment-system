import PuffLoader from "react-spinners/PuffLoader";
// import '../'
import React from "react";

const override = {
  //   height: "100vh",
  //   width: "100vw",
  margin: "auto",
  zIndex: 999,
  //   border: "3px solid red",
  //   backgroundColor: "black",
};

const Spinner = () => {
  const color = "#08f7fe";
  const loading = true;
  return (
    <div className="sweet-loading">
      <PuffLoader
        color={color}
        loading={loading}
        cssOverride={override}
        size={120}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};

export default Spinner;
