import { useEffect } from "react";
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from 'Yup'
import { deletepurchase, getAllPurchase, getPurchaseDetails, updatepurchase } from "../../Redux/purchaseSlice";
import PurchaseProducts from "./PurchaseProducts";
import { Link, NavLink } from "react-router-dom";
import { toast } from "react-toastify";

export default function ManagePurchase() {
  let dispatch= useDispatch();
  const purchases = useSelector((state)=> state.purchase.purchase)
  const {userToken} = useSelector((state)=> state.user)
  const [purchaseProductsArr, setpurchaseProductsArr] = useState(null)


  async function handleDeletePurchase(id){
    // console.log(id);
    let param =[
      userToken.user_id, id
    ]
    let payload = await dispatch(deletepurchase(param))
    // console.log(payload);
    dispatch(getAllPurchase())
  }


  /*------------------------------Start Purchase Products Table Form  ---------------------- */
  async function handlePurchaseProducts(id) {
    let {payload} = await dispatch(getPurchaseDetails(id))
    let data = JSON.parse(payload.map(product => product.array_products))
    console.log(data);
    setpurchaseProductsArr(data);
  }
  
  
  /*------------------------------End Purchase Product Table Form  ---------------------- */
  /*------------------------------Start Update Table Form  ---------------------- */
  const [PurchaseId, setPurchaseId] = useState(null)

  async function handleUpdatePurchase(values, {resetForm}){
    let arr = [PurchaseId, values]
    const {payload} = await dispatch(updatepurchase(arr))
    console.log(payload);
    if (payload.success == true) {
      toast.success('The Purchase Updated Successfully', {
        position: "bottom-right",
        });
      dispatch(getAllPurchase());
      resetForm();
    }

  }

  let validation2 = Yup.object({
    rest_of_mony:Yup.string().required('Rest_of_money is Required'),
    cash:Yup.string().required('Cash is Required'),
  })


  let formik2 = useFormik({
    initialValues:{
      rest_of_mony:'',
      cash:'',
    },
    validationSchema:validation2,
    onSubmit:handleUpdatePurchase
  })
    /*------------------------------End Update Table Form  ---------------------- */

  useEffect(()=>{
    dispatch(getAllPurchase())
  },[])
  

  return (
    <>
  <div className="d-flex justify-content-between align-items-center m-3 mt-4">
    <h2 className="h3 afterHeader position-relative">Manage Purchase</h2>
    <div className="d-flex justify-content-center align-items-center gap-3 mt-3">
      <NavLink className={'btn btn-primary'} to={'/Purchase'}>Manage Purchase</NavLink>
      <Link className={'btn btn-primary'} to={'/Purchase/addPurchase'}>Add Purchase</Link>
    </div>
  </div>

      <div className="mx-md-1 mx-3 px-md-3">
    <table className="categoryTable table table-xl text-center table-hover" style={{marginTop:'50px',border:'1px solid #80808052'}}>
      <thead>
        <tr className="fw-medium">
          <td>Id</td>
          <td>Supplier Name</td>
          <td>Number of Products</td>
          <td>Total Price</td>
          <td>Rest of Money</td>
          <td>Cash</td>
          <td>Purchase Date</td>
          <td>Action</td>
        </tr>
      </thead>
      <tbody>
        {purchases?.map((purchase, index)=> 
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{purchase.supplier_name}</td>
            <td>{purchase.total_number_of_products}</td>
            <td>{purchase.total_price_purchases}</td>
            <td>{purchase.rest_of_mony}</td>
            <td>{purchase.cash}</td>
            <td>{purchase.purchase_date.split('').splice(0,10)}</td>
            <td>
              <button className="btn btn-sm btn-primary ms-2" onClick={()=> handlePurchaseProducts(purchase.purchase_id)} data-bs-toggle="modal" data-bs-target="#staticBackdrop3">
              <i className="fa-solid fa-eye"></i>
              </button>
              <button className="btn btn-sm btn-primary ms-2" onClick={()=> setPurchaseId(purchase.purchase_id)} data-bs-toggle="modal" data-bs-target="#staticBackdrop2">
                <i className="fa-regular fa-pen-to-square"></i>
              </button>
              {/* <button className="btn btn-sm btn-danger ms-2" onClick={()=> handleDeletePurchase(purchase.purchase_id)}>
                <i className="fa-regular fa-trash-can"></i>
              </button> */}
            </td>
          </tr>
        )}
      </tbody>
    </table>
    {/* Start Add Update Purchase Modal */}
    <div className="modal fade" id="staticBackdrop2" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel2" aria-hidden="true">
            <div className="modal-dialog p-0 rounded-3">
            <form className="modal-content" onSubmit={formik2.handleSubmit}>
        <div className="modal-header">
          <h1 className="modal-title fs-5" id="staticBackdropLabel">Update The Purchase</h1>
          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div className="modal-body">
        <div className="mb-3">
            <label htmlFor="formGroupExampleInput2" className="form-label">New Rest of Money:</label>
            <input onChange={formik2.handleChange} onBlur={formik2.handleBlur} name="rest_of_mony" value={formik2.values.rest_of_mony} type="number" className="form-control" id="formGroupExampleInput2" />
            {formik2.touched.rest_of_mony && formik2.errors.rest_of_mony && (<div className="text-danger fs-14 ps-1">{formik2.errors.rest_of_mony}</div>)}
          </div>
          <div className="mb-3">
            <label htmlFor="formGroupExampleInput4" className="form-label">New Cash:</label>
            <input onChange={formik2.handleChange} onBlur={formik2.handleBlur} name="cash" value={formik2.values.cash} type="text" className="form-control" id="formGroupExampleInput4" />
            {formik2.touched.cash && formik2.errors.cash && (<div className="text-danger fs-14 ps-1">{formik2.errors.cash}</div>)}
          </div>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
          <button type="submit" className="btn btn-primary px-3">Save</button>
        </div>
      </form>
            </div>
          </div>
          {/* End Add Update Purchase Modal */}
  </div>
        <PurchaseProducts purchaseProducts={purchaseProductsArr}/>
    </>
  );
}