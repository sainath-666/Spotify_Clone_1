import { useState, useEffect } from "react";

const getAverageRGB = (
  imgEl: HTMLImageElement
): { r: number; g: number; b: number } => {
  const blockSize = 5;
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  if (!context) {
    return { r: 18, g: 18, b: 18 }; // Default dark color
  }

  const height = (canvas.height =
    imgEl.naturalHeight || imgEl.offsetHeight || imgEl.height);
  const width = (canvas.width =
    imgEl.naturalWidth || imgEl.offsetWidth || imgEl.width);

  context.drawImage(imgEl, 0, 0);

  try {
    const data = context.getImageData(0, 0, width, height).data;
    let r = 0,
      g = 0,
      b = 0,
      count = 0;

    for (let i = 0; i < data.length; i += blockSize * 4) {
      r += data[i];
      g += data[i + 1];
      b += data[i + 2];
      count++;
    }

    return {
      r: Math.floor(r / count),
      g: Math.floor(g / count),
      b: Math.floor(b / count),
    };
  } catch (e) {
    console.error("Error getting image data:", e);
    return { r: 18, g: 18, b: 18 };
  }
};

const useBackgroundColor = (imageUrl: string): string => {
  const [backgroundColor, setBackgroundColor] = useState(
    "linear-gradient(to bottom, rgba(18, 18, 18, 0.8) 0%, rgb(18, 18, 18) 100%)"
  );

  useEffect(() => {
    const img = new Image();
    img.crossOrigin = "Anonymous";

    img.onload = () => {
      const { r, g, b } = getAverageRGB(img);
      // Create a more dramatic gradient with multiple color stops
      const gradient = `linear-gradient(to bottom, 
        rgba(${r}, ${g}, ${b}, 0.3) 0%,
        rgba(${r}, ${g}, ${b}, 0.6) 30%,
        rgba(18, 18, 18, 0.9) 80%,
        rgb(18, 18, 18) 100%)`;
      setBackgroundColor(gradient);
    };

    img.onerror = () => {
      setBackgroundColor(
        "linear-gradient(to bottom, rgba(18, 18, 18, 0.8) 0%, rgb(18, 18, 18) 100%)"
      );
    };

    img.src = imageUrl;
  }, [imageUrl]);

  return backgroundColor;
};

export default useBackgroundColor;
