import React, { useState } from "react";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../hooks";
import { AiOutlinePrinter } from "react-icons/ai";
import { addtoCart, editCart, updateStatus } from "../data/lib/Slices/Reeco";
import EditProductForm from "./EditProductForm";
import CancelModal from "./CancelModal";
import { tableHeader } from "../Constants";
import AddForm from "./AddForm";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

const TableContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 5px;
  width: 80%;
  margin: 0 auto;
  background: white;
`;
const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;
const TableHeader = styled.thead`
  background-color: #f0f0f0;
  text-align: center;
`;
const TableHeaderRow = styled.tr`
  background: white;
`;
const TableCellHeader = styled.th`
  padding: 10px;
  border-bottom: 1px solid #ccc;
`;
const TableBody = styled.tbody``;
const TableRow = styled.tr`
  background-color: #f9f9f9;
`;
const TableCell = styled.td`
  padding: 10px;
  border-bottom: 1px solid #ccc;
  text-align: center;
`;
const SearchBox = styled.input`
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 10px;
  width: 20%;
`;
const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 10px;
`;
const AddButton = styled.button`
  padding: 5px 10px;
  background-color: #fffefe;
  color: black;
  border-radius: 50px;
  cursor: pointer;
  border: 2px solid #1f633e;
`;
const PrintIcon = styled(AiOutlinePrinter)`
  font-size: 24px;
  padding: 5px 10px;
  color: #333;
  cursor: pointer;
  margin-left: 10px;
`;
const Button = styled.button`
  padding: 5px 10px;
  border: none;
  margin: 0 10px 0 10px;
  border-radius: 5px;
  cursor: pointer;
  background-color: #fffefe;
  color: black;

  &.approve {
    background-color: #1f633e;
    color: white;
  }

  &.cancel {
    background-color: #ff6b6b;
    color: white;
  }

  &.editBtn {
    font-size: 1rem;
    font-weight: 600;
  }
`;
const ApproveIcon = styled(CheckIcon)`
  font-size: 20px;
  margin-right: 50px;
  cursor: pointer;

  &.approved {
    color: green;
  }
`;
const CancelIcon = styled(CloseIcon)`
  font-size: 20px;
  margin-right: 50px;
  cursor: pointer;

  &.missing {
    color: orange;
  }
  &.urgent {
    color: red;
  }
`;
const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
`;
const getStatusColor = (status) => {
  switch (status) {
    case "Approved":
      return "green";
    case "Missing-Urgent":
      return "red";
    case "Missing":
      return "orange";
    default:
      return "none";
  }
};
const StatusCell = styled.td`
  padding: 10px;
  border-bottom: 1px solid #ccc;
  text-align: center;
  color: ${(props) => getStatusColor(props.status)};
`;
const ProductImage = styled.img`
  width: 100px;
  height: 100px;
`;
const OrderTable = () => {
  const { cartList, OrderApproval_status } = useAppSelector(
    (state) => state.ReecoDetails
  );
  const dispatch = useAppDispatch();
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [editModalOpen, setIsEditModalOpen] = useState(false);
  const [addModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState({
    productName: "",
    brand: "",
    price: "",
    quantity: "",
    status: "",
    image: "",
    reason: "",
  });
  const [searchInput, setSearchInput] = useState("");
  const filteredCartList = cartList.filter((item) => {
    const searchValue = searchInput.toLowerCase();
    return item.productName.toLowerCase().includes(searchValue);
  });
  const openCancelModal = (item) => {
    setSelectedItem(item);
    setIsCancelModalOpen(true);
  };
  const closeCancelModal = () => {
    setIsCancelModalOpen(false);
  };
  const handleStatusChange = (status) => {
    dispatch(updateStatus({ selectedItem, status }));
    closeCancelModal();
  };
  const onClickApprove = (item) => {
    const status = "Approved";
    dispatch(updateStatus({ selectedItem: item, status }));
  };
  const printPage = () => {
    window.print();
  };

  const renderRow = () => {
    return filteredCartList.length === 0
      ? "No Items Found"
      : filteredCartList.map((item) => (
          <TableRow key={item.id}>
            <TableCell>
              <ProductImage src={item.image} alt={item.productName} />
            </TableCell>
            <TableCell>{item.productName}</TableCell>
            <TableCell>{item.brand}</TableCell>
            <TableCell>₹{item.price}</TableCell>
            <TableCell>{item.quantity}</TableCell>
            <TableCell>₹{(item.price * item.quantity).toFixed(2)}</TableCell>
            <StatusCell status={item.status}>{item.status || ""}</StatusCell>
            <TableCell>
              <ApproveIcon
                className={item.status === "Approved" ? "approved" : ""}
                onClick={() => {
                  if (!OrderApproval_status) {
                    onClickApprove(item);
                  } else {
                    alert("Order Already Approved");
                  }
                }}
              />
              <CancelIcon
                className={
                  item.status === "Missing"
                    ? "missing"
                    : item.status === "Missing-Urgent"
                    ? "urgent"
                    : ""
                }
                onClick={() => {
                  if (!OrderApproval_status) {
                    openCancelModal(item);
                  } else {
                    alert("Order Already Approved");
                  }
                }}
              />
              <Button
                className="editBtn"
                onClick={() => {
                  if (!OrderApproval_status) {
                    setSelectedItem(item);
                    setIsEditModalOpen(true);
                  } else {
                    alert("Order Already Approved");
                  }
                }}
              >
                Edit
              </Button>
            </TableCell>
          </TableRow>
        ));
  };

  return (
    <TableContainer>
      <ButtonContainer>
        <SearchBox
          type="text"
          placeholder="Search By Product Name"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />

        <Buttons>
          <AddButton
            onClick={() => {
              if (!OrderApproval_status) {
                setIsAddModalOpen(true);
              } else alert("Order Already Approved");
            }}
          >
            Add Item
          </AddButton>
          <PrintIcon onClick={printPage} />
        </Buttons>
      </ButtonContainer>
      <Table>
        <TableHeader>
          <TableHeaderRow>
            {tableHeader.map((header) => (
              <TableCellHeader>{header}</TableCellHeader>
            ))}
          </TableHeaderRow>
        </TableHeader>
        <TableBody>{renderRow()}</TableBody>
      </Table>
      {isCancelModalOpen && (
        <CancelModal
          product={selectedItem}
          onClick={handleStatusChange}
          onClose={closeCancelModal}
        />
      )}
      {editModalOpen && (
        <EditProductForm
          product={selectedItem}
          onSave={(editedProduct) => {
            dispatch(editCart(editedProduct));
            setIsEditModalOpen(false);
          }}
          onCancel={() => setIsEditModalOpen(false)}
        />
      )}
      {addModalOpen && (
        <AddForm
          onAdd={(product) => {
            dispatch(addtoCart(product));
            setIsAddModalOpen(false);
          }}
          onCancel={() => setIsAddModalOpen(false)}
        />
      )}
    </TableContainer>
  );
};
export default OrderTable;
