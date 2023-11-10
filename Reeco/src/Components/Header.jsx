import React from "react";
import styled from "styled-components";
import { staticData } from "../Constants";
import { useAppDispatch, useAppSelector } from "../hooks";
import { orderStatus } from "../data/lib/Slices/Reeco";
const HeaderContainer = styled.div`
  background-color: #f0f0f0;
  padding: 10px;
  border-radius: 5px;
  height: 30%;
  display: flex;

  flex-direction: column;
  justify-content: space-around;
`;
const Row1 = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 30px 0 30px;
`;
const Row2 = styled.div`
  padding: 10px 0 10px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 30px 0 30px;
`;
const OrderInfo = styled.div`
  font-weight: 600;
`;
const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
`;
const Button1 = styled.button`
  padding: 5px 10px;
  background-color: #fffefe;
  color: black;
  border-radius: 50px;
  cursor: pointer;
  border: 2px solid #1f633e;
`;
const Button2 = styled.button`
  padding: 5px 10px;
  background-color: #1f633e;
  color: white;
  border: none;
  border-radius: 50px;
  cursor: pointer;
`;
const Order = styled.div`
  font-weight: bold;
  font-size: 24px;
`;
const Header = () => {
  const { OrderApproval_status } = useAppSelector(
    (state) => state.ReecoDetails
  );
  const dispatch = useAppDispatch();
  return (
    <HeaderContainer>
      <Row1>
        <OrderInfo>{`Order > ${staticData.OrderId}`}</OrderInfo>
      </Row1>
      <Row2>
        <Order>{staticData.OrderId}</Order>
        <Buttons>
          <Button1>Back</Button1>
          <Button2 onClick={() => dispatch(orderStatus())}>
            {OrderApproval_status ? "Order Approved" : "Approve Order"}
          </Button2>
        </Buttons>
      </Row2>
    </HeaderContainer>
  );
};
export default Header;
