import React, { useState } from "react";
import "./PreviewImage.css";

const PreviewImage = ({ setUploadImg, img }) => {
  const [profileImg, setProfileImg] = useState(
    img
      ? img
      : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
  );
  const imageHandler = async (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setProfileImg(reader.result);
      }
    };
    setUploadImg(e.target.files[0]);
    reader.readAsDataURL(e.target.files[0]);
  };
  return (
    <div className="container">
      <div className="img-holder">
        <img src={profileImg} alt="" id="img" className="img" />
      </div>
      <input
        type="file"
        accept="image/*"
        name="image-upload"
        id="input"
        onChange={imageHandler}
      />
      <div className="label">
        <label className="image-upload" htmlFor="input">
          Upload Profile Picture
        </label>
      </div>
    </div>
  );
};

export default PreviewImage;
