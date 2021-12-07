import React from "react";
import { Autocomplete } from "@material-ui/lab";
import {
  Card,
  CardContent,
  CardMedia,
  Box,
  Typography,
  TextField,
  Checkbox,
} from "@material-ui/core";

export default function MediaCard({
  formik,
  productImageFileName,
  contentSlots,
  handleChangeSlot = () => {},
  handleSelectImage = () => {},
  product,
}) {
  const productImage = formik.values?.productImages.find(
    (productImage) => productImage.imageFileName === productImageFileName
  );

  const onCheckedImage = (value) => {
    handleSelectImage(productImage, value, product);
  };

  const onSelectedSlot = (_, slot) => {
    if (slot == null) handleSelectImage(productImage, false, product);
    handleChangeSlot(productImage, slot, product);
  };

  const errorMessages =
    productImage.hasError &&
    productImage.errorMessage?.validationMessages.map(
      (data) => data.validationMessages
    );

  return (
    <Card
      style={{
        border: productImage.hasError ? "1px solid red" : "unset",
      }}
    >
      <CardContent>
        <CardMedia
          component="img"
          height="140"
          image={
            productImage.imageFile
              ? URL.createObjectURL(productImage.imageFile)
              : productImage.imageUrl
          }
        />
        <p>{productImage.imageFileName}</p>
        {productImage.hasError &&
          errorMessages.map((msg, idx) => (
            <Box key={idx + msg} marginTop={idx === 0 ? 2 : 1}>
              <Typography color="secondary">{msg}</Typography>
            </Box>
          ))}
        <Autocomplete
          fullWidth
          size="small"
          options={contentSlots}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Content Slots"
              variant="outlined"
              fullWidth
            />
          )}
          value={contentSlots.find(
            (contentSlot) => contentSlot.id === productImage.contentSlot
          )}
          getOptionLabel={(option) => option.name || ""}
          onChange={onSelectedSlot}
        />
        <Checkbox
          color="primary"
          disabled={
            contentSlots.find(
              (contentSlot) => contentSlot.id === productImage.contentSlot
            ) == null
          }
          checked={productImage.checked}
          onChange={(e) => onCheckedImage(e.target.checked)}
        />
      </CardContent>
    </Card>
  );
}
