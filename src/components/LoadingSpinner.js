import React from "react";
import loadingGif from "../assets/images/loading.gif";

function LoadingSpinner() {
  return (
    <div className="fixed inset-0 z-50 bg-white bg-opacity-70 flex items-center justify-center">
<img
  src={loadingGif}
  alt="Loading..."
  className="w-80 h-80 object-contain"
/>
    </div>
  );
}

export default LoadingSpinner;
