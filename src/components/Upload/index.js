import React, { useState, useEffect } from "react";
import { Grid, Paper, Button, Modal, Box, Typography } from "@material-ui/core";
import { useSelector } from "react-redux";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const UploadImage = ({ handleUploadImages = () => {} }) => {
  const products = useSelector((state) => state.product?.products);
  const [hasError, setHasError] = useState(false);
  const [modalMessage, setModalMessage] = useState(null);

  const onUploadImage = (files) => {
    setHasError(false);
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
        checked: false,
      };
    });

    if (images == null || images.length === 0) return;

    const productCodes = images.map((image) => image.productCode);
    const existingProductCodes = products
      .filter((product) => productCodes.includes(product.productCode))
      .map((product) => product.productCode);

    const imagesToAdd = images.filter(
      (image) =>
        existingProductCodes != null &&
        !existingProductCodes.includes(image.productCode)
    );

    handleUploadImages(imagesToAdd);
    setModalMessage(
      `${imagesToAdd.length} images added, ${
        images.length - imagesToAdd.length
      } images had already been added.`
    );
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

  const handleClose = () => {
    setHasError(false);
    setModalMessage(null);
  };

  useEffect(() => {
    if (modalMessage == null) return;

    setHasError(true);
  }, [modalMessage]);
  return (
    <Grid container>
      <Grid item xs={12} md={12}>
        <Paper>
          <Modal open={hasError} onClose={handleClose}>
            <Box sx={modalStyle}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Message
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                {modalMessage}
              </Typography>
            </Box>
          </Modal>
          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => handleDrop(e)}
          >
            <h3
              style={{
                fontSize: "18px",
                fontWeight: "normal",
                marginBottom: "1rem",
              }}
            >
              Drag & Drop Images here
            </h3>
            <p
              style={{
                fontSize: "18px",
                fontWeight: "normal",
                marginBottom: "1rem",
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
