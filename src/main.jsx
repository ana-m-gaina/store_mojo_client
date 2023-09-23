import React from "react";
import ReactDOM from "react-dom/client";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { QueryClient, QueryClientProvider } from "react-query";
import CssBaseline from "@mui/material/CssBaseline";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./features/store.js";
import App from "./App.jsx";


const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#121314" },
    secondary: { main: "#FF0000" },
    hover: "#424242",
  },
  typography: {
    fontFamily: "'Albert Sans', sans-serif",
    htmlFontSize: 20,
    fontWeightRegular: 400,
    fontWeightMedium: 600,
  },
  shape: {
    borderRadius: 0,
  },
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#424242" },
    secondary: { main: "#ff6600" },
    hover: "#424242",
  },
  typography: {
    fontFamily: "'Albert Sans', sans-serif",
  },
});

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CssBaseline />
    <ThemeProvider theme={lightTheme}>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <App />
          </PersistGate>
        </Provider>
      </QueryClientProvider>
    </ThemeProvider>
  </React.StrictMode>
);
