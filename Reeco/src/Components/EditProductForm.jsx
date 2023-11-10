import React, { useState } from "react";
import styled from "styled-components";
const EditFormBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;
const EditFormContainer = styled.div`
  background-color: white;
  border-radius: 10px;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.3);
  width: 80%;
  max-width: 600px;
  padding: 20px;
  text-align: left;
`;
const ProductName = styled.h2`
  margin: 0;
  font-size: 24px;
`;
const BrandName = styled.h5`
  margin: 0;
  font-size: 15px;
`;
const EditFormContent = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
`;
const ProductImage = styled.img`
  width: 40%;
  max-height: 250px;
  object-fit: contain;
  border-radius: 5px;
`;
const EditFields = styled.div`
  flex: 1;
  padding-left: 20px;
  padding-right: 20px;
`;
const FieldLabel = styled.label`
  font-weight: bold;
  font-size: 18px;
  display: block;
  margin-bottom: 5px;
`;
const FieldInput = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  margin-bottom: 15px;
`;
const QuantityContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
`;
const QuantityLabel = styled.label`
  font-size: 16px;
  margin-right: 10px;
`;
const QuantityInput = styled.input`
  width: 70px;
  padding: 8px;
  text-align: center;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;
const TotalLabel = styled.label`
  margin-top: 10px;
  font-weight: bold;
  font-size: 18px;
  display: block;
`;
const ButtonsContainer = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
`;
const SaveButton = styled.button`
  padding: 10px 20px;
  background-color: #1f633e;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  margin-left: 10px;
`;
const CancelButton = styled.button`
  padding: 10px 20px;
  background-color: #ff6b6b;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
`;
const ErrorMessage = styled.div`
  color: red;
  font-size: 14px;
  margin-top: 5px;
`;
const EditProductForm = (props) => {
  const { product, onSave, onCancel } = props;
  const [editedProduct, setEditedProduct] = useState({
    productName: product.productName,
    brand: product.brand,
    price: parseFloat(product.price),
    quantity: parseInt(product.quantity),
    status: product.status,
    reason: product.reason,
  });
  const [errors, setErrors] = useState({
    price: "",
    quantity: "",
    reason: "",
  });
  const handlePriceChange = (event) => {
    const newPrice = parseFloat(event.target.value);
    setEditedProduct({ ...editedProduct, price: newPrice });
    if (newPrice <= 0) {
      setErrors({ ...errors, price: "Price must be greater than 0" });
    } else {
      setErrors({ ...errors, price: "" });
    }
  };
  const handleQuantityChange = (event) => {
    const newQuantity = parseInt(event.target.value);
    setEditedProduct({ ...editedProduct, quantity: newQuantity });
    if (newQuantity <= 0) {
      setErrors({ ...errors, quantity: "Quantity must be greater than 0" });
    } else {
      setErrors({ ...errors, quantity: "" });
    }
  };
  const handleReasonChange = (event) => {
    const reason = event.target.value;
    setEditedProduct({ ...editedProduct, reason: reason });
    if (!reason.trim()) {
      setErrors({ ...errors, reason: "Reason is required" });
    } else {
      setErrors({ ...errors, reason: "" });
    }
  };
  const isFormValid = () => {
    return (
      editedProduct.price > 0 &&
      editedProduct.quantity > 0 &&
      editedProduct.reason.trim() !== "" &&
      errors.price === "" &&
      errors.quantity === "" &&
      errors.reason === ""
    );
  };
  return (
    <EditFormBackdrop>
      <EditFormContainer>
        <ProductName>{product.productName}</ProductName>
        <BrandName>{product.brand}</BrandName>
        <EditFormContent>
          <ProductImage src={product.image} alt={product.productName} />
          <EditFields>
            <div>
              <FieldLabel>Price:</FieldLabel>
              <FieldInput
                type="number"
                value={editedProduct.price}
                onChange={handlePriceChange}
              />
              {errors.price && <ErrorMessage>{errors.price}</ErrorMessage>}
            </div>
            <QuantityContainer>
              <QuantityLabel>Quantity:</QuantityLabel>
              <QuantityInput
                type="number"
                value={editedProduct.quantity}
                onChange={handleQuantityChange}
              />
              {errors.quantity && (
                <ErrorMessage>{errors.quantity}</ErrorMessage>
              )}
            </QuantityContainer>
            <TotalLabel>
              Total: ₹
              {isNaN(editedProduct.price * editedProduct.quantity)
                ? 0
                : (editedProduct.price * editedProduct.quantity).toFixed(2)}
            </TotalLabel>
            <div>
              <FieldLabel>Reason:</FieldLabel>
              <FieldInput
                type="text"
                value={editedProduct.reason}
                onChange={handleReasonChange}
              />
              {errors.reason && <ErrorMessage>{errors.reason}</ErrorMessage>}
            </div>
          </EditFields>
        </EditFormContent>
        <ButtonsContainer>
          <CancelButton onClick={() => onCancel()}>Cancel</CancelButton>
          <SaveButton
            onClick={() => {
              if (isFormValid()) {
                onSave(editedProduct);
              } else {
                if (!editedProduct.reason.trim()) {
                  setErrors({ ...errors, reason: "Reason is required" });
                }
              }
            }}
          >
            Save
          </SaveButton>
        </ButtonsContainer>
      </EditFormContainer>
    </EditFormBackdrop>
  );
};
export default EditProductForm;
