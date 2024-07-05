import './App.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Layout from './components/Layout/Layout';
import Login from './components/Authentication/Login/Login';
import SideBarContextProvider from './context/SideBar';
import DashBoard from './components/DashBoard/DashBoard';
import Medicine from './components/Medicine/Medicine';
import Inventory from './components/Inventory/Inventory';
import Invoice from './components/Invoice/Invoice';
import Suppliers from './components/Suppliers/Suppliers';
import Users from './components/Users/Users';
import { store } from './Redux/store';
import { Provider } from 'react-redux';
import ProtectedRoute from './components/Authentication/ProtectedRoute/ProtectedRoute';
import ProtectedLogin from './components/Authentication/ProtectedLogin/ProtectedLogin';
import { QueryClient, QueryClientProvider } from 'react-query';
import ManagePurchase from './components/Purchase/managePurchase';
import PurchaseLayout from './components/Purchase/PurchaseLayout';
import AddPurchase from './components/Purchase/AddPurchase';
import ExpiredProducts from './components/ExpiredProducts/ExpiredProducts';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EmptyProducts from './components/EmptyProducts/EmptyProducts';

function App() {

  let queryClient = new QueryClient();

  const routes = createBrowserRouter([
    {path:'/', element: <ProtectedRoute><Layout /></ProtectedRoute> , children:[
      {index:true, element:<DashBoard />},
      {path:'/Medicine', element:<Medicine />},
      {path:'/Purchase', element:<PurchaseLayout /> ,children:[
        {path:'/Purchase/addPurchase', element:<AddPurchase />},
        {index:true, element:<ManagePurchase />}
      ]},
      {path:'/Inventory', element:<Inventory />},
      {path:'/Expired_Products', element:<ExpiredProducts />},
      {path:'/Invoice', element:<Invoice />},
      {path:'/Suppliers', element:<Suppliers />},
      {path:'/Users', element:<Users />},
      {path:'/EmptyProducts', element:<EmptyProducts />},
    ]},
    {path:'/login', element: <ProtectedLogin><Login /></ProtectedLogin>}
  ]);
  

  return (
    <>
    <Provider store={store}>
      <SideBarContextProvider>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={routes}/>
          <ToastContainer/>
        </QueryClientProvider>
      </SideBarContextProvider>
    </Provider>
    </>
  )
}

export default App
