import { useEffect } from 'react'
import BarsImage from '../../assets/bars.png'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProducts, getEmptyProducts, getExpiredProducts } from '../../Redux/inventorySlice'
import { getAllInvoices } from '../../Redux/invoiceSlice';
import { getAllPurchase } from '../../Redux/purchaseSlice';
import { getAllUsers } from '../../Redux/userSlice';
import { getAllSuplliers } from '../../Redux/supplierSlice';
export default function DashBoard() {
  let dispatch = useDispatch();
  const {products} = useSelector((state)=> state.inventory)
  const {ExpiredProducts} = useSelector((state)=> state.inventory)
  const {invoices} = useSelector((state)=> state.invoice)
  const purchases = useSelector((state)=> state.purchase.purchase)
  const suppliers = useSelector((state)=> state.supplier.supplier)
  const {users} = useSelector((state)=> state.user)
  const {EmptyProducts} = useSelector((state)=> state.inventory)

  useEffect(()=>{
    dispatch(getExpiredProducts())
    dispatch(getAllProducts())
    dispatch(getAllInvoices())
    dispatch(getAllPurchase())
    dispatch(getAllSuplliers())
    dispatch(getAllUsers());
    dispatch(getEmptyProducts())
  },[])

  return <>
    <div className="d-flex justify-content-between align-items-center mt-4 mx-0 pb-3" style={{borderBottom:'1px solid rgb(0 0 0 / 16%)'}}>
      <h2 className="h3 mx-3 afterHeader position-relative">DashBoard</h2>
    </div>
    <div className="content">
      <section className='d-flex justify-content-evenly align-items-center py-5' style={{backgroundColor:'#3b56950f'}}>
        <div className='bg-white p-3'>
          <div className="number fw-bold fs-4">{products?.length}</div>
          <p>Total Medicines</p>
          <img src={BarsImage} style={{width:'180px'}} alt="bars" />
        </div>
        <div className='bg-white p-3'>
          <div className="number fw-bold fs-4">{ExpiredProducts?.length}</div>
          <p>Total Expired </p>
          <img src={BarsImage} style={{width:'180px'}} alt="bars" />
        </div>
        <div className='bg-white p-3'>
          <div className="number fw-bold fs-4">{EmptyProducts?.length}</div>
          <p>Total Empties Pr</p>
          <img src={BarsImage} style={{width:'180px'}} alt="bars" />
        </div>
        <div className='bg-white p-3'>
          <div className="number fw-bold fs-4">{purchases?.length}</div>
          <p>Total Purchases</p>
          <img src={BarsImage} style={{width:'180px'}} alt="bars" />
        </div>
        
      </section>
      <section className='d-flex justify-content-evenly align-items-center py-5' style={{backgroundColor:'#3b56950f'}}>
      <div className='bg-white p-3'>
          <div className="number fw-bold fs-4">{invoices?.length}</div>
          <p>Total Invoices</p>
          <img src={BarsImage} style={{width:'180px'}} alt="bars" />
        </div>
        <div className='bg-white p-3'>
          <div className="number fw-bold fs-4">{suppliers?.length}</div>
          <p>Total Suppliers</p>
          <img src={BarsImage} style={{width:'180px'}} alt="bars" />
        </div>
        <div className='bg-white p-3'>
          <div className="number fw-bold fs-4">{users?.length}</div>
          <p>Total Users </p>
          <img src={BarsImage} style={{width:'180px'}} alt="bars" />
        </div>
        
      </section>
    </div>
  </>
}
