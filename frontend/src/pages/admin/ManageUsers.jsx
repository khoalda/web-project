import React, { useState, useEffect } from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  TextField,
  Container,
  TablePagination,
  tableCellClasses,
  TableSortLabel,
  Box,
  styled,
} from "@mui/material";
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
} from "@mui/icons-material";

import { readAllUsers, updateUserInfo } from "../../api/users";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));



const initialUsersList = {
  aId: "",
  username: "",
  level: "",
  name: "",
  image: "",
  dateOfBirth: "",
  phoneNumber: "",
  email: "",
  address: "",
  status: "",
};

const ManageProducts = () => {
  const [users, setUsersList] = useState([]);
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedUser, setSelectedUser] = useState(initialUsersList);
  const [openDelete, setOpenDelete] = useState(false);
  const [openStatus, setOpenStatus] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState(null);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortColumn, setSortColumn] = useState("aId");

  useEffect(() => {
    const fetchUsers = async () => {
      const data = await readAllUsers();
      console.log(data.data);
      setUsersList(data.data);
    };
    fetchUsers();
  }, []);
/*
  const handleOpenStatus = (user) => {
    setSelectedUser(user);
    setOpenEdit(true);
  };

  const handleCloseStatus = () => {
    setOpenEdit(false);
    setSelectedUser(initialUsersList);
  };
*/
  const handleOpenEdit = (user) => {
    setSelectedUser(user);
    setOpenEdit(true);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
    setSelectedUser(initialUsersList);
  };

  const handleOpenDelete = (aId) => {
    setOpenDelete(true);
    setDeleteUserId(aId);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
    setDeleteUserId(null);
  };
