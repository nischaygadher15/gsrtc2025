const getCroppedImage = (
  imageSrc: string,
  imageDia: { x: number; y: number; width: number; height: number },
  rotation = 0
): Blob | unknown => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.src = imageSrc;
    image.crossOrigin = "anonymous";

    image.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      if (!ctx) return reject("Canvas context not available");

      //   canvas.width = imageDia.width;
      //   canvas.height = imageDia.height;

      //   ctx.drawImage(
      //     image,
      //     imageDia.x,
      //     imageDia.y,
      //     imageDia.width,
      //     imageDia.height,
      //     0,
      //     0,
      //     imageDia.width,
      //     imageDia.height
      //   );

      const rotRad = (rotation * Math.PI) / 180;

      // calculate bounding box of rotated image
      const sin = Math.abs(Math.sin(rotRad));
      const cos = Math.abs(Math.cos(rotRad));

      const bBoxWidth = image.width * cos + image.height * sin;
      const bBoxHeight = image.width * sin + image.height * cos;

      canvas.width = imageDia.width;
      canvas.height = imageDia.height;

      ctx.translate(-imageDia.x, -imageDia.y);
      ctx.translate(bBoxWidth / 2, bBoxHeight / 2);
      ctx.rotate(rotRad);
      ctx.translate(-image.width / 2, -image.height / 2);

      ctx.drawImage(image, 0, 0);

      canvas.toBlob((blob) => {
        if (!blob) reject("Canvas is empty!");
        else resolve(blob);
      }, "image/jpeg");
    };

    image.onerror = () => reject("Image load error");
  });
};

export default getCroppedImage;
