import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadedImages, setUploadedImages] = useState([]);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = () => {
    const formData = new FormData();
    formData.append('image', selectedFile);

    axios.post('http://localhost:5000/api/upload', formData)
      .then((response) => {
        setUploadedImages([...uploadedImages, response.data.imageUrl]);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleDelete = (imageUrl) => {
    axios.delete(`http://localhost:5000/api/delete?imageUrl=${encodeURIComponent(imageUrl)}`)
      .then(() => {
        setUploadedImages(uploadedImages.filter((url) => url !== imageUrl));
      })
      .catch((error) => {
        console.error(error)
      });
  };

  return (
    <div>
      <h1>Image Uploader</h1>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      <div className="image-grid">
        {uploadedImages.map((imageUrl) => (
          <div key={imageUrl} className="image-card">
            <img src={imageUrl} alt="Uploaded" />
            <div>
              <button onClick={() => handleDelete(imageUrl)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
