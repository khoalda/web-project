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
  TableSortLabel,
  Box,
  styled,
} from "@mui/material";
import {
  Delete,
  Visibility,
  PersonOff,
  PersonAdd,
} from "@mui/icons-material";
import { useSnackbar } from "notistack";
import { readAllUsers, deleteUser, toggleUserStatus } from "../../api/users";

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const initialUser = {
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
  const [users, setUsers] = useState([]);
  const [openDetail, setOpenEdit] = useState(false);
  const [selectedUser, setSelectedUser] = useState(initialUser);
  const [openDelete, setOpenDelete] = useState(false);
  const [openStatus, setOpenStatus] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortColumn, setSortColumn] = useState("aId");

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const fetchUsers = async () => {
      const data = await readAllUsers();
      setUsers(data.data);
    };
    fetchUsers();
  }, []);

  const handleOpenStatus = (user) => {
    setOpenStatus(true);
    setSelectedUser(user);
  };

  const handleCloseStatus = () => {
    setOpenStatus(false);
    setSelectedUser(initialUser);
  };

  const handleOpenDetail = (user) => {
    setSelectedUser(user);
    setOpenEdit(true);
  };

  const handleCloseDetail = () => {
    setOpenEdit(false);
    setSelectedUser(initialUser);
  };

  const handleOpenDelete = (aId) => {
    setOpenDelete(true);
    setDeleteUserId(aId);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
    setDeleteUserId(null);
  };

  const handleStatus = (id) => {
    toggleUserStatus(id).then((res) => {
      enqueueSnackbar("Cập nhật thành công", {
        variant: "success",
      });
      readAllUsers()
        .then((res) => {
          setUsers(res.data);
          handleCloseStatus();
        })
        .catch((err) => {
          enqueueSnackbar("Cập nhật thất bại", {
            variant: "error",
          });
        });
    });
  };

  const handleDelete = (aId) => {
    deleteUser(aId)
      .then((res) => {
        enqueueSnackbar("Xóa người dùng thành công", {
          variant: "success",
        });
        const newUsersList = users.filter((user) => user.aId !== aId);
        setUsers(newUsersList);
        handleCloseDelete();
      })
      .catch((err) => {
        enqueueSnackbar("Xóa người dùng thất bại", {
          variant: "error",
        });
      });
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
    setUsers(sortedProducts);
  };

  return (
    <div>
      <Container
        sx={{
          marginTop: "20px",
        }}
      >
        {users?.length > 0 ? (
          <Box sx={{ width: "100%" }}>
            <Paper sx={{ width: "100%", mb: 2 }}>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        <TableSortLabel
                          active={sortColumn === "aId"}
                          direction={sortColumn === "aId" ? sortOrder : "asc"}
                          onClick={() => handleSort("aId")}
                        >
                          ID
                        </TableSortLabel>
                      </TableCell>
                      <TableCell>Ảnh đại diện</TableCell>
                      <TableCell>
                        <TableSortLabel
                          active={sortColumn === "username"}
                          direction={
                            sortColumn === "username" ? sortOrder : "asc"
                          }
                          onClick={() => handleSort("username")}
                        >
                          Tên đăng nhập
                        </TableSortLabel>
                      </TableCell>

                      <TableCell>
                        <TableSortLabel
                          active={sortColumn === "name"}
                          direction={sortColumn === "name" ? sortOrder : "asc"}
                          onClick={() => handleSort("name")}
                        >
                          Tên
                        </TableSortLabel>
                      </TableCell>
                      <TableCell>
                        <TableSortLabel
                          active={sortColumn === "level"}
                          direction={sortColumn === "level" ? sortOrder : "asc"}
                          onClick={() => handleSort("level")}
                        >
                          Loại tài khoản
                        </TableSortLabel>
                      </TableCell>
                      <TableCell>
                        <TableSortLabel
                          active={sortColumn === "staus"}
                          direction={sortColumn === "staus" ? sortOrder : "asc"}
                          onClick={() => handleSort("status")}
                        >
                          Trạng thái
                        </TableSortLabel>
                      </TableCell>
                      <TableCell>Hành động</TableCell>
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
                              src={user.urlAvatar || "/avatar.png"}
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
                          <TableCell>
                            <span
                              style={{
                                color: "#F2F4F3",
                                backgroundColor: "#57452e",
                                padding: "5px",
                                borderRadius: "5px",
                              }}
                            >
                              {user.level === "2" ? "Admin" : "Khách hàng"}
                            </span>
                          </TableCell>
                          <TableCell>
                            <span
                              style={{
                                color: "#FFFFFF",
                                backgroundColor:
                                  user.status === "0" ? "red" : "green",
                                padding: "5px",
                                borderRadius: "5px",
                              }}
                            >
                              {user.status === "0" ? "Bị chặn" : "Hoạt động"}
                            </span>
                          </TableCell>
                          <TableCell>
                            <IconButton onClick={() => handleOpenDetail(user)}>
                              <Visibility />
                            </IconButton>
                            {user.level === "1" && (
                              <>
                                <IconButton
                                  onClick={() => handleOpenStatus(user)}
                                >
                                  {user.status === "0" ? (
                                    <PersonAdd />
                                  ) : (
                                    <PersonOff />
                                  )}
                                </IconButton>
                                <IconButton
                                  onClick={() => handleOpenDelete(user.aId)}
                                >
                                  <Delete />
                                </IconButton>
                              </>
                            )}
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
                labelDisplayedRows={({ from, to, count }) =>
                  `${from}-${to} trên ${count}`
                }
                labelRowsPerPage="Số người dùng mỗi trang"
              />
            </Paper>
          </Box>
        ) : (
          <div>
            <h2>Không có người dùng nào</h2>
          </div>
        )}

        {/* User detail Dialog */}
        <Dialog open={openDetail} onClose={handleCloseDetail}>
          <DialogTitle>Thông tin người dùng</DialogTitle>
          <DialogContent
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "450px",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src={selectedUser.urlAvatar || "/avatar.png"}
              alt="Avatar"
              style={{
                width: "145px",
                height: "145px",
                borderRadius: "50%",
                marginTop: "50px",
                position: "relative",
              }}
            />
            <h5 className="py-1" style={{ color: "black" }}>
              {selectedUser.username}
            </h5>
            <span
              style={{
                color: "#F2F4F3",
                backgroundColor: "#57452e",
                padding: "5px",
                borderRadius: "5px",
              }}
            >
              {selectedUser.level === "2" ? "Admin" : "Khách hàng"}
            </span>
            <TextField
              label="Tên"
              fullWidth
              value={selectedUser.name}
              sx={{ marginTop: 2 }}
              variant="standard"
            />
            <TextField
              label="Ngày sinh"
              fullWidth
              value={selectedUser.dateOfBirth}
              sx={{ marginTop: 2 }}
              variant="standard"
            />
            <TextField
              label="Số điện thoại"
              fullWidth
              value={selectedUser.phoneNumber}
              sx={{ marginTop: 2 }}
              variant="standard"
            />
            <TextField
              label="Email"
              fullWidth
              value={selectedUser.email}
              sx={{ marginTop: 2 }}
              variant="standard"
            />
            <TextField
              label="Địa chỉ"
              fullWidth
              value={selectedUser.address}
              sx={{ marginTop: 2 }}
              variant="standard"
            />
          </DialogContent>
          <DialogActions>
            <Button variant="contained" onClick={handleCloseDetail}>
              Xong
            </Button>
          </DialogActions>
        </Dialog>

        {/* Delete user Dialog */}
        <Dialog open={openDelete} onClose={handleCloseDelete}>
          <DialogTitle>Xác nhận xóa</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Bạn có chắc chắn muốn xóa người dùng này không?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDelete} variant="outlined">
              Hủy
            </Button>
            <Button
              onClick={() => {
                handleDelete(deleteUserId);
                handleCloseDelete();
              }}
              variant="contained"
            >
              Xóa
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog open={openStatus} onClose={handleCloseStatus}>
          <DialogTitle>
            Xác nhận {selectedUser.status === "1" ? "chặn" : "bỏ chặn"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Bạn có chắc chắn muốn{" "}
              {selectedUser.status === "1" ? "chặn" : "bỏ chặn"} người dùng này
              không?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseStatus} variant="outlined">
              Hủy
            </Button>
            <Button
              onClick={() => {
                handleStatus(selectedUser.aId);
              }}
              variant="contained"
            >
              {selectedUser.status === "1" ? "chặn" : "bỏ chặn"}
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </div>
  );
};

export default ManageProducts;
