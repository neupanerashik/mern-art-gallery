export const getDataUri = (image) => {
  const extname = image.originalname.split(".")[1];
  return `data:image/${extname};base64,${image.buffer.toString("base64")}`;
};
  
