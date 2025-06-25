import{ useEffect, useState, useRef } from "react";

export function AdaptiveImageDivForHome({ images }) {
  const [backgroundColor, setBackgroundColor] = useState("rgb(255, 255, 255)");
  const canvasRef = useRef(null);

  useEffect(() => {
    const img = new window.Image();
    img.crossOrigin = "Anonymous";
    img.src = images;
    img.onload = () => {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      if (ctx && canvas) {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0, img.width, img.height);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const dominantColor = getDominantColor(imageData.data);
        setBackgroundColor(`rgb(${dominantColor.join(",")})`);
      }
    };
  }, [images]);

  const getDominantColor = (imageData) => {
    const rgb = [0, 0, 0];
    const count = imageData.length / 4;
    for (let i = 0; i < imageData.length; i += 4) {
      rgb[0] += imageData[i];
      rgb[1] += imageData[i + 1];
      rgb[2] += imageData[i + 2];
    }
    return rgb.map((v) => Math.round(v / count));
  };

  const getContrastYIQ = (color) => {
    const rgb = color.match(/\d+/g);
    if (!rgb || rgb.length !== 3) return "black";
    const yiq =
      (parseInt(rgb[0]) * 299 +
        parseInt(rgb[1]) * 587 +
        parseInt(rgb[2]) * 114) /
      1000;
    return yiq >= 128 ? "black" : "white";
  };

  const textColor = getContrastYIQ(backgroundColor);

  return (
    <div className="sm:h-[20rem] md:h-[22rem] lg:h-[25rem] w-full flex justify-center items-center">
      <div
        className="p-2 lg:p-2 rounded-lg shadow-lg transition-colors duration-300 h-auto lg:h-full lg:w-full flex justify-center items-center"
        style={{ backgroundColor, color: textColor }}
      >
        <img
          src={images}
          alt={`poster-image`}
          className="min-w-[155px] w-auto md:min-w-[190px] lg:w-full h-60 sm:h-[16rem] md:h-[18rem] lg:h-full border-black border-2 lg:border-4 object-fill md:object-fill"
        />
      </div>
      <canvas ref={canvasRef} style={{ display: "none" }} />
    </div>
  );
}
