import { Upload, message, Icon } from "antd";
import React, { useState } from "react";
import './styles.scss';

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
}

function beforeUpload(file) {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
        message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error("Image must smaller than 2MB!");
    }
    return isJpgOrPng && isLt2M;
}


const Avatar = ({ avatar, setAvatar }) => {
    const [loading, setLoading] = useState(false);
    const uploadButton = (
        <div>
            {loading ? <Icon type="loading" /> : <Icon type="plus" />}
            <div className="ant-upload-text">Upload</div>
        </div>
    );

    const handleChange = info => {
        if (info.file.status === "uploading") {
            setLoading(true);
            return;
        }
        if (info.file.status === "done") {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, avatar => {
                setAvatar(avatar);
                setLoading(false);
            });
        }
    };

    return (
      <Upload
      name="avatar"
      listType="picture-card"
      className="avatar-uploader"
      showUploadList={false}
      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
      beforeUpload={beforeUpload}
      onChange={handleChange}
    >
      {avatar ? <img src={avatar} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
    </Upload>
  );
};

export default Avatar;
