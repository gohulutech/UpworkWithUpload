import React, { useState } from "react";
import MediaCard from "../MediaCard";
import { Box, Grid, Button, FormLabel } from "@material-ui/core";
import { useFormik, FormikProvider } from "formik";
import ProductInputs from "../ProductInputs";
import { productSchema } from "../../schema";

export default function ProductCard({ product, categories, contentSlots }) {
  const [selectedContentSlots, setSelectedContentSlots] = useState(
    product.productImages.map((productImage) => productImage.contentSlot)
  );

  const newProduct = { ...product };
  const formik = useFormik({
    initialValues: {
      productCode: newProduct.productCode || "",
      productName: newProduct.productName || "",
      productCategory: newProduct.productCategory || null,
      productExisting: newProduct.productExisting,
      productImages:
        newProduct.productImages.map((productImage) => {
          return {
            imageFileName: productImage.imageFileName,
            imageUrl: productImage.imageUrl,
            contentSlot: productImage.contentSlot,
            checked: productImage.checked,
          };
        }) || [],
    },
    enableReinitialize: true,
    validationSchema: productSchema,
    onSubmit: (values) => {
      const newProductImages = values.productImages.filter(
        (productImage) => productImage.checked
      );
      console.log({ ...values, productImages: newProductImages });
    },
  });

  const getContentSlotsForImage = (currentProductImage) => {
    return contentSlots.filter(
      (contentSlot) =>
        contentSlot.id === currentProductImage.contentSlot ||
        !selectedContentSlots.includes(contentSlot.id)
    );
  };

  const handleChangeSlot = (currentProductImage) => {
    product.productImages
      .filter(
        (productImage) =>
          productImage.imageFileName === currentProductImage.imageFileName
      )
      .forEach(
        (productImage) =>
          (productImage.contentSlot = currentProductImage.contentSlot)
      );
    setSelectedContentSlots(
      product.productImages.map((productImage) => productImage.contentSlot)
    );
  };

  return (
    <FormikProvider value={formik}>
      <form onSubmit={formik.handleSubmit}>
        <Box>
          <ProductInputs formik={formik} categories={categories} />
          <Button
            variant="contained"
            size="medium"
            color="primary"
            type="submit"
          >
            Save
          </Button>

          <Grid component="div" container spacing={2}>
            <Grid component="div" item xl={10} lg={10} md={12} sm={12} xs={12}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  flexDirection: "column",
                }}
              >
                <Grid component="div" container spacing={2}>
                  {formik.values.productImages.map((productImage) => (
                    <Grid
                      key={productImage.id}
                      component="div"
                      item
                      xl={2}
                      lg={2}
                      md={2}
                      sm={12}
                      xs={12}
                    >
                      <MediaCard
                        productImage={productImage}
                        contentSlots={getContentSlotsForImage(productImage)}
                        handleChangeSlot={handleChangeSlot}
                        product={product}
                      />
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Grid>
            <FormLabel style={{ color: "#f44336" }}>
              {formik.errors.productImages}
            </FormLabel>
          </Grid>
        </Box>
      </form>
    </FormikProvider>
  );
}
