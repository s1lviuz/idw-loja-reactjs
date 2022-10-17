import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Home, { loader as homeLoader, ServidorIndisponivel } from './routes/home';
import Produto, { loader as produtoLoader, ProdutoNaoEncontrado } from './routes/produto';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: 'produtos/:idProduto',
        loader: produtoLoader,
        errorElement: <ProdutoNaoEncontrado />,
        element: <Produto />
      },
      {
        path: '',
        loader: homeLoader,
        element: <Home />,
        errorElement: <ServidorIndisponivel />,
      }
    ]
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
