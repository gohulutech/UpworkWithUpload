import React from "react";
import { Grid, Paper, Button } from "@material-ui/core";

const UploadImage = ({ handleUploadImages = () => {} }) => {
  const onUploadImage = (files) => {
    const fileList = Array.from(files);
    const images = fileList.map((image) => {
      return {
        productCode:
          image?.name?.replace(/\.[^/.]+$/, "").split("_")[1] ||
          image?.name?.replace(/\.[^/.]+$/, "").split("_")[0] ||
          "",
        slot: "1",
        productName: "",
        imageFile: image,
        imageFileName: image?.name,
        imageUrl: null,
        checked: false
      };
    });
    handleUploadImages(images);
  };

  const handleDrop = (e) => {
    e.nativeEvent.preventDefault();
    if (!e) return;
    const files = e.nativeEvent.dataTransfer.files;
    onUploadImage(files);
  };

  const browseFiles = (e) => {
    if (!e) return;
    const files = e.currentTarget.files;
    onUploadImage(files);
    e.target.value = null;
  };

  return (
    <Grid container>
      <Grid item xs={12} md={12}>
        <Paper>
          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => handleDrop(e)}
          >
            <h3
              style={{
                fontSize: "18px",
                fontWeight: "normal",
                marginBottom: "1rem"
              }}
            >
              Drag & Drop Images here
            </h3>
            <p
              style={{
                fontSize: "18px",
                fontWeight: "normal",
                marginBottom: "1rem"
              }}
            >
              or
            </p>
            <Button
              size="medium"
              variant="outlined"
              component="label"
              color="primary"
            >
              <input
                type="file"
                accept="image/*"
                multiple
                style={{ display: "none" }}
                onChange={(e) => browseFiles(e)}
              />
              Browse files
            </Button>
          </div>
        </Paper>
      </Grid>
    </Grid>
  );
};
export default UploadImage;
