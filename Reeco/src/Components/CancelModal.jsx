import React from "react";
import styled from "styled-components";

const ModalBackdrop = styled.div`
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

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  width: 20%;
  height: auto;
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  position: relative;
`;

const CloseIcon = styled.span`
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 20px;
  cursor: pointer;
`;

const ModalHeader = styled.h2`
  margin-top: 0;
`;

const ModalButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
`;

const ModalButton = styled.button`
  padding: 5px 10px;
  margin-left: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &.confirm {
    background-color: #1f633e;
    color: white;
  }

  &.cancel {
    background-color: #ff6b6b;
    color: white;
  }
`;

const CancelModal = ({ product, onClick, onClose }) => {
  return (
    <ModalBackdrop>
      <ModalContent>
        <CloseIcon onClick={onClose}>&times;</CloseIcon>
        <ModalHeader>Missing Product</ModalHeader>
        <p>Is {product.productName} urgent?</p>
        <ModalButtons>
          <ModalButton className="cancel" onClick={() => onClick("Missing")}>
            No
          </ModalButton>
          <ModalButton
            className="confirm"
            onClick={() => onClick("Missing-Urgent")}
          >
            Yes
          </ModalButton>
        </ModalButtons>
      </ModalContent>
    </ModalBackdrop>
  );
};

export default CancelModal;
