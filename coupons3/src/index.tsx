import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Layout from "./Components/LayoutArea/Layout/Layout";
import axios from "axios";
import {authStore} from "./Redux/OurStore";

function interceptors(){
    axios.interceptors.request.use(request =>{
        if (authStore.getState().token.length >0)
            request.headers ["Authorization"] = "Bearer " + authStore.getState().token;
        return request
    })
}

interceptors(); //run this function to make axios send a token if exists, on EACH request


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Layout/>

  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
