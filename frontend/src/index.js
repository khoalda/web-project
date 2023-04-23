import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/font-awesome/css/font-awesome.min.css";
import CloseIcon from '@mui/icons-material/Close';
import { SnackbarProvider, closeSnackbar } from "notistack";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <SnackbarProvider
      maxSnack={3}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      action={(snackbarId) => (
        <CloseIcon
          onClick={() => closeSnackbar(snackbarId)}
          style={{ cursor: "pointer" }}
          fontSize="small"
        />
      )}
      autoHideDuration={3000}
    >
      <App />
    </SnackbarProvider>
  </React.StrictMode>
);
