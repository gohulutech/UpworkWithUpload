import { appConstants } from "../constants";

export const getContentSlots = (payload) => {
  return {
    type: appConstants.GET_CONTENT_SLOTS_SUCCESS,
    payload
  };
};

export const uploadProduct = (payload) => {
  const images = payload?.map((image) => {
    return {
      productCode: image?.productCode,
      contentSlot: image?.slot,
      imageUrl: image?.imageUrl,
      imageFileName: image?.imageFileName,
      checked: image?.checked
    };
  });

  return {
    type: appConstants.UPLOAD_PRODUCT_SUCCESS,
    payload: images
  };
};

export const changeContentSlot = (
  imageFileName,
  slotSelectedID,
  productCode
) => {
  return {
    type: appConstants.CHANGE_CONTENT_SLOT,
    payload: {
      imageFileName,
      slotSelectedID,
      productCode
    }
  };
};
