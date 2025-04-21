// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

// import React, { useState } from "react";
// import ReactDOM from "react-dom/client";
// import App from "./App";
// import RoleSelection from "./pages/RoleSelection";

// const Root = () => {
//   const [role, setRole] = useState(null);

//   return role ? <App role={role} /> : <RoleSelection setRole={setRole} />;
// };

// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(
//   <React.StrictMode>
//     <Root />
//   </React.StrictMode>
// );

import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
// import ShopContextProvider from './Context/ShopContext';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//     <ShopContextProvider>
//       <App />
//     </ShopContextProvider>
// );
