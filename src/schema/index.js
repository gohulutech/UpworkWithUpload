import { object, string, array, bool } from "yup";

export const productSchema = object({
  productCode: string().required("required"),
  productName: string().required("required"),
  productImages: array()
    .of(
      object().shape({
        imageFile: string().max(255),
        imageFileName: string().max(255).required("required"),
        imageUrl: string().max(255).required("required"),
        contentSlot: string().max(255).required("required"),
        checked: bool().required("required")
      })
    )
    .compact((productImage) => !productImage.checked)
    .min(1, "Please select an image")
});