/*
  const handleStatus = (user) => {
    const index = users.findIndex((p) => p.aId === user.aId);
    const newUsersList = [...users];
    newUsersList[index] = user;
    setUsersList(newUsersList);
    setOpenStatus(false);
    setSelectedUser(initialUsersList);
  };
*/
  const handleEdit = (user) => {
    const index = users.findIndex((p) => p.aId === user.aId);
    const newUsersList = [...users];
    newUsersList[index] = user;
    setUsersList(newUsersList);
    setOpenEdit(false);
    setSelectedUser(initialUsersList);
  };

  const handleDelete = (aId) => {
    const newUsersList = users.filter((user) => user.aId !== aId);
    setUsersList(newUsersList);
  };

  const handleSort = (column) => {
    const isAsc = sortColumn === column && sortOrder === "asc";
    const newSortOrder = isAsc ? "desc" : "asc";
    setSortOrder(newSortOrder);
    setSortColumn(column);
    const sortedProducts = users.sort((a, b) => {
      return isAsc
          ? a[column].toString().localeCompare(b[column].toString())
          : b[column].toString().localeCompare(a[column].toString());
    });
    setUsersList(sortedProducts);
  };

  return (
    <div>
      <Container>
        {users?.length > 0 ? (
          <Box sx={{ width: "100%" }}>
            <Paper sx={{ width: "100%", mb: 2 }}>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>
                        <TableSortLabel
                          active={sortColumn === "aId"}
                          direction={sortColumn === "aId" ? sortOrder : "asc"}
                          onClick={() => handleSort("aId")}
                        >
                          Account ID
                        </TableSortLabel>
                      </StyledTableCell>
                      <StyledTableCell></StyledTableCell>
                      <StyledTableCell>
                        <TableSortLabel
                          active={sortColumn === "username"}
                          direction={sortColumn === "username" ? sortOrder : "asc"}
                          onClick={() => handleSort("username")}
                        >
                          Username
                        </TableSortLabel>
                      </StyledTableCell>

                      
                      <StyledTableCell>
                        <TableSortLabel
                          active={sortColumn === "name"}
                          direction={sortColumn === "name" ? sortOrder : "asc"}
                          onClick={() => handleSort("name")}
                        >
                          Name
                        </TableSortLabel>
                      </StyledTableCell>
                      <StyledTableCell>
                        <TableSortLabel
                          active={sortColumn === "level"}
                          direction={sortColumn === "level" ? sortOrder : "asc"}
                          onClick={() => handleSort("level")}
                        >
                          Level
                        </TableSortLabel>
                      </StyledTableCell>
                      <StyledTableCell>
                        <TableSortLabel
                          active={sortColumn === "staus"}
                          direction={sortColumn === "staus" ? sortOrder : "asc"}
                          onClick={() => handleSort("status")}
                        >
                          Status
                        </TableSortLabel>
                      </StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {users
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((user) => (
                        <StyledTableRow key={user.aId}>
                          <TableCell>{user.aId}</TableCell>
                          
                          <TableCell>
                            <img
                              src={`${user.urlAvatar}`}
                              alt={user.name}
                              width="50"
                              height="50"
                              style={{
                                objectFit: "contain",
                                objectPosition: "center center",
                              }}
                            />
                          </TableCell>
                          <TableCell>{user.username}</TableCell>
                          <TableCell>{user.name}</TableCell>
                          <TableCell>{user.level}</TableCell>
                          <TableCell>{user.status}</TableCell>
                          <TableCell>
                            <IconButton onClick={() => handleOpenEdit(user)}>
                              <EditIcon />
                            </IconButton>
                            <IconButton
                              onClick={() => handleOpenDelete(user.aId)}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </TableCell>
                        </StyledTableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={users.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={(event, newPage) => {
                  setPage(newPage);
                }}
                onRowsPerPageChange={(event) => {
                  setRowsPerPage(parseInt(event.target.value, 10));
                  setPage(0);
                }}
              />
            </Paper>
          </Box>
        ) : (
          <div>
            <h2>Không có sản phẩm nào</h2>
          </div>
        )}

        {/* Enable/Disable user Dialog */}      
        {/*
        <Dialog open={openStatus} onClose={handleCloseStatus}>
          <DialogTitle>Confirm Delete</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete this product?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseStatus}>Cancel</Button>
            <Button
              onClick={() => {
                handleStatus(userId);
                handleCloseDelete();
              }}
              color="secondary"
            >
              Enable
            </Button>
          </DialogActions>
        </Dialog>
      */}
        {/* Enable/Disable user Dialog */}      
        <Dialog open={openDelete} onClose={handleCloseDelete}>
          <DialogTitle>Confirm Delete</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete this product?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDelete}>Cancel</Button>
            <Button
              onClick={() => {
                handleDelete(deleteUserId);
                handleCloseDelete();
              }}
              color="secondary"
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>  
*/
        {/* Edit Product Dialog */}
        <Dialog open={openEdit} onClose={handleCloseEdit}>
          <DialogTitle>User Detail</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please update product details:
            </DialogContentText>
            <TextField
              label="Account ID"
              fullWidth
              value={selectedUser.aId}
              onChange={(e) =>
                setSelectedUser({ ...selectedUser, aId: e.target.value })
              }
            />
            <TextField
              label="Username"
              fullWidth
              value={selectedUser.username}
              onChange={(e) =>
                setSelectedUser({ ...selectedUser, name: e.target.value })
              }
            />
            <TextField
              label="Price"
              fullWidth
              value={selectedUser.price}
              onChange={(e) =>
                setSelectedUser({
                  ...selectedUser,
                  price: e.target.value,
                })
              }
            />
            <TextField
              label="Description"
              fullWidth
              value={selectedUser.description}
              onChange={(e) =>
                setSelectedUser({
                  ...selectedUser,
                  description: e.target.value,
                })
              }
            />
            <TextField
              label="Image"
              fullWidth
              value={selectedUser.urlAvatar}
              onChange={(e) =>
                setSelectedUser({
                  ...selectedUser,
                  image: e.target.value,
                })
              }
            />
            <TextField
              label="Category Id"
              fullWidth
              value={selectedUser.Cname}
              onChange={(e) =>
                setSelectedUser({
                  ...selectedUser,
                  Cname: e.target.value,
                })
              }
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseEdit}>Cancel</Button>
            <Button
              onClick={() => {
                handleEdit(selectedUser);
                setSelectedUser(initialUsersList);
              }}
            >
              Update
            </Button>
          </DialogActions>
        </Dialog>

        {/* Delete user Dialog */}
        <Dialog open={openDelete} onClose={handleCloseDelete}>
          <DialogTitle>Confirm Delete</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete this user?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDelete}>Cancel</Button>
            <Button
              onClick={() => {
                handleDelete(deleteUserId);
                handleCloseDelete();
              }}
              color="secondary"
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </div>
  );
};

export default ManageProducts;
