import React from "react";
import styled from "styled-components";
import { useAppSelector } from "../hooks";
import { PiBowlFood } from "react-icons/pi";
import { orderDetailData } from "../Constants";

const CardContainer = styled.div`
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 20px;
  max-width: 80%;
  margin: 0 auto;
  margin-bottom: 20px;
  margin-top: 20px;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 10px;
  background: white;
`;

const ColumnHeading = styled.div`
  font-weight: bold;
`;

const ColumnValue = styled.div``;

const OrderDetails = () => {
  const { OrderApproval_status, cartList } = useAppSelector(
    (state) => state.ReecoDetails
  );

  const calculateTotalPrice = () => {
    let totalPrice = 0;
    for (const item of cartList) {
      const price = parseFloat(item.price);
      const quantity = parseInt(item.quantity);
      if (!isNaN(price) && !isNaN(quantity)) {
        totalPrice += price * quantity;
      }
    }
    return `₹${totalPrice.toFixed(2)}`;
  };

  return (
    <CardContainer>
      <div>
        <ColumnHeading>Supplier:</ColumnHeading>
        <ColumnValue>{orderDetailData.supplier}</ColumnValue>
      </div>
      <div>
        <ColumnHeading>Shipping Date:</ColumnHeading>
        <ColumnValue>{orderDetailData.shippingDate}</ColumnValue>
      </div>
      <div>
        <ColumnHeading>Categories:</ColumnHeading>
        <ColumnValue>
          <PiBowlFood />
          <PiBowlFood />
          <PiBowlFood />
        </ColumnValue>
      </div>
      <div>
        <ColumnHeading>Total:</ColumnHeading>
        <ColumnValue>{calculateTotalPrice()}</ColumnValue>
      </div>
      <div>
        <ColumnHeading>Department:</ColumnHeading>
        <ColumnValue>{orderDetailData.department}</ColumnValue>
      </div>
      <div>
        <ColumnHeading>Status:</ColumnHeading>
        <ColumnValue>
          {OrderApproval_status ? "Approved" : "Processing"}
        </ColumnValue>
      </div>
    </CardContainer>
  );
};

export default OrderDetails;
