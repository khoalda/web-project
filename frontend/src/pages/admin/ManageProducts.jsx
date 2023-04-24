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

const initialProduct = {
  pId: "",
  name: "",
  price: "",
  description: "",
  image: "",
  categoryId: "",
};

const productsData = [
  {
    pId: 1,
    name: "Product 1",
    price: 10,
    description: "Description for Product 1",
    image: "https://via.placeholder.com/150",
    categoryId: 1,
  },
  {
    pId: 2,
    name: "Product 2",
    price: 20,
    description: "Description for Product 2",
    image: "https://via.placeholder.com/150",
    categoryId: 2,
  },
];

const ManageProducts = () => {
  const [products, setProducts] = useState(productsData);
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(initialProduct);
  const [openDelete, setOpenDelete] = useState(false);
  const [deleteProductId, setDeleteProductId] = useState(null);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortColumn, setSortColumn] = useState("pId");

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
    setSelectedProduct(initialProduct);
  };

  const handleOpenDelete = (pId) => {
    setOpenDelete(true);
    setDeleteProductId(pId);
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
    const index = products.findIndex((p) => p.pId === product.pId);
    const newProducts = [...products];
    newProducts[index] = product;
    setProducts(newProducts);
    setOpenEdit(false);
    setSelectedProduct(initialProduct);
  };

  const handleDelete = (pId) => {
    const newProducts = products.filter((product) => product.pId !== pId);
    setProducts(newProducts);
  };

  const handleSort = (column) => {
    const isAsc = sortColumn === column && sortOrder === "asc";
    const newSortOrder = isAsc ? "desc" : "asc";
    setSortOrder(newSortOrder);
    setSortColumn(column);
    const sortedProducts = products.sort((a, b) => {
      if (column === "price") {
        return isAsc ? a.price - b.price : b.price - a.price;
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
                    active={sortColumn === "pId"}
                    direction={sortColumn === "pId" ? sortOrder : "asc"}
                    onClick={() => handleSort("pId")}
                  >
                    Product Id
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
                    active={sortColumn === "price"}
                    direction={sortColumn === "price" ? sortOrder : "asc"}
                    onClick={() => handleSort("price")}
                  >
                    Price
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
                  <TableRow key={product.pId}>
                    <TableCell>{product.pId}</TableCell>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>{product.price}</TableCell>
                    <TableCell>{product.description}</TableCell>
                    <TableCell>
                      <img src={product.image} alt={product.name} width="50" />
                    </TableCell>
                    <TableCell>{product.categoryId}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleOpenEdit(product)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => handleOpenDelete(product.pId)}>
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
              label="Product Id"
              fullWidth
              value={selectedProduct.pId}
              onChange={(e) =>
                setSelectedProduct({ ...selectedProduct, pId: e.target.value })
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
              label="Price"
              fullWidth
              value={selectedProduct.price}
              onChange={(e) =>
                setSelectedProduct({
                  ...selectedProduct,
                  price: e.target.value,
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
                setSelectedProduct(initialProduct);
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
              label="Product Id"
              fullWidth
              value={selectedProduct.pId}
              onChange={(e) =>
                setSelectedProduct({ ...selectedProduct, pId: e.target.value })
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
              label="Price"
              fullWidth
              value={selectedProduct.price}
              onChange={(e) =>
                setSelectedProduct({
                  ...selectedProduct,
                  price: e.target.value,
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
                setSelectedProduct(initialProduct);
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

export default ManageProducts;
