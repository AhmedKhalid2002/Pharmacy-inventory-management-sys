import { useEffect } from "react";
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import * as Yup from 'Yup'
import { deleteProduct, getAllProducts } from "../../Redux/inventorySlice";
import { useFormik } from "formik";
import { addInvoivce, deleteInvoivce, getAllInvoices } from "../../Redux/invoiceSlice";
import { fetchDataFromApi } from "../../utils/api";
import { toast } from "react-toastify";

export default function Invoice() {
  let dispatch= useDispatch();
  const {products} = useSelector((state)=> state.inventory)
  const {invoices} = useSelector((state)=> state.invoice)
  const {userToken} = useSelector((state)=> state.user)
  

  async function handleDeleteInvoice(id){
    await dispatch(deleteInvoivce(id))
    dispatch(getAllInvoices())
  }



 /*------------------------------Start Add To Table Form  ------------------- */
  const [InvoiceProducts, setInvoiceProducts] = useState([]);
  const [InvoiceProducts2, setInvoiceProducts2] = useState([]);
  const [TotalPrice, setTotalPrice] = useState(0);
  const [NumberOfProducts, setNumberOfProducts] = useState(0);

  const [ModalStatus, setModalStatus] = useState('')

  async function AddProductToInvoice(values, { resetForm }) {
      let name = (values.name)
      // console.log(name);
      let {results} = await fetchDataFromApi(`/products/getByName?name=${name}`);
      let id = results.data[0].id;
      let price = results.data[0].price_of_sale;
      let quantity = values.quantity
      let demand = {id, quantity}
      const processDetails = {
        name:results.data[0].name,
        price_of_sale:price,
        demand_quantity:quantity,
        total_price:quantity * price,
      }
      if (results.data[0].quantity >= values.quantity) {
        setInvoiceProducts((prevArray) => [...prevArray, demand])
        setInvoiceProducts2((prevArray) => [...prevArray, processDetails])
        setTotalPrice(TotalPrice + price * quantity)
        setNumberOfProducts(NumberOfProducts + quantity)
        setModalStatus('')
      }
      else{
        setModalStatus(`The Available Quantity is ${results.data[0].quantity}`);
      }
      
  }
  let validation = Yup.object({
    name:Yup.string().required('Name is Required'),
    quantity:Yup.string().required('Quantity is Required'),
  })

  let formik = useFormik({
    initialValues:{
      name:"",
      quantity:'',
    },
    validationSchema:validation,
    onSubmit:AddProductToInvoice
  })
  /*------------------------------End Add To Table Form  ---------------------- */



  /* ----------------------------------------------------------------------- */
  
  async function SubmitInvoice() {
    let param ={
      invoiceNumberProducts:NumberOfProducts,
      invoiceTotalPrice:TotalPrice,
      userId:userToken.user_id,
      arrayProducts:InvoiceProducts,
    }
    if (InvoiceProducts.length > 0) {
      console.log(param);
      await dispatch(addInvoivce(param));
      dispatch(getAllInvoices());
      setInvoiceProducts([])
      setInvoiceProducts2([])
      setTotalPrice(0)
      setNumberOfProducts(0)
      toast.success('The Invoice Added Successfully', {
        position: "bottom-right",
        });
    }
    
  }
  
  /* ----------------------------------------------------------------------- */

  useEffect(()=>{
    dispatch(getAllProducts())
    dispatch(getAllInvoices())
  },[])
  

  return (
    <>
  <div className="d-flex justify-content-between align-items-center m-3 mt-4">
    <h2 className="h2 afterHeader position-relative">Invoices</h2>
    <button type="button" className="btn btn-primary me-sm-4" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
      Add New Invoice
    </button>
  </div>
  
  {/*---------------------------------------------- Start Add New Product Modal ---------------------------------------*/}
  
  <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div className="modal-dialog" style={{minWidth:'700px'}}>
      <div className="modal-content">
        <div className="modal-header">
          <h1 className="modal-title fs-5" id="staticBackdropLabel">New Invoice</h1> 
          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <form className="modal-body" onSubmit={formik.handleSubmit}>
          <div className="row row-cols-2">
            <div className="mb-3">
              <label className="form-label">Product Name:</label>
              <select onChange={formik.handleChange} onBlur={formik.handleBlur} name="name" value={formik.values.name} className="form-select" aria-label="Default select example">
                {products?.map((product, index)=> 
                <option key={index+1} value={product.name}>{product.name}</option>)}
              </select>
              {formik.touched.name && formik.errors.name && (<div className="text-danger fs-14 ps-1">{formik.errors.name}</div>)}
            </div>
            <div className="mb-3">
              <label htmlFor="formGroupExampleInput2" className="form-label">Quantity:</label>
              <input onChange={formik.handleChange} onBlur={formik.handleBlur} name="quantity" value={formik.values.quantity} type="number" className="form-control" id="formGroupExampleInput2" />
              {formik.touched.quantity && formik.errors.quantity && (<div className="text-danger fs-14 ps-1">{formik.errors.quantity}</div>)}
            </div>
          </div>
            <button type="submit" className="btn btn-success px-3">Add New Item</button>
        </form>
        {ModalStatus?<p className="text-danger text-center">{ModalStatus}</p>:''}
        <div className="Products-table mx-2">
          <table className="inventoryTable table table-xl text-center table-hover" style={{marginTop:'20px',marginBottom:'30px', border:'1px solid #80808052'}}>
            <thead>
              <tr className="fw-medium">
                <td>Id</td>
                <td>Product Name</td>
                <td>Price For One</td>
                <td>Demand Quantity</td>
                <td>Total Price</td>
              </tr>
            </thead>
            {InvoiceProducts2.length > 0?
            <tbody>
              {InvoiceProducts2?.map((product, index)=> <tr key={index}>
                <td>{index + 1}</td>
                <td>{product.name}</td>
                <td>{product.price_of_sale}</td>
                <td>{product.demand_quantity}</td>
                <td>{product.total_price}</td>
              </tr>)}
            </tbody>
            :
            <tbody>
              <tr>
                <td colSpan={5}>There Are No Products Added</td>
              </tr>
            </tbody>
            }
            
          </table>
        </div>
        <div className="totalCalc row row-cols-2 mx-2 mb-3">
          <div>
            <label>Total Price Is:</label>
            <input type="text" value={TotalPrice} disabled className="form-control"/>
          </div>
          <div>
            <label>Number of Products Is:</label>
            <input type="text" value={NumberOfProducts} disabled className="form-control"/>
          </div>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
          <button type="submit" className="btn btn-primary px-3" onClick={SubmitInvoice}>Submit Invoice</button>
        </div>
      </div>
    </div>
  </div>
  {/*----------------------------------------------- End Add New Product Modal --------------------------------------------*/}

  <div className="mx-md-1 mx-3  px-md-3">
  {/*----------------------------------------------- Start Table of Products --------------------------------------------*/}

    <table className="inventoryTable table table-xl text-center table-hover" style={{marginTop:'60px',marginBottom:'60px', border:'1px solid #80808052'}}>
      <thead>
        <tr className="fw-medium">
          <td>Id</td>
          <td>invoice_number_products</td>
          <td>invoice_total_price</td>
          <td>invoice_date</td>
          <td>invoice_time</td>
          <td>invoice_id</td>
          {/* <td>Action</td> */}
        </tr>
      </thead>
      <tbody>
        {invoices?.map((invoice, index)=> <tr key={index}>
          <td>{index + 1}</td>
          <td>{invoice.invoice_number_products}</td>
          <td>{invoice.invoice_total_price}</td>
          <td>{invoice.invoice_date.split('').splice(0,10)}</td>
          <td>{invoice.invoice_time}</td>
          <td>{invoice.invoice_id}</td>
          {/* <td>
            <button className="btn btn-sm btn-danger ms-2" onClick={()=> handleDeleteInvoice(invoice.invoice_id)}>
              <i className="fa-regular fa-trash-can"></i>
            </button>
          </td> */}
        </tr>)}
      </tbody>
    </table>
  {/*----------------------------------------------- End Table of Products --------------------------------------------*/}

  </div>
    </>
  );
}
