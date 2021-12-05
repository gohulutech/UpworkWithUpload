import React, { useState, useEffect } from "react";
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

const getAvailableSlots = (
  contentSlots,
  selectedContentSlots,
  selectedSlot
) => {
  return contentSlots.filter(
    (contentSlot) =>
      contentSlot.id === selectedSlot.id ||
      !Object.values(selectedContentSlots).includes(contentSlot.id)
  );
};

export default function MediaCard({
  formik,
  productImageFileName,
  contentSlots,
  selectedContentSlots,
  handleChangeSlot = () => {},
}) {
  const productImage = formik.values?.productImages.find(
    (productImage) => productImage.imageFileName === productImageFileName
  );
  const [isImageSelected, setIsImageSelected] = useState(
    Boolean(productImage?.checked)
  );
  const [selectedSlot, setSelectedSlot] = useState(
    contentSlots.find((slot) => productImage.contentSlot === slot.id)
  );
  const [availableSelectedSlots, setAvailableSelectedSlots] = useState(
    getAvailableSlots(contentSlots, selectedContentSlots, selectedSlot)
  );

  useEffect(() => {
    setAvailableSelectedSlots(
      getAvailableSlots(contentSlots, selectedContentSlots, selectedSlot)
    );
  }, [contentSlots, selectedContentSlots, selectedSlot]);

  const onCheckedImage = (value) => {
    productImage.checked = value;
    setIsImageSelected(value);
  };

  const onSelectedSlot = (_, slot) => {
    if (slot == null) onCheckedImage(false);
    productImage.contentSlot = slot != null ? slot.id : "";
    setSelectedSlot(slot);
    handleChangeSlot();
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
          options={availableSelectedSlots}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Content Slots"
              variant="outlined"
              fullWidth
            />
          )}
          value={selectedSlot}
          getOptionLabel={(option) => option.name || ""}
          onChange={onSelectedSlot}
        />
        <Checkbox
          color="primary"
          disabled={selectedSlot == null}
          checked={isImageSelected}
          onChange={(e) => onCheckedImage(e.target.checked)}
        />
      </CardContent>
    </Card>
  );
}
