import React, { useEffect } from "react";
import "./styles.css";
import ProductCard from "./components/ProductCard";
import Upload from "./components/Upload";
import { useDispatch, useSelector } from "react-redux";
import { uploadProduct, getContentSlots, changeContentSlot } from "./actions";
import { images, contentSlots } from "./data";

export default function App() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product?.products);

  useEffect(() => {
    dispatch(uploadProduct(images));
  }, [dispatch]);

  useEffect(() => {
    dispatch(getContentSlots(contentSlots));
  }, [dispatch]);

  const handleUploadImages = (productImages) => {
    dispatch(uploadProduct(productImages));
  };

  const handleChangeSlot = (productImage, slotSelected, product) => {
    const imageFileName = productImage?.imageFileName ?? null;
    const slotSelectedID = slotSelected?.id ?? null;
    const productCode = product?.productCode ?? null;
    dispatch(changeContentSlot(imageFileName, slotSelectedID, productCode));
  };

  return (
    <div className="App">
      <div>
        {(products || []).map((product, index) => (
          <div key={index}>
            <h1 style={{ display: "flex", justifyContent: "flex-start" }}>
              Product # {index + 1}
            </h1>
            <ProductCard
              product={product}
              contentSlots={contentSlots}
              key={index}
              handleChangeSlot={handleChangeSlot}
            />
          </div>
        ))}
      </div>
      <Upload handleUploadImages={handleUploadImages} />
    </div>
  );
}
