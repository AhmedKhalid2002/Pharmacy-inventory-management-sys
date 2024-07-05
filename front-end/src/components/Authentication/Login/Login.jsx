import {useNavigate } from 'react-router-dom';
import logo from '../../../assets/logo.png'
import {postDataToApi } from "../../../utils/api";
import { useState } from "react";
import { useFormik } from 'formik';
import * as Yup from 'Yup'
import { useDispatch } from 'react-redux';
import { setUserToken } from '../../../Redux/userSlice';

export default function Login() {
  const [Error, setError] = useState(null)
  let dispatch = useDispatch();
  let navigate = useNavigate();

  async function loginSubmit(values){
      const data = await postDataToApi('/users/login', values)
      console.log(values);
      // console.log(data);
      if (data.results.message == "the user email or passwrod is not correct") {
          setError(data.results.message)
      }
      else if (data.results.message == "successsfully login"){
          // console.log(data.results.account);
          localStorage.setItem('userToken', JSON.stringify(data.results.account))
          dispatch(setUserToken(data.results.account));
          navigate('/')
          setError(false);
      }
  }


  let validation = Yup.object({
    email:Yup.string().email('This Is InValid Email').required('Email is Required'),
    password:Yup.string().min(3 ,'minimum length is 3 characters').max(12 ,'maximum length is 12 characters').required('Password is Required'),
  })

  let formik = useFormik({
    initialValues:{
      email:'',
      password:'',
    },
    validationSchema:validation,
    onSubmit:loginSubmit
  })


  return <div className="min-vh-100 d-flex align-items-center justify-content-center">
    <div className="bg-white shadow-lg rounded-lg p-4 w-50 max-w-md">

    <div className="d-flex align-items-center justify-content-center flex-column gap-2">
      <img src={logo} alt="Pharmacy Logo" style={{width: '80px', height: '80px', borderRadius: "50%"}} />
      <h5>Pharmacy Inventory</h5>
    </div>
    <form onSubmit={formik.handleSubmit}>
      <div className="mt-3">
        <label htmlFor="email" className="form-label text-dark fw-bold mb-2">Email</label>
        <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} type="email" id="email" name="email" className="form-control rounded-lg w-100 p-2 border-gray" placeholder="Enter your email" />
        {formik.errors.email && formik.touched.email?<p className=" text-danger fs-14 my-1">{formik.errors.email}</p>:''}
      </div>

      <div className="my-3">
          <label htmlFor="password" className="form-label text-dark fw-bold mb-2">Password</label>
          <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password} type="password" id="password" name="password" className="form-control rounded-lg w-100 p-2 border-gray" placeholder="Enter your password" />
          {formik.errors.password && formik.touched.password?<p className=" text-danger fs-14 my-1">{formik.errors.password}</p>:''}
      </div>

      <div className="mt-1">
        <button id="login-btn" type='submit' className="btn btn-primary w-100 rounded-lg">Login</button>
      </div>
      {Error?<p className='text-danger mt-2 text-center'>{Error}</p>:''}
    </form>
  </div>
</div>
}
