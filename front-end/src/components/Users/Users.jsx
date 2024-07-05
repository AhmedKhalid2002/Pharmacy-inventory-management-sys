import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react";
import { addNewUser, deleteUser, getAllUsers } from "../../Redux/userSlice";
import * as Yup from 'Yup'
import { useFormik } from "formik";
import { toast } from "react-toastify";

export default function Users() {
  let dispatch = useDispatch();
  const {userToken, users} = useSelector((state)=> state.user)
  // console.log(userToken.user_email);


  async function HandleDeleteUser(id) {
    
    await dispatch(deleteUser(id));
    dispatch(getAllUsers());
  }
  
  /* ----------------------- Add New User ------------------------------- */

  async function handleAddUser(values) {
    await dispatch(addNewUser(values));
    dispatch(getAllUsers());
    toast.success('The User Added Successfully', {
      position: "bottom-right",
      });
  }
  
  let validation = Yup.object({
    name:Yup.string().required('Name is Required'),
    email:Yup.string().email('This Is InValid Email').required('Email is Required'),
    password:Yup.string().min(3 ,'minimum length is 3 characters').max(12 ,'maximum length is 12 characters').required('Password is Required'),
    phone:Yup.number().required('Phone is Required'),
    address:Yup.string().required('Address is Required'),
    age:Yup.string().required('Age is Required'),
    role:Yup.string().required('role is Required'),
  })

  let formik = useFormik({
    initialValues:{
      name:"",
      age:'',
      phone:"",
      email:"",
      address:"",
      password:"",
      role:""
  },
    validationSchema:validation,
    onSubmit:handleAddUser
  })
  
  
  useEffect(() => {
    dispatch(getAllUsers());
  }, [])
  

  return <>
  <div className="d-flex justify-content-between align-items-center m-3">
    <h2 className="afterHeader position-relative">System Users</h2>
    <button type="button" className="btn btn-primary me-sm-4" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
      Add New User
    </button>
  </div>

  <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div className="modal-dialog">
    <form className="modal-content" onSubmit={formik.handleSubmit}>
        <div className="modal-header">
          <h1 className="modal-title fs-5" id="staticBackdropLabel">New Supplier</h1>
          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div className="modal-body row row-cols-2 ">
          <div className="mb-3">
            <label htmlFor="formGroupExampleInput1" className="form-label">Name:</label>
            <input onChange={formik.handleChange} onBlur={formik.handleBlur} name="name" value={formik.values.name} type="text" className="form-control" id="formGroupExampleInput1" />
            {formik.touched.name && formik.errors.name && (<div className="text-danger fs-14 ps-1">{formik.errors.name}</div>)}
          </div>
          <div className="mb-3">
            <label htmlFor="formGroupExampleInput2" className="form-label">Email:</label>
            <input onChange={formik.handleChange} onBlur={formik.handleBlur} name="email" value={formik.values.email} type="text" className="form-control" id="formGroupExampleInput2" />
            {formik.touched.email && formik.errors.email && (<div className="text-danger fs-14 ps-1">{formik.errors.email}</div>)}
          </div>
          <div className="mb-3">
            <label htmlFor="formGroupExampleInput3" className="form-label">Password:</label>
            <input onChange={formik.handleChange} onBlur={formik.handleBlur} name="password" value={formik.values.password} type="password" className="form-control" id="formGroupExampleInput3" />
            {formik.touched.password && formik.errors.password && (<div className="text-danger fs-14 ps-1">{formik.errors.password}</div>)}
          </div>
          <div className="mb-3">
            <label htmlFor="formGroupExampleInput4" className="form-label">Phone:</label>
            <input onChange={formik.handleChange} onBlur={formik.handleBlur} name="phone" value={formik.values.phone} type="text" className="form-control" id="formGroupExampleInput4" />
            {formik.touched.phone && formik.errors.phone && (<div className="text-danger fs-14 ps-1">{formik.errors.phone}</div>)}
          </div>
          <div className="mb-3">
            <label htmlFor="formGroupExampleInput5" className="form-label">Age:</label>
            <input onChange={formik.handleChange} onBlur={formik.handleBlur} name="age" value={formik.values.age} type="number" className="form-control" id="formGroupExampleInput5" />
            {formik.touched.age && formik.errors.age && (<div className="text-danger fs-14 ps-1">{formik.errors.age}</div>)}
          </div>
          <div className="mb-3">
            <label htmlFor="formGroupExampleInput6" className="form-label">Address:</label>
            <input onChange={formik.handleChange} onBlur={formik.handleBlur} name="address" value={formik.values.address} type="text" className="form-control" id="formGroupExampleInput6" />
            {formik.touched.address && formik.errors.address && (<div className="text-danger fs-14 ps-1">{formik.errors.address}</div>)}
          </div>
          <div className="mb-3">
            <label htmlFor="formGroupExampleInput7" className="form-label">Role:</label>
            <select onChange={formik.handleChange} onBlur={formik.handleBlur} name="role" value={formik.values.role} className="form-select" id="formGroupExampleInput7" >
              <option value="superAdmin">Admin</option>
              <option value="admin">Cashier</option>
            </select>
            {formik.touched.role && formik.errors.role && (<div className="text-danger fs-14 ps-1">{formik.errors.role}</div>)}
          </div>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
          <button type="submit" className="btn btn-primary px-3">Save</button>
        </div>
      </form>
    </div>
  </div>

  <div className="mx-md-1 mx-5  px-md-5">
    <table className="inventoryTable table table-xl text-center table-hover" style={{marginTop:'100px',border:'1px solid #80808052'}}>
      <thead>
        <tr>
          <td>Id</td>
          <td>Name</td>
          <td>Phone</td>
          <td>Action</td>
        </tr>
      </thead>
      <tbody>
        {users?.map((user, index)=> 
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{user.user_name}</td>
            <td>{user.user_phone}</td>
            <td>
              <button className="btn btn-sm btn-danger ms-2" onClick={()=> HandleDeleteUser(user.user_id)}>
                <i className="fa-regular fa-trash-can"></i>
              </button>
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>

  </>
}
