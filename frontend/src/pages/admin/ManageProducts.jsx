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
} from "@mui/material";
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
} from "@mui/icons-material";

import { readAll } from "../../api/products";

const initialProduct = {
  pId: "",
  name: "",
  price: "",
  description: "",
  image: "",
  Cname: "",
};

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(initialProduct);
  const [openDelete, setOpenDelete] = useState(false);
  const [deleteProductId, setDeleteProductId] = useState(null);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortColumn, setSortColumn] = useState("pId");

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await readAll();
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
      } else if (column === "pId") {
        return isAsc ? a.pId - b.pId : b.pId - a.pId;
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
      <Container
        sx={{
          marginTop: "20px",
        }}
      >
        <Button
          variant="contained"
          onClick={handleOpenAdd}
          sx={{
            marginBottom: "10px",
          }}
        >
          <AddIcon />
          Thêm sản phẩm
        </Button>

        {products?.length > 0 ? (
          <Box sx={{ width: "100%" }}>
            <Paper sx={{ width: "100%", mb: 2 }}>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        <TableSortLabel
                          active={sortColumn === "pId"}
                          direction={sortColumn === "pId" ? sortOrder : "asc"}
                          onClick={() => handleSort("pId")}
                        >
                          Id
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
                          active={sortColumn === "price"}
                          direction={sortColumn === "price" ? sortOrder : "asc"}
                          onClick={() => handleSort("price")}
                        >
                          Giá
                        </TableSortLabel>
                      </TableCell>
                      <TableCell
                        style={{
                          height: "50px",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        <TableSortLabel
                          active={sortColumn === "description"}
                          direction={
                            sortColumn === "description" ? sortOrder : "asc"
                          }
                          onClick={() => handleSort("description")}
                        >
                          Mô tả
                        </TableSortLabel>
                      </TableCell>
                      <TableCell>Hình ảnh</TableCell>
                      <TableCell>
                        <TableSortLabel
                          active={sortColumn === "Cname"}
                          direction={sortColumn === "Cname" ? sortOrder : "asc"}
                          onClick={() => handleSort("Cname")}
                        >
                          Danh mục
                        </TableSortLabel>
                      </TableCell>
                      <TableCell>Hành động</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {products
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((product) => (
                        <TableRow key={product.pId}>
                          <TableCell>{product.pId}</TableCell>
                          <TableCell>{product.name}</TableCell>
                          <TableCell>{product.price}</TableCell>
                          <TableCell>{product.description}</TableCell>
                          <TableCell>
                            <img
                              src={`/${product.image}`}
                              alt={product.name}
                              width="50"
                              height="50"
                              style={{
                                objectFit: "contain",
                                objectPosition: "center center",
                              }}
                            />
                          </TableCell>
                          <TableCell>{product.Cname}</TableCell>
                          <TableCell>
                            <IconButton onClick={() => handleOpenEdit(product)}>
                              <EditIcon />
                            </IconButton>
                            <IconButton
                              onClick={() => handleOpenDelete(product.pId)}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
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
                labelDisplayedRows={({ from, to, count }) =>
                  `${from}-${to} trên ${count}`
                }
                labelRowsPerPage="Số sản phẩm mỗi trang"
              />
            </Paper>
          </Box>
        ) : (
          <div>
            <h2>Không có sản phẩm nào</h2>
          </div>
        )}

        {/* Add Product Dialog */}
        <Dialog open={openAdd} onClose={handleCloseAdd}>
          <DialogTitle>Thêm sản phẩm</DialogTitle>
          <DialogContent>
            <DialogContentText>Nhập thông tin sản phẩm:</DialogContentText>
            <TextField
              label="Tên"
              fullWidth
              value={selectedProduct.name}
              onChange={(e) =>
                setSelectedProduct({ ...selectedProduct, name: e.target.value })
              }
            />
            <TextField
              label="Giá"
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
              label="Mô tả"
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
              label="URL hình ảnh"
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
              label="Danh mục"
              fullWidth
              value={selectedProduct.Cname}
              onChange={(e) =>
                setSelectedProduct({
                  ...selectedProduct,
                  Cname: e.target.value,
                })
              }
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseAdd}>Hủy</Button>
            <Button
              onClick={() => {
                handleAdd(selectedProduct);
                setSelectedProduct(initialProduct);
              }}
            >
              Thêm
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
              value={selectedProduct.Cname}
              onChange={(e) =>
                setSelectedProduct({
                  ...selectedProduct,
                  Cname: e.target.value,
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
