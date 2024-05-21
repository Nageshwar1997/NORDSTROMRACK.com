// Cloudinary URL = https://api.cloudinary.com/v1_1/drbhw0nwt/image/upload
// Cloudinary Name = drbhw0nwt

const url = `https://api.cloudinary.com/v1_1/drbhw0nwt/image/upload`;
const uploadImage = async (image) => {
  
  const formData = new FormData();
  formData.append("file", image);
  formData.append("upload_preset", "NORDSTROMRACK_product");
  const dataResponse = await fetch(url, {
    method: "post",
    body: formData,
  });

    return dataResponse.json();
};

export default uploadImage;
