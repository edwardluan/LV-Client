export const checkImage = (file) => {
  let err = "";
  if (!file) return (err = "Chưa thêm tệp cần tải lên !");
  if (file.size > 1024 * 1024) err = "Kích thước tệp quá lớn !";
  if (file.type !== "image/jpeg" && file.type !== "image/png")
    err = "Sai định dạng tệp !";
  return err;
};

export const imageUpload = async (image) => {
  let arr = [];
  for (const item of image) {

    const formData = new FormData();

    if (item.camera) {
      formData.append("file", item.camera);
    } else {
      formData.append("file", item);
    }
    
    formData.append("upload_preset", "p3l0tiyb");
    formData.append("cloud_name", "dpffxadn9");
    formData.append("folder", "lv");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dpffxadn9/upload",
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();

    console.log(data);

    arr.push({ public_id: data.public_id, url: data.secure_url });
  }
  return arr;
};
