import { useEffect } from "react";
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { addSupplier, deleteSupplier, getAllSuplliers, updateSupplier } from "../../Redux/supplierSlice";
import { useFormik } from "formik";
import * as Yup from 'Yup'
import { toast } from "react-toastify";

export default function Suppliers() {
  let dispatch= useDispatch();
  const suppliers = useSelector((state)=> state.supplier.supplier)


  async function DeleteSupplier(id){
    let {payload} = await dispatch(deleteSupplier(id))
    dispatch(getAllSuplliers())
  }

    /*------------------------------Start Add To Table Form  ---------------------- */

  async function AddSupplier(values, {resetForm}) {
    let {payload} = await dispatch(addSupplier(values))
    console.log(payload);
    if (payload.success == true) {
      dispatch(getAllSuplliers());
      resetForm();
      toast.success('The Supllier Added Successfully', {
        position: "bottom-right",
        });
    }
  }


  let validation = Yup.object({
    name:Yup.string().required('Name is Required'),
    phone:Yup.number().required('phone is Required'),
    address:Yup.string().required('address is Required'),
  })

  let formik = useFormik({
    initialValues:{
      name:"",
      phone:'',
      address:'',
    },
    validationSchema:validation,
    onSubmit:AddSupplier
  })
  /*------------------------------End Add To Table Form  ---------------------- */

  /*------------------------------Start Update Table Form  ---------------------- */
    const [UpdatedSupplier, setUpdatedSupplier] = useState(null);

  async function handleUpdateProduct(values, {resetForm}){
    let updateArr = [UpdatedSupplier, values]
    console.log(updateArr);
    const {payload} = await dispatch(updateSupplier(updateArr))
    console.log(payload);
    if (payload.success == true) {
      dispatch(getAllSuplliers());
      resetForm();
      toast.success('The Supllier Updated Successfully', {
        position: "bottom-right",
        });
    }

  }

  let validation2 = Yup.object({
    supplier_name:Yup.string().required('supplier_name is Required'),
    address:Yup.string().required('address is Required'),
    phone:Yup.number().required('phone is Required'),
  })


  let formik2 = useFormik({
    initialValues:{
      supplier_name:'',
      phone:'',
      address:'',
    },
    validationSchema:validation2,
    onSubmit:handleUpdateProduct
  })
    /*------------------------------End Update Table Form  ---------------------- */

  useEffect(()=>{
    dispatch(getAllSuplliers())
  },[])
  

  return (
    <>
  <div className="d-flex justify-content-between align-items-center m-3 mt-4">
    <h2 className="h3 afterHeader position-relative">Suppliers</h2>
    <button type="button" className="btn btn-primary me-sm-4" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
      Add New Supplier
    </button>
  </div>
  
  {/* Start Add New Supplier Modal */}
  <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div className="modal-dialog">
      <form className="modal-content" onSubmit={formik.handleSubmit}>
        <div className="modal-header">
          <h1 className="modal-title fs-5" id="staticBackdropLabel">New Supplier</h1>
          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div className="modal-body">
        <div className="mb-3">
            <label htmlFor="formGroupExampleInput2" className="form-label">Name:</label>
            <input onChange={formik.handleChange} onBlur={formik.handleBlur} name="name" value={formik.values.name} type="text" className="form-control" id="formGroupExampleInput2" />
            {formik.touched.name && formik.errors.name && (<div className="text-danger fs-14 ps-1">{formik.errors.name}</div>)}
          </div>
          <div className="mb-3">
            <label htmlFor="formGroupExampleInput3" className="form-label">Phone:</label>
            <input onChange={formik.handleChange} onBlur={formik.handleBlur} name="phone" value={formik.values.phone} type="text" className="form-control" id="formGroupExampleInput3" />
            {formik.touched.phone && formik.errors.phone && (<div className="text-danger fs-14 ps-1">{formik.errors.phone}</div>)}
          </div>
          <div className="mb-3">
            <label htmlFor="formGroupExampleInput4" className="form-label">Address:</label>
            <input onChange={formik.handleChange} onBlur={formik.handleBlur} name="address" value={formik.values.address} type="text" className="form-control" id="formGroupExampleInput4" />
            {formik.touched.address && formik.errors.address && (<div className="text-danger fs-14 ps-1">{formik.errors.address}</div>)}
          </div>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
          <button type="submit" className="btn btn-primary px-3">Save</button>
        </div>
      </form>
    </div>
  </div>
  {/* End Add New Supplier Modal */}
      <div className="mx-md-1 mx-5 px-md-5">
    <table className="categoryTable table table-xl text-center table-hover" style={{marginTop:'80px',border:'1px solid #80808052'}}>
      <thead>
        <tr className="fw-medium">
          <td>Id</td>
          <td>Supplier Name</td>
          <td>Phone</td>
          <td>Address</td>
          <td>Action</td>
        </tr>
      </thead>
      <tbody>
        {suppliers?.map((supplier, index)=> 
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{supplier.supplier_name}</td>
            <td>{supplier.phone}</td>
            <td>{supplier.address}</td>
            <td>
              <button className="btn btn-sm btn-primary ms-2" onClick={()=> setUpdatedSupplier([supplier.supplirer_id, supplier.supplier_name])} data-bs-toggle="modal" data-bs-target="#staticBackdrop2">
                <i className="fa-regular fa-pen-to-square"></i>
              </button>
              <button className="btn btn-sm btn-danger ms-2" onClick={()=> DeleteSupplier(supplier.supplirer_id)}>
                <i className="fa-regular fa-trash-can"></i>
              </button>
            </td>
          </tr>
        )}
      </tbody>
    </table>
    {/* Start Add Update Category Modal */}
    <div className="modal fade" id="staticBackdrop2" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel2" aria-hidden="true">
            <div className="modal-dialog p-0 rounded-3">
            <form className="modal-content" onSubmit={formik2.handleSubmit}>
        <div className="modal-header">
          <h1 className="modal-title fs-5" id="staticBackdropLabel">Update {UpdatedSupplier?<span className="text-danger">"{UpdatedSupplier[1]}"</span>:""} Info</h1>
          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div className="modal-body">
        <div className="mb-3">
            <label htmlFor="formGroupExampleInput2" className="form-label">New Name:</label>
            <input onChange={formik2.handleChange} onBlur={formik2.handleBlur} name="supplier_name" value={formik2.values.supplier_name} type="text" className="form-control" id="formGroupExampleInput2" />
            {formik2.touched.supplier_name && formik2.errors.supplier_name && (<div className="text-danger fs-14 ps-1">{formik2.errors.supplier_name}</div>)}
          </div>
          <div className="mb-3">
            <label htmlFor="formGroupExampleInput3" className="form-label">New Phone:</label>
            <input onChange={formik2.handleChange} onBlur={formik2.handleBlur} name="phone" value={formik2.values.phone} type="text" className="form-control" id="formGroupExampleInput3" />
            {formik2.touched.phone && formik2.errors.phone && (<div className="text-danger fs-14 ps-1">{formik2.errors.phone}</div>)}
          </div>
          <div className="mb-3">
            <label htmlFor="formGroupExampleInput4" className="form-label">New Address:</label>
            <input onChange={formik2.handleChange} onBlur={formik2.handleBlur} name="address" value={formik2.values.address} type="text" className="form-control" id="formGroupExampleInput4" />
            {formik2.touched.address && formik2.errors.address && (<div className="text-danger fs-14 ps-1">{formik2.errors.address}</div>)}
          </div>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
          <button type="submit" className="btn btn-primary px-3">Save</button>
        </div>
      </form>
            </div>
          </div>
          {/* End Add Update Category Modal */}
  </div>
    </>
  );
}
