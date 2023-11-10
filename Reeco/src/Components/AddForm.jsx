import React, { useState } from "react";
import styled from "styled-components";

const PopupBackdrop = styled.div`
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

const PopupContent = styled.div`
  background-color: white;
  border-radius: 10px;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.3);
  width: 80%;
  max-width: 600px;
  padding: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FormField = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-weight: bold;
  font-size: 18px;
`;

const Input = styled.input`
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
`;

const SaveButton = styled.button`
  padding: 12px 20px;
  background-color: #1f633e;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  margin-left: 10px;
`;

const CancelButton = styled.button`
  padding: 12px 20px;
  background-color: #ff6b6b;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const AddForm = ({ onAdd, onCancel }) => {
  const [formData, setFormData] = useState({
    productName: "",
    brand: "",
    price: "",
    quantity: "",
    status: "",
    image:
      "https://m.media-amazon.com/images/I/41EvGpCFECL._AC_UF1000,1000_QL80_.jpg",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(formData);
  };

  return (
    <PopupBackdrop>
      <PopupContent>
        <h2>Create Item</h2>
        <Form onSubmit={handleSubmit}>
          <FormField>
            <InputContainer>
              <Label>Product Name:</Label>
              <Input
                type="text"
                name="productName"
                value={formData.productName}
                onChange={handleChange}
                required
              />
            </InputContainer>
          </FormField>
          <FormField>
            <InputContainer>
              <Label>Brand:</Label>
              <Input
                type="text"
                name="brand"
                value={formData.brand}
                onChange={handleChange}
                required
              />
            </InputContainer>
          </FormField>
          <FormField>
            <InputContainer>
              <Label>Price:</Label>
              <Input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                min="0"
              />
            </InputContainer>
          </FormField>
          <FormField>
            <InputContainer>
              <Label>Quantity:</Label>
              <Input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                required
                min="0"
              />
            </InputContainer>
          </FormField>

          <ButtonContainer>
            <CancelButton onClick={onCancel}>Cancel</CancelButton>
            <SaveButton type="submit">Save</SaveButton>
          </ButtonContainer>
        </Form>
      </PopupContent>
    </PopupBackdrop>
  );
};

export default AddForm;
