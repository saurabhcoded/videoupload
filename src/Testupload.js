import React, { useState } from "react";
import { uploadFile } from "react-s3";

const S3_BUCKET = process.env.REACT_APP_S3_BUCKET;
const REGION = process.env.REACT_APP_REGION;
const ACCESS_KEY = process.env.REACT_APP_ACCESS_KEY;
const SECRET_ACCESS_KEY = process.env.REACT_APP_SECRET_ACCESS_KEY;

const config = {
  bucketName: S3_BUCKET,
  region: REGION,
  accessKeyId: ACCESS_KEY,
  secretAccessKey: SECRET_ACCESS_KEY,
};

const UploadImageToS3WithReactS3 = () => {
  const [uploadedUrl, setUploadedUrl] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const handleFileInput = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async (file) => {
    uploadFile(file, config)
      .then((data) => {
        console.log(data);
        setUploadedUrl(data.location);
      })
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <div style={{ marginBottom: "100px" }}>
        <div>React S3 File Upload</div>
        <input type="file" onChange={handleFileInput} accept=".mp4" />
        <button onClick={() => handleUpload(selectedFile)}>
          {" "}
          Upload to S3
        </button>
      </div>
      {uploadedUrl ? (
        <video
          src={uploadedUrl}
          style={{ width: "200px", height: "400px" }}
          autoPlay
          controls
        ></video>
      ) : (
        "Upload a video"
      )}
      <br />
    </div>
  );
};

export default UploadImageToS3WithReactS3;
