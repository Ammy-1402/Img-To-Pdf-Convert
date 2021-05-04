import React, { useState } from "react";
import { CustomImage } from './customImage';
import { Typography } from '@material-ui/core';
import * as Helpers from './helper';
import Button from '@material-ui/core/Button';
import './App.css';

const App = () => {
  const [selectedImages, setSelectedImages] = useState([]);
  const filetoImageURL = (file) => {
    const image = new CustomImage(file.type);
    image.src = URL.createObjectURL(file);
    return image;
  }

  const selectImage = (event) => {
    const fileList = event.target.files;
    const fileArray = fileList ? Array.from(fileList) : [];
    const fileToImagePromises = fileArray.map(filetoImageURL);
    setSelectedImages(fileToImagePromises)
  }

  const cleanUpUploadedImages = () => {
    setSelectedImages([]);
    selectedImages.forEach((image) => {
      URL.revokeObjectURL(image.src);
    })
  };

  const generatePdfFromImages = () => {
    Helpers.generatePdfFromImages(selectedImages);
    cleanUpUploadedImages()
  };

  return (
    <>
      <div className="header">
        <Typography>Image to Pdf Converter</Typography>
      </div>
      {
        selectedImages.length > 0 ?
          <>
            <div className="gen-btn">
              <Button
                className="btn-choose"
                onClick={cleanUpUploadedImages}
                variant="outlined"
                component="span" >
                Clear
              </Button>
              <div className="divider"></div>
              <Button
                className="btn-choose"
                onClick={generatePdfFromImages}
                variant="outlined"
                component="span" >
                Generate PDF
            </Button>
            </div>
            <div className="divider"></div>
            <div className="text">Total Images Selected: <span style={{ fontWeight: "bold", paddingLeft: 5 }}> {selectedImages.length}</span></div>
          </>
          :
          <></>
      }
      <div className="images-container">
        {selectedImages.length > 0 ? (
          selectedImages.map((image) => (
            <div className="images-inner-container">
              <img className="image" key={image.src} src={image.src} className="uploaded-image" />
            </div>
          ))
        ) : (
          <div className="text"><p>Upload Images</p></div>
        )}
      </div>
      <div className="app">
        {
          selectedImages.length > 0 ?
            <></> :
            <label htmlFor="btn-upload">
              <input
                id="btn-upload"
                name="btn-upload"
                style={{ display: 'none' }}
                type="file"
                accept="image/*"
                multiple
                onChange={selectImage}
              />
              <Button
                className="btn-choose"
                variant="outlined"
                component="span" >
                Choose Images
              </Button>
            </label>
        }
      </div>
    </>
  );
}

export default App;
