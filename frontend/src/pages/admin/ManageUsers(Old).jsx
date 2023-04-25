/*import React from 'react'

const ManageUsers = () => {
  return (
    <div>ManageUsers</div>
  )
}

export default ManageUsers
*/
import React, { useState } from "react";
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
} from "@mui/material";
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
} from "@mui/icons-material";

import { readAllUsers, updateUserInfo } from "../../api/users";

const initUserList = {
  aId: "",
  username: "",
  level: "",
  name: "",
  image: "",
  status: "",
};

const testUserData = [
  {
    aId: 1,
    username: "User 1",
    level: 10,
    description: "Description for Product 1",
    image: "https://via.placeholder.com/150",
    categoryId: 1,
  },
  {
    aId: 3,
    username: "User 2",
    level: 20,
    description: "Description for Product 2",
    image: "https://via.placeholder.com/150",
    categoryId: 2,
  },

];



const ManageUsers = () => {
  const [products, setProducts] = useState(testUserData);
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(initUserList);
  const [openDelete, setOpenDelete] = useState(false);
  const [deleteProductId, setDeleteProductId] = useState(null);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortColumn, setSortColumn] = useState("aId");

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await readAllUsers();
      setProducts(data.data);
    };
    fetchProducts();
  }, []);

  const handleOpenAdd = () => {
    setOpenAdd(true);
  };

  const handleCloseAdd = () => {
    setOpenAdd(false);
  };

  const handleOpenEdit = (product) => {
    setSelectedProduct(product);
    setOpenEdit(true);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
    setSelectedProduct(initUserList);
  };

  const handleOpenDelete = (aId) => {
    setOpenDelete(true);
    setDeleteProductId(aId);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
    setDeleteProductId(null);
  };

  const handleAdd = (product) => {
    setProducts([...products, product]);
    setOpenAdd(false);
  };

  const handleEdit = (product) => {
    const index = products.findIndex((p) => p.aId === product.aId);
    const newProducts = [...products];
    newProducts[index] = product;
    setProducts(newProducts);
    setOpenEdit(false);
    setSelectedProduct(initUserList);
  };

  const handleDelete = (aId) => {
    const newProducts = products.filter((product) => product.aId !== aId);
    setProducts(newProducts);
  };

  const handleSort = (column) => {
    const isAsc = sortColumn === column && sortOrder === "asc";
    const newSortOrder = isAsc ? "desc" : "asc";
    setSortOrder(newSortOrder);
    setSortColumn(column);
    const sortedProducts = products.sort((a, b) => {
      if (column === "level") {
        return isAsc ? a.level - b.level : b.level - a.level;
      } else {
        return isAsc
          ? a[column].toString().localeCompare(b[column].toString())
          : b[column].toString().localeCompare(a[column].toString());
      }
    });
    setProducts(sortedProducts);
  };

  return (
    <div>
      <Container>
        <Button variant="contained" onClick={handleOpenAdd}>
          <AddIcon />
          Thêm sản phẩm
        </Button>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <TableSortLabel
                    active={sortColumn === "aId"}
                    direction={sortColumn === "aId" ? sortOrder : "asc"}
                    onClick={() => handleSort("aId")}
                  >
                    User ID
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={sortColumn === "name"}
                    direction={sortColumn === "name" ? sortOrder : "asc"}
                    onClick={() => handleSort("name")}
                  >
                    Name
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={sortColumn === "level"}
                    direction={sortColumn === "level" ? sortOrder : "asc"}
                    onClick={() => handleSort("level")}
                  >
                    level
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={sortColumn === "description"}
                    direction={sortColumn === "description" ? sortOrder : "asc"}
                    onClick={() => handleSort("description")}
                  >
                    Description
                  </TableSortLabel>
                </TableCell>
                <TableCell>Image</TableCell>
                <TableCell>
                  <TableSortLabel
                    active={sortColumn === "categoryId"}
                    direction={sortColumn === "categoryId" ? sortOrder : "asc"}
                    onClick={() => handleSort("categoryId")}
                  >
                    Category Id
                  </TableSortLabel>
                </TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((product) => (
                  <TableRow key={product.aId}>
                    <TableCell>{product.aId}</TableCell>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>{product.level}</TableCell>
                    <TableCell>{product.description}</TableCell>
                    <TableCell>
                      <img src={product.image} alt={product.name} width="50" />
                    </TableCell>
                    <TableCell>{product.categoryId}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleOpenEdit(product)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => handleOpenDelete(product.aId)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>

            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={products.length}
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
          </Table>
        </TableContainer>

        {/* Add Product Dialog */}
        <Dialog open={openAdd} onClose={handleCloseAdd}>
          <DialogTitle>Add Product</DialogTitle>
          <DialogContent>
            <DialogContentText>Please enter product details:</DialogContentText>
            <TextField
              label="User ID"
              fullWidth
              value={selectedProduct.aId}
              onChange={(e) =>
                setSelectedProduct({ ...selectedProduct, aId: e.target.value })
              }
            />
            <TextField
              label="Name"
              fullWidth
              value={selectedProduct.name}
              onChange={(e) =>
                setSelectedProduct({ ...selectedProduct, name: e.target.value })
              }
            />
            <TextField
              label="level"
              fullWidth
              value={selectedProduct.level}
              onChange={(e) =>
                setSelectedProduct({
                  ...selectedProduct,
                  level: e.target.value,
                })
              }
            />
            <TextField
              label="Description"
              fullWidth
              value={selectedProduct.description}
              onChange={(e) =>
                setSelectedProduct({
                  ...selectedProduct,
                  description: e.target.value,
                })
              }
            />
            <TextField
              label="Image"
              fullWidth
              value={selectedProduct.image}
              onChange={(e) =>
                setSelectedProduct({
                  ...selectedProduct,
                  image: e.target.value,
                })
              }
            />
            <TextField
              label="Category Id"
              fullWidth
              value={selectedProduct.categoryId}
              onChange={(e) =>
                setSelectedProduct({
                  ...selectedProduct,
                  categoryId: e.target.value,
                })
              }
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseAdd}>Cancel</Button>
            <Button
              onClick={() => {
                handleAdd(selectedProduct);
                setSelectedProduct(initUserList);
              }}
            >
              Add
            </Button>
          </DialogActions>
        </Dialog>

        {/* Edit Product Dialog */}
        <Dialog open={openEdit} onClose={handleCloseEdit}>
          <DialogTitle>Edit Product</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please update product details:
            </DialogContentText>
            <TextField
              label="User ID"
              fullWidth
              value={selectedProduct.aId}
              onChange={(e) =>
                setSelectedProduct({ ...selectedProduct, aId: e.target.value })
              }
            />
            <TextField
              label="Name"
              fullWidth
              value={selectedProduct.name}
              onChange={(e) =>
                setSelectedProduct({ ...selectedProduct, name: e.target.value })
              }
            />
            <TextField
              label="level"
              fullWidth
              value={selectedProduct.level}
              onChange={(e) =>
                setSelectedProduct({
                  ...selectedProduct,
                  level: e.target.value,
                })
              }
            />
            <TextField
              label="Description"
              fullWidth
              value={selectedProduct.description}
              onChange={(e) =>
                setSelectedProduct({
                  ...selectedProduct,
                  description: e.target.value,
                })
              }
            />
            <TextField
              label="Image"
              fullWidth
              value={selectedProduct.image}
              onChange={(e) =>
                setSelectedProduct({
                  ...selectedProduct,
                  image: e.target.value,
                })
              }
            />
            <TextField
              label="Category Id"
              fullWidth
              value={selectedProduct.categoryId}
              onChange={(e) =>
                setSelectedProduct({
                  ...selectedProduct,
                  categoryId: e.target.value,
                })
              }
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseEdit}>Cancel</Button>
            <Button
              onClick={() => {
                handleEdit(selectedProduct);
                setSelectedProduct(initUserList);
              }}
            >
              Update
            </Button>
          </DialogActions>
        </Dialog>

        {/* Delete Product Dialog */}
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
                handleDelete(deleteProductId);
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

export default ManageUsers;