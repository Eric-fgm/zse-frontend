import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import ThemeProvider from "providers/theme/ThemeProvider";
import store from "app/store/store";
import PublicRoutes from "routes/public";
import "styles/main.scss";

function App() {
  return (
    <ThemeProvider>
      <Provider store={store}>
        <BrowserRouter>
          <PublicRoutes />
        </BrowserRouter>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
