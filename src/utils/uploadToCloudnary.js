
const cloud_name = "da8vggllm";
const upload_preset = "first_media";

export const uploadToCloudinary = async (pics, fileType) => {
  if (pics && fileType) {

    const data = new FormData();
    data.append("file", pics);
    data.append("upload_preset", upload_preset);

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${cloud_name}/${fileType}/upload`,
      {
        method: "POST",
        body: data,
      }
    );

    const fileData = await res.json();

    if (!res.ok) {
      console.error("Cloudinary Error:", fileData);
      return null;
    }

    console.log("UPLOAD SUCCESS:", fileData.secure_url);

    return fileData.secure_url;

  } else {
    console.log("error...");
  }
};