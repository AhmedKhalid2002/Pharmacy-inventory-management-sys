import { useEffect } from "react";
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import * as Yup from 'Yup'
import { getCategories } from "../../Redux/medicineSlice";
import { addProduct, deleteProduct, getAllProducts, getProductByFirstLetter, updateProduct } from "../../Redux/inventorySlice";
import { useFormik } from "formik";
import { toast } from "react-toastify";

export default function Inventory() {
  let dispatch= useDispatch();
  const {categories} = useSelector((state)=> state.categories)
  const {products} = useSelector((state)=> state.inventory)


  async function handleDeleteProduct(id){
    await dispatch(deleteProduct(id))
    dispatch(getAllProducts())
  }




 /*------------------------------Start Add To Table Form  ------------------- */

  const [ModalStatus, setModalStatus] = useState('')

  async function AddProduct(values, { resetForm }) {
    let {payload} = await dispatch(addProduct(values))
    if (payload.succes == true) {
      dispatch(getAllProducts())
      setModalStatus('')
      resetForm();
      toast.success('The Product Added Successfully', {
        position: "bottom-right",
        });
    }
    else{
      setModalStatus(payload.results.message)
    }
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
    onSubmit:AddProduct
  })
  /*------------------------------End Add To Table Form  ---------------------- */

  /*------------------------------Start Update Table Form  ---------------------- */
    const [UpdatedCat, setUpdatedCat] = useState(null);
    // const [UpdateModalStatus, setUpdateModalStatus] = useState('')

  async function handleUpdateProduct(values, {resetForm}){
    let updateArr = [UpdatedCat, values]
    console.log(updateArr);
    const {payload} = await dispatch(updateProduct(updateArr))
    if (payload.succes == true) {
      toast.success('The Product Updated Successfully', {
        position: "bottom-right",
        });
      dispatch(getAllProducts());
      resetForm();
    }
    // else{
    //   setUpdateModalStatus('The Data Not Valid')
    // }
  }

  let validation2 = Yup.object({
    price_of_sale:Yup.string().required('Price_of_sale is Required'),
    price_of_buy:Yup.string().required('Price_of_buy is Required'),
    quantity:Yup.string().required('Quantity is Required'),
    sale:Yup.number().required('Sale is Required'),
  })


  let formik2 = useFormik({
    initialValues:{
      price_of_sale:'',
      price_of_buy:'',
      quantity:'',
      sale:'',
    },
    validationSchema:validation2,
    onSubmit:handleUpdateProduct
  })
  
  /*------------------------------End Update Table Form  ---------------------- */

  const handleSearch = async (value) => {
    let data = await dispatch(getProductByFirstLetter(value))
  };


  useEffect(()=>{
    dispatch(getCategories())
    dispatch(getAllProducts())
  },[])
  

  return (
    <>
  <div className="d-flex justify-content-between align-items-center m-3 mt-4">
    <h2 className="h3 afterHeader position-relative">Medicines Inventory</h2>
    <button type="button" className="btn btn-primary me-sm-4" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
      Add New Medicine
    </button>
  </div>
  
  {/*---------------------------------------------- Start Add New Product Modal ---------------------------------------*/}
  
  <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div className="modal-dialog">
      <form className="modal-content" onSubmit={formik.handleSubmit}>
        <div className="modal-header">
          <h1 className="modal-title fs-5" id="staticBackdropLabel">New Medicine</h1>
          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div className="modal-body row row-cols-2">
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
        {ModalStatus?<p className="text-danger text-center">The product is already exist</p>:''}
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
          <button type="submit" className="btn btn-primary px-3">Save</button>
        </div>
      </form>
    </div>
  </div>
  {/*----------------------------------------------- End Add New Product Modal --------------------------------------------*/}

  <div className="mx-md-1 mx-3  px-md-3">
  {/*----------------------------------------------- Start Table of Products --------------------------------------------*/}

    <div className="Search mt-5">
    <input
      placeholder="Search For Specific Product?"
      onKeyUp={(e) => {
        handleSearch(e.target.value);
      }}
      style={{ width: '450px' }}
      type="text"
      className="form-control"
    />
    </div>
    <table className="inventoryTable table table-xl text-center table-hover" style={{marginTop:'40px',marginBottom:'60px', border:'1px solid #80808052'}}>
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
          <td>Edit</td>
        </tr>
      </thead>
      <tbody>
        {products?<>
          {products?.map((product, index)=> <tr key={index}>
          <td>{index + 1}</td>
          <td>{product.name}</td>
          <td>{product.category_name}</td>
          <td>{product.packets_section}</td>
          <td>{product.expiry_date.split('').splice(0,10)}</td>
          <td>{product.price_of_buy}</td>
          <td>{product.price_of_sale}</td>
          <td>{product.quantity}</td>
          <td>{product.sale}%</td>
          <td>
            <button className="btn btn-sm btn-primary ms-2" onClick={()=> setUpdatedCat([product.id, product.name])} data-bs-toggle="modal" data-bs-target="#staticBackdrop2">
              <i className="fa-regular fa-pen-to-square"></i>
            </button>
            <button className="btn btn-sm btn-danger ms-2" onClick={()=> handleDeleteProduct(product.id)}>
              <i className="fa-regular fa-trash-can"></i>
            </button>
          </td>
          </tr>)}
        </>
        : 
        <tr>
          <td colSpan={10}>There Are No Products Available</td>
        </tr>
        }
        
        
      </tbody>
    </table>
  {/*----------------------------------------------- End Table of Products --------------------------------------------*/}

    {/*------------------------------------------- Start Update Product Modal ------------------------------------*/}
    <div className="modal fade" id="staticBackdrop2" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel2" aria-hidden="true">
      <div className="modal-dialog p-0 rounded-3">
        <form onSubmit={formik2.handleSubmit} className="modal-content">
          <div className="modal-header">
            <div>

            <h1 className="modal-title fs-5" id="staticBackdropLabel2">Update The {UpdatedCat?<span className="h5 mb-0 mt-1 text-danger">"{UpdatedCat[1]}"</span>:''} Product </h1>
            

            </div>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <div className="mb-3">
              <label htmlFor="formGroupExampleInput9" className="form-label">Price_of_sale</label>
              <input onChange={formik2.handleChange} onBlur={formik2.handleBlur} name="price_of_sale" value={formik2.values.price_of_sale} type="number" className="form-control" id="formGroupExampleInput9" />
              {formik2.touched.price_of_sale && formik2.errors.price_of_sale && (<div className="text-danger fs-14 ps-1">{formik2.errors.price_of_sale}</div>)}

            </div>
            <div className="mb-3">
              <label htmlFor="formGroupExampleInput10" className="form-label">Price_of_buy</label>
              <input onChange={formik2.handleChange} onBlur={formik2.handleBlur} name="price_of_buy" value={formik2.values.price_of_buy} type="number" className="form-control" id="formGroupExampleInput10" />
              {formik2.touched.price_of_buy && formik2.errors.price_of_buy && (<div className="text-danger fs-14 ps-1">{formik2.errors.price_of_buy}</div>)}

            </div>
            <div className="mb-3">
              <label htmlFor="formGroupExampleInput11" className="form-label">Quantity</label>
              <input onChange={formik2.handleChange} onBlur={formik2.handleBlur} name="quantity" value={formik2.values.quantity} type="number" className="form-control" id="formGroupExampleInput11" />
              {formik2.touched.quantity && formik2.errors.quantity && (<div className="text-danger fs-14 ps-1">{formik2.errors.quantity}</div>)}

            </div>
            <div className="mb-3">
              <label htmlFor="formGroupExampleInput7" className="form-label">Sale:</label>
              <select onChange={formik2.handleChange} onBlur={formik2.handleBlur} name="sale" value={formik2.values.sale} className="form-select" id="formGroupExampleInput7">
                <option value="0">0%</option>
                <option value="5">5%</option>
                <option value="10">10%</option>
                <option value="15">15%</option>
              </select>
              {formik2.touched.sale && formik2.errors.sale && (<div className="text-danger fs-14 ps-1">{formik2.errors.sale}</div>)}
            </div>
          </div>
          {/* {UpdateModalStatus?<p className="text-danger text-center">{UpdateModalStatus}</p>:''} */}
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
            <button type="submit" className="btn btn-primary px-3">Save</button>
          </div>
        </form>
      </div>
    </div>
    {/*-------------------------------------------- End Update Product Modal --------------------------------------*/}
  </div>
    </>
  );
}
