export const uploadImage = async (image) => {
  const data = new FormData();

  data.append("file", image);

  data.append("upload_preset", "Bloom_Image");

  data.append("cloud_name", "ds4utkfor");

  const res = await fetch(
    "https://api.cloudinary.com/v1_1/ds4utkfor/image/upload",
    {
      method: "POST",
      body: data,
    },
  );

  const uploadedImage = await res.json();

  console.log(uploadedImage);

  return uploadedImage.secure_url;
};
