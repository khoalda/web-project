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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  styled,
} from "@mui/material";
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
} from "@mui/icons-material";

import { readAll, create, update, deleteOne } from "../../api/products";
import {
  Categories,
  categoryMapper,
  categoryKeyMapper,
} from "../../constants/categories";

import { useSnackbar } from "notistack";

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

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

  const { enqueueSnackbar } = useSnackbar();

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
    setSelectedProduct(initialProduct);
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
    const payload = {
      name: product.name,
      price: product.price,
      description: product.description,
      image: product.image,
      categoryId: categoryKeyMapper(product.Cname),
    };

    create(payload)
      .then((res) => {
        enqueueSnackbar("Thêm sản phẩm thành công", {
          variant: "success",
        });
        readAll().then((data) => {
          setProducts(data.data);
        });
        setSelectedProduct(initialProduct);
        setOpenAdd(false);
      })
      .catch((err) => {
        enqueueSnackbar("Thêm sản phẩm thất bại", {
          variant: "error",
        });
      });
  };

  const handleEdit = (product) => {
    const payload = {
      pId: product.pId,
      name: product.name,
      price: product.price,
      description: product.description,
      image: product.image,
      categoryId: categoryKeyMapper(product.Cname),
    };

    update(payload)
      .then((res) => {
        enqueueSnackbar("Cập nhật sản phẩm thành công", {
          variant: "success",
        });
        const index = products.findIndex((p) => p.pId === product.pId);
        const newProducts = [...products];
        newProducts[index] = product;
        setProducts(newProducts);
        setOpenEdit(false);
        setSelectedProduct(initialProduct);
      })
      .catch((err) => {
        enqueueSnackbar("Cập nhật sản phẩm thất bại", {
          variant: "error",
        });
      });
  };

  const handleDelete = (pId) => {
    deleteOne(pId)
      .then((res) => {
        enqueueSnackbar("Xóa sản phẩm thành công", {
          variant: "success",
        });
        const newProducts = products.filter((product) => product.pId !== pId);
        setProducts(newProducts);
        handleCloseDelete();
      })
      .catch((err) => {
        enqueueSnackbar("Xóa sản phẩm thất bại", {
          variant: "error",
        });
      });
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
                        <StyledTableRow key={product.pId}>
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
                          <TableCell>{categoryMapper(product.Cname)}</TableCell>
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
                        </StyledTableRow>
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
          <DialogContent
            sx={{ display: "flex", flexDirection: "column", width: "450px" }}
          >
            <DialogContentText sx={{ marginBottom: 2 }}>
              Nhập thông tin sản phẩm:
            </DialogContentText>
            <TextField
              label="Tên"
              fullWidth
              value={selectedProduct.name}
              onChange={(e) =>
                setSelectedProduct({ ...selectedProduct, name: e.target.value })
              }
              sx={{ marginBottom: 2 }}
              variant="filled"
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
              sx={{ marginBottom: 2 }}
              variant="filled"
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
              sx={{ marginBottom: 2 }}
              variant="filled"
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
              sx={{ marginBottom: 2 }}
              variant="filled"
            />
            <FormControl fullWidth sx={{ marginBottom: 2 }} variant="filled">
              <InputLabel htmlFor="category-select">Danh mục</InputLabel>
              <Select
                value={selectedProduct.Cname}
                onChange={(e) =>
                  setSelectedProduct({
                    ...selectedProduct,
                    Cname: e.target.value,
                  })
                }
                inputProps={{
                  name: "Danh mục",
                  id: "category-select",
                }}
              >
                {Categories.map((category) => (
                  <MenuItem value={category.name}>{category.value}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button variant="outlined" onClick={handleCloseAdd}>
              Hủy
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                handleAdd(selectedProduct);
              }}
            >
              Thêm
            </Button>
          </DialogActions>
        </Dialog>

        {/* Edit Product Dialog */}
        <Dialog open={openEdit} onClose={handleCloseEdit}>
          <DialogTitle>Cập nhật sản phẩm</DialogTitle>
          <DialogContent
            sx={{ display: "flex", flexDirection: "column", width: "450px" }}
          >
            <DialogContentText sx={{ marginBottom: 2 }}>
              Chỉnh sửa thông tin sản phẩm:
            </DialogContentText>
            <TextField
              sx={{ marginBottom: 2 }}
              variant="filled"
              label="Tên sản phẩm"
              fullWidth
              value={selectedProduct.name}
              onChange={(e) =>
                setSelectedProduct({ ...selectedProduct, name: e.target.value })
              }
            />
            <TextField
              sx={{ marginBottom: 2 }}
              variant="filled"
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
              sx={{ marginBottom: 2 }}
              variant="filled"
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
              sx={{ marginBottom: 2 }}
              variant="filled"
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
            <FormControl fullWidth sx={{ marginBottom: 2 }} variant="filled">
              <InputLabel htmlFor="category-select">Danh mục</InputLabel>
              <Select
                value={selectedProduct.Cname}
                onChange={(e) =>
                  setSelectedProduct({
                    ...selectedProduct,
                    Cname: e.target.value,
                  })
                }
                inputProps={{
                  name: "Danh mục",
                  id: "category-select",
                }}
              >
                {Categories.map((category) => (
                  <MenuItem value={category.name}>{category.value}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseEdit} variant="outlined">
              Hủy
            </Button>
            <Button
              onClick={() => {
                handleEdit(selectedProduct);
              }}
              variant="contained"
            >
              Cập nhật
            </Button>
          </DialogActions>
        </Dialog>

        {/* Delete Product Dialog */}
        <Dialog open={openDelete} onClose={handleCloseDelete}>
          <DialogTitle>Xác nhận xóa</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Bạn có chắc chắn muốn xóa sản phẩm này không?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDelete} variant="outlined">
              Hủy
            </Button>
            <Button
              onClick={() => {
                handleDelete(deleteProductId);
                handleCloseDelete();
              }}
              variant="contained"
            >
              Xóa
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </div>
  );
};

export default ManageProducts;
