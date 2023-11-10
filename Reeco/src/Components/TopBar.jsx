import styled from "styled-components";
import { AiOutlineShoppingCart } from "react-icons/ai";
const TopBarContainer = styled.div`
  background-color: #1f633e;
  color: white;
  padding: 0 10px 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const LeftOptions = styled.div`
  display: flex;
  align-items: center;
`;
const Title = styled.h1`
  font-size: 24px;
  margin: 0;
  margin-left: 20px;
`;
const Menu = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
`;
const MenuItem = styled.li`
  margin-left: 20px;
  margin-right: 20px;
  padding: 10px;
  cursor: pointer;
`;
const RightOptions = styled.div`
  display: flex;
  align-items: center;
`;
const CartIcon = styled(AiOutlineShoppingCart)`
  font-size: 24px;
  margin-right: 50px;
`;
const LogoutButton = styled.button`
  background-color: transparent;
  font-size: 16px;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-right: 40px;
  &:hover {
    background-color: #618264;
  }
`;
const TopBar = () => {
  return (
    <TopBarContainer>
      <LeftOptions>
        <Title>Reeco</Title>
        <Menu>
          <MenuItem>Store</MenuItem>
          <MenuItem>Order</MenuItem>
          <MenuItem>Analytics</MenuItem>
        </Menu>
      </LeftOptions>
      <RightOptions>
        <CartIcon />
        <LogoutButton>Hello, World</LogoutButton>
      </RightOptions>
    </TopBarContainer>
  );
};
export default TopBar;
