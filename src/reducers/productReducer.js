import { appConstants } from "../constants";

export const initialState = {
  products: [],
  errors: [],
  contentSlots: []
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case appConstants.GET_CONTENT_SLOTS_SUCCESS:
      return {
        ...state,
        contentSlots: action.payload
      };
    case appConstants.UPLOAD_PRODUCT_SUCCESS:
      return action.payload.reduce(
        (
          state,
          {
            productCode,
            productName,
            productCategory,
            imageFile,
            imageFileName,
            imageUrl,
            contentSlot,
            checked
          }
        ) => {
          const shouldUpdate = state.products.some(
            (product) => product.productCode === productCode
          );

          if (shouldUpdate) {
            return {
              ...state,
              products: state.products.map((product) =>
                product.productCode === productCode
                  ? {
                      ...product,
                      productImages: product.productImages.concat({
                        contentSlot,
                        imageFile,
                        imageFileName,
                        imageUrl,
                        checked
                      })
                    }
                  : product
              )
            };
          }

          return {
            ...state,
            products: state.products.concat({
              productCode,
              productName,
              productCategory,
              productExisting: true,
              productImages: [
                {
                  imageFile,
                  imageFileName,
                  imageUrl,
                  contentSlot,
                  checked
                }
              ]
            })
          };
        },
        state
      );

    case appConstants.VALIDATE_SUCCESS:
      return {
        ...state,
        errors: [
          ...state.errors,
          ...action.payload.data.filter((data, idx) => {
            return action.payload.images.some(
              (image) => data.id === image.imageFileName
            );
          })
        ]
      };

    case appConstants.CHANGE_CONTENT_SLOT:
      return {
        ...state,
        products: state.products.map((product) => {
          const isMatches = state.products.some(
            (product) => product?.productCode === action.payload?.productCode
          );

          if (isMatches) {
            return {
              ...product,
              productImages: [
                ...product?.productImages?.map((productImage) =>
                  productImage?.imageFileName === action.payload?.imageFileName
                    ? {
                        ...productImage,
                        contentSlot: action.payload?.slotSelectedID
                      }
                    : productImage
                )
              ]
            };
          }

          return {
            ...product
          };
        })
      };

    default:
      return state;
  }
};

export default appReducer;
