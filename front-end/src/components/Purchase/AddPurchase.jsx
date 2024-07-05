import { useFormik } from 'formik';
import * as Yup from 'Yup'
import React, { useEffect, useState } from 'react'
import { getCategories } from '../../Redux/medicineSlice';
import { useDispatch, useSelector } from 'react-redux';
import { getAllSuplliers } from '../../Redux/supplierSlice';
import { addpurchase } from '../../Redux/purchaseSlice';
import { Link, NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function AddPurchase() {
  
  let dispatch = useDispatch();
  const {categories} = useSelector((state)=> state.categories)
  const suppliers = useSelector((state)=> state.supplier.supplier)
  const [PurchaseProducts, setPurchaseProducts] = useState([]);
  const [NumberOfProducts, setNumberOfProducts] = useState(0);
  const [TotalPriceOfProducts, setTotalPriceOfProducts] = useState(0);

  function AddNewPurchase(values) {
    const {price_of_buy, quantity} = values
    setTotalPriceOfProducts(TotalPriceOfProducts + quantity * price_of_buy)
    setNumberOfProducts(NumberOfProducts + quantity)
    setPurchaseProducts((prevArray) => [...prevArray, values]);
    // console.log(values);
  }


  let validation = Yup.object({
    name:Yup.string().required('Name is Required'),
    price_of_sale:Yup.string().required('Price_of_sale is Required'),
    price_of_buy:Yup.string().required('Price_of_buy is Required'),
    quantity:Yup.string().required('Quantity is Required'),
    sale:Yup.number().required('Sale is Required'),
    expiry_date:Yup.date().required('expiry_date is Required'),
    packets_section:Yup.number().required('Packets is Required'),
    category_name:Yup.string().required('Category Name is Required'),
  })

  let formik = useFormik({
    initialValues:{
      name:"",
      price_of_sale:'',
      price_of_buy:'',
      quantity:'',
      sale:'',
      expiry_date:"",
      packets_section:'',
      inventory_id:'1',
      category_name:""
    },
    validationSchema:validation,
    onSubmit:AddNewPurchase
  })
  // --------------------------------------------------------------------------------------------------------------------------

  const [SubmitError, setSubmitError] = useState('')
  
  async function SubmitPurchase(values, {resetForm}) {
    let { rest_of_mony, cash} = values
    let supplier_id = Number(values.supplier_id);
    const SubmitResult ={
      array:PurchaseProducts,
      total_number_of_products:NumberOfProducts,
      total_price_purchases:TotalPriceOfProducts,
      supplier_id,
      rest_of_mony,
      cash
    }
    console.log(SubmitResult);
    if (PurchaseProducts.length > 0) {
      let result = await dispatch(addpurchase(SubmitResult))
      console.log(result);
      resetForm();
      setSubmitError('')
      toast.success('The Purchase Added Successfully', {
        position: "bottom-right",
        });
    }
    else{
      setSubmitError('The Number Of Items Should Be At Least one')
    }
  }
  
  let validation2 = Yup.object({
    supplier_id:Yup.number().required('supplier Name is Required'),
    rest_of_mony:Yup.number().required('rest_of_mony is Required'),
    cash:Yup.string().required('cash is Required'),
  })


  let formik2 = useFormik({
    initialValues:{
      total_number_of_products:NumberOfProducts,
      total_price_purchases:TotalPriceOfProducts,
      supplier_id:'',
      rest_of_mony:'',
      cash:'',
    },
    validationSchema:validation2,
    onSubmit:SubmitPurchase
  })
  // ----------------------------------------------------------------------------------------------------------------------------------

  useEffect(() => {
    dispatch(getCategories())
    dispatch(getAllSuplliers())
  }, [])
  
  
  return <>
  <div className="d-flex justify-content-between align-items-center m-4">
    <h2 className="h3 afterHeader position-relative">Add Purchase</h2>
    <div className="d-flex justify-content-center align-items-center gap-3 mt-3">
      <Link className={'btn btn-primary'} to={'/Purchase'}>Manage Purchase</Link>
      <NavLink className={'btn btn-primary'} to={'/Purchase/addPurchase'}>Add Purchase</NavLink>
    </div>
  </div>
  <div className="mainContent m-4 shadow p-4 rounded-3">
    <form onSubmit={formik.handleSubmit}>
    <div className="row row-cols-4">
      <div className="mb-3">
        <label htmlFor="formGroupExampleInput1" className="form-label">Medicine Name:</label>
        <input onChange={formik.handleChange} onBlur={formik.handleBlur} name="name" value={formik.values.name} type="text" className="form-control" id="formGroupExampleInput1" />
        {formik.touched.name && formik.errors.name && (<div className="text-danger fs-14 ps-1">{formik.errors.name}</div>)}
      </div>
      <div className="mb-3">
        <label className="form-label">Category Name:</label>
        <select onChange={formik.handleChange} onBlur={formik.handleBlur} name="category_name" value={formik.values.category_name} className="form-select" aria-label="Default select example">
        {categories?.map((Product, index)=> 
        <option key={index+1} value={Product.name}>{Product.name}</option>)}
        </select>
        {formik.touched.category_name && formik.errors.category_name && (<div className="text-danger fs-14 ps-1">{formik.errors.category_name}</div>)}
      </div>
      <div className="mb-3">
        <label htmlFor="formGroupExampleInput2" className="form-label">Quantity:</label>
        <input onChange={formik.handleChange} onBlur={formik.handleBlur} name="quantity" value={formik.values.quantity} type="number" className="form-control" id="formGroupExampleInput2" />
        {formik.touched.quantity && formik.errors.quantity && (<div className="text-danger fs-14 ps-1">{formik.errors.quantity}</div>)}
      </div>
      <div className="mb-3">
        <label htmlFor="formGroupExampleInput3" className="form-label">Packets:</label>
        <input onChange={formik.handleChange} onBlur={formik.handleBlur} name="packets_section" value={formik.values.packets_section} type="number" className="form-control" id="formGroupExampleInput3" />
        {formik.touched.packets_section && formik.errors.packets_section && (<div className="text-danger fs-14 ps-1">{formik.errors.packets_section}</div>)}
      </div>
      <div className="mb-3">
        <label htmlFor="formGroupExampleInput4" className="form-label">Expiry_date:</label>
        <input onChange={formik.handleChange} onBlur={formik.handleBlur} name="expiry_date" value={formik.values.expiry_date} type="date" className="form-control" id="formGroupExampleInput4" />
        {formik.touched.expiry_date && formik.errors.expiry_date && (<div className="text-danger fs-14 ps-1">{formik.errors.expiry_date}</div>)}
      </div>
      <div className="mb-3">
        <label htmlFor="formGroupExampleInput5" className="form-label">Price_of_buy:</label>
        <input onChange={formik.handleChange} onBlur={formik.handleBlur} name="price_of_buy" value={formik.values.price_of_buy} type="number" className="form-control" id="formGroupExampleInput5" />
        {formik.touched.price_of_buy && formik.errors.price_of_buy && (<div className="text-danger fs-14 ps-1">{formik.errors.price_of_buy}</div>)}
      </div>
      <div className="mb-3">
        <label htmlFor="formGroupExampleInput6" className="form-label">Price_of_sale:</label>
        <input onChange={formik.handleChange} onBlur={formik.handleBlur} name="price_of_sale" value={formik.values.price_of_sale} type="number" className="form-control" id="formGroupExampleInput6" />
        {formik.touched.price_of_sale && formik.errors.price_of_sale && (<div className="text-danger fs-14 ps-1">{formik.errors.price_of_sale}</div>)}
      </div>
      <div className="mb-3">
        <label htmlFor="formGroupExampleInput7" className="form-label">sale:</label>
        <select onChange={formik.handleChange} onBlur={formik.handleBlur} name="sale" value={formik.values.sale} className="form-select" id="formGroupExampleInput7">
          <option value="0">0%</option>
          <option value="5">5%</option>
          <option value="10">10%</option>
          <option value="15">15%</option>
        </select>
        {formik.touched.sale && formik.errors.sale && (<div className="text-danger fs-14 ps-1">{formik.errors.sale}</div>)}
      </div>
    </div>
      <button type='submit' className='btn btn-success'>Add New Item</button>
    </form>
    <table className="inventoryTable table table-xl text-center table-hover" style={{marginTop:'60px',marginBottom:'60px', border:'1px solid #80808052'}}>
      <thead>
        <tr className="fw-medium">
          <td>Id</td>
          <td>Product Name</td>
          <td>Category</td>
          <td>Packets</td>
          <td>Expiry_date</td>
          <td>Price_of_buy</td>
          <td>Price_of_sale</td>
          <td>Quantity</td>
          <td>Sale</td>
          {/* <td>Edit</td> */}
        </tr>
      </thead>
      <tbody>
        {PurchaseProducts.length > 0?<>
          {PurchaseProducts?.map((product, index)=> <tr key={index}>
          <td>{index + 1}</td>
          <td>{product.name}</td>
          <td>{product.category_name}</td>
          <td>{product.packets_section}</td>
          <td>{product.expiry_date.split('').splice(0,10)}</td>
          <td>{product.price_of_buy}</td>
          <td>{product.price_of_sale}</td>
          <td>{product.quantity}</td>
          <td>{product.sale}%</td>
        </tr>)}
        </>:<tr>
            <td colSpan={9}>There Are No Products Added</td>
          </tr>}
      </tbody>
    </table>
    <form onSubmit={formik2.handleSubmit}>
    <div className="row row-cols-4">
      <div className="mb-3">
        <label htmlFor="formGroupExampleInput1" className="form-label">total_number_of_products:</label>
        <input placeholder={NumberOfProducts} type="number" className="form-control" id="formGroupExampleInput1" disabled/>
      </div>
      <div className="mb-3">
        <label htmlFor="formGroupExampleInput2" className="form-label">Total_price_purchases:</label>
        <input placeholder={TotalPriceOfProducts} type="number" className="form-control" id="formGroupExampleInput2" disabled/>
      </div>
      <div className="mb-3">
        <label className="form-label">Supplier Name:</label>
        <select onChange={formik2.handleChange} onBlur={formik2.handleBlur} name="supplier_id" value={formik2.values.supplier_id} className="form-select" aria-label="Default select example">
        {suppliers?.map((supplier, index)=> 
        <option key={index+1} value={supplier.supplirer_id}>{supplier.supplier_name}</option>)}
        </select>
        {formik2.touched.supplier_id && formik2.errors.supplier_id && (<div className="text-danger fs-14 ps-1">{formik2.errors.supplier_id}</div>)}
      </div>
      <div className="mb-3">
        <label htmlFor="formGroupExampleInput3" className="form-label">Rest_of_money:</label>
        <input onChange={formik2.handleChange} onBlur={formik2.handleBlur} name="rest_of_mony" value={formik2.values.rest_of_mony} type="number" className="form-control" id="formGroupExampleInput3" />
        {formik2.touched.rest_of_mony && formik2.errors.rest_of_mony && (<div className="text-danger fs-14 ps-1">{formik2.errors.rest_of_mony}</div>)}
      </div>
      <div className="mb-3">
        <label htmlFor="formGroupExampleInput5" className="form-label">Cash:</label>
        <input onChange={formik2.handleChange} onBlur={formik2.handleBlur} name="cash" value={formik2.values.cash} type="text" className="form-control" id="formGroupExampleInput5" />
        {formik2.touched.cash && formik2.errors.cash && (<div className="text-danger fs-14 ps-1">{formik2.errors.cash}</div>)}
      </div>
      
    </div>
      <button type='submit' className='btn btn-primary'>Submit Purchase</button>
    </form>
    {SubmitError?<p className='text-danger text-center'>{SubmitError}</p>:''}
  </div>
  </>
}
