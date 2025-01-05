import React, { useState, useRef } from "react";

function App() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [preview, setPreview] = useState(null);
  const [progress, setProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleGetLocalFile = () => {
    fileInputRef.current?.click();
  };

  const followCursor = (e) => {
    setPosition({
      x: e.clientX - 320,
      y: e.clientY - 510,
    });
  };

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const processFile = (file) => {
    setProgress(0);
    const reader = new FileReader();

    reader.onprogress = (event) => {
      if (event.lengthComputable) {
        const percentComplete = Math.round((event.loaded / event.total) * 100);
        setProgress(percentComplete);
      }
    };

    reader.onload = (e) => {
      setPreview(e.target?.result);
      setProgress(100);
    };

    reader.onerror = () => {
      console.error("Error reading file");
      setProgress(0);
    };

    reader.readAsDataURL(file);
  };

  const dropHandler = (ev) => {
    ev.preventDefault();
    setIsDragging(false);

    const file = ev.dataTransfer.items
      ? ev.dataTransfer.items[0]?.getAsFile()
      : ev.dataTransfer.files[0];

    if (file) {
      processFile(file);
    }
  };

  const dragOverHandler = (ev) => {
    ev.preventDefault();
    setIsDragging(true);
  };

  const dragLeaveHandler = (ev) => {
    ev.preventDefault();
    setIsDragging(false);
  };

  return (
    <div
      onMouseMove={followCursor}
      className="w-screen h-screen flex-col gap-10 flex justify-center items-center bg-blue-100 relative"
    >
      <span
        style={{
          transform: `translate(${position.x}px, ${position.y}px)`,
        }}
        className="absolute z-50"
      />
      <div className="bg-white p-2 w-80 h-80 rounded-lg relative">
        <div
          className={`w-full h-full rounded-md border-dashed border border-blue-500 ${
            isDragging ? "bg-blue-300" : "bg-blue-200"
          } flex flex-col items-center justify-center gap-3 capitalize overflow-hidden`}
          onDrop={dropHandler}
          onDragOver={dragOverHandler}
          onDragLeave={dragLeaveHandler}
        >
          <input
            ref={fileInputRef}
            className="hidden"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
          {preview ? (
            <img
              src={preview}
              alt="Uploaded Preview"
              className="w-64 h-64 object-cover rounded-md"
            />
          ) : (
            <>
              <div className="w-16">
                <svg
                  className="w-full h-full"
                  viewBox="0 0 89 122"
                  fill="#223EFf"
                  xmlns="http://www.w3.org/2000/svg"
                  strokeWidth="0.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path
                    d="M31.1309 13.4399L32.1608 12.9299C31.7708 12.9899 31.4309 13.1599 31.1309 13.4399Z"
                    stroke="white"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M66.5402 116.88C66.5402 118.18 66.1602 119.06 65.3902 119.5C64.6102 119.94 63.6601 119.83 62.5201 119.17L6.19019 86.6499C5.05019 85.9899 4.09016 84.9999 3.32016 83.6699C2.55016 82.3399 2.16016 81.0199 2.16016 79.7099C2.16016 78.3999 2.55016 77.5299 3.32016 77.0899L3.56018 76.9699C4.28018 76.6799 5.16019 76.8299 6.19019 77.4099L62.5201 109.94C63.6601 110.59 64.6102 111.59 65.3902 112.92C66.1602 114.25 66.5402 115.57 66.5402 116.88Z"
                    stroke="white"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M77.8902 53.1099C77.6902 53.4499 77.4701 53.7199 77.2101 53.8999L76.6802 54.1699H76.6702L66.4202 59.3099L57.1402 63.9599C57.4202 63.7699 57.6802 63.4899 57.8902 63.1099C58.6302 61.8099 58.5002 60.0999 57.4902 57.9799L37.5702 17.1599C37.3902 16.7899 37.2002 16.4299 36.9802 16.0999C36.7202 15.6799 36.4302 15.2899 36.1102 14.9299C35.5402 14.2999 34.9602 13.7999 34.3502 13.4499C33.7502 13.1099 33.1601 12.9199 32.5901 12.8999C32.4401 12.8899 32.3002 12.8999 32.1602 12.9299L51.1302 3.43994C51.5402 3.05994 52.0201 2.87994 52.5901 2.89994C53.1601 2.91994 53.7502 3.10994 54.3502 3.44994C54.9602 3.79994 55.5402 4.29994 56.1102 4.92994C56.6802 5.56994 57.1702 6.30994 57.5702 7.15994L77.4902 47.9799C78.5002 50.0999 78.6302 51.8099 77.8902 53.1099Z"
                    stroke="white"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M86.5405 106.88C86.5405 108.18 86.1606 109.06 85.3906 109.5L85.1505 109.62L65.3906 119.5C66.1606 119.06 66.5405 118.18 66.5405 116.88C66.5405 115.58 66.1606 114.25 65.3906 112.92C64.6106 111.59 63.6605 110.59 62.5205 109.94L6.19055 77.4099C5.16055 76.8299 4.28055 76.6799 3.56055 76.9699L22.2805 67.6099V72.8499C22.2805 74.1599 22.6706 75.4799 23.4406 76.8099C24.2106 78.1399 25.1705 79.1399 26.3105 79.7999L42.4005 89.0899C43.5405 89.7499 44.5005 89.8499 45.2705 89.4099L46.8906 88.5999L55.4605 84.3099L82.5205 99.9399C83.6605 100.59 84.6106 101.59 85.3906 102.92C86.1606 104.25 86.5405 105.57 86.5405 106.88Z"
                    stroke="white"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M57.8909 63.1099C57.6809 63.4899 57.4209 63.7699 57.1409 63.9599L56.9309 64.0699C56.2409 64.3999 55.3609 64.2499 54.2709 63.6199L46.4209 59.0899V86.7899C46.4209 87.3399 46.3509 87.8099 46.2109 88.2099C46.0309 88.7599 45.7209 89.1599 45.2709 89.4099C44.5009 89.8499 43.5409 89.7499 42.4009 89.0899L26.3109 79.7999C25.1709 79.1399 24.2109 78.1399 23.4409 76.8099C22.6709 75.4799 22.2809 74.1599 22.2809 72.8499V45.1499L14.4409 40.6199C12.7609 39.6499 11.5509 38.0899 10.8209 35.9299C10.0809 33.7799 10.2109 32.2199 11.2209 31.2599L31.1309 13.4399L32.1609 12.9299C32.3009 12.8999 32.4409 12.8899 32.5909 12.8999C33.1609 12.9199 33.7509 13.1099 34.3509 13.4499C34.9609 13.7999 35.5409 14.2999 36.1109 14.9299C36.4309 15.2899 36.7209 15.6799 36.9809 16.0999C37.2009 16.4299 37.3909 16.7899 37.5709 17.1599L57.4909 57.9799C58.5009 60.0999 58.6309 61.8099 57.8909 63.1099Z"
                    stroke="white"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M66.4196 59.31V76.79C66.4196 78.1 66.0395 78.98 65.2695 79.41L65.0295 79.53L55.4595 84.31L46.8896 88.6L45.2695 89.41C45.7195 89.16 46.0295 88.76 46.2095 88.21C46.3495 87.81 46.4196 87.34 46.4196 86.79V59.09L54.2695 63.62C55.3595 64.25 56.2396 64.4 56.9296 64.07L57.1396 63.96L66.4196 59.31Z"
                    stroke="white"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <span className="text-neutral-800 font-medium">
                Drag your video here
              </span>
            </>
          )}
        </div>
      </div>
      <button
        onClick={handleGetLocalFile}
        className="bg-blue-700 text-white py-3 px-4 rounded-lg capitalize font-medium"
      >
        Browse files
      </button>
      {progress > 0 && (
        <div className="bg-white p-3 w-96 h-24 rounded-lg overflow-hidden relative">
          <div
            style={{ width: `${progress}%` }}
            className="transition-all absolute inset-0 h-full bg-blue-200"
          >
            <span className="w-full absolute bottom-5 h-[2px] bg-blue-500"></span>
          </div>
          <div className="z-10 relative">
            <p>{progress < 100 && "Uploading files .."}</p>

            <div className="w-full flex flex-row justify-between items-center">
              <span>
                {progress}% {progress < 100 ? "8 seconds left" : "Complete"}
              </span>
              <span>...</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
