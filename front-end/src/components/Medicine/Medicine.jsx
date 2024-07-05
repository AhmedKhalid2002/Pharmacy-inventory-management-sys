import { useEffect, useRef } from "react";
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { deleteCategories, getCategories, setCategories, updateCategories } from "../../Redux/medicineSlice";
import CategoryProducts from "./categoryProducts";
import { fetchDataFromApi } from "../../utils/api";
import { toast } from 'react-toastify';


export default function Medicine() {
  let dispatch= useDispatch();
  const {categories} = useSelector((state)=> state.categories)
  const categoryNameRef = useRef(null);
  const [Error, setError] = useState('');
  const [Modal, setModal] = useState(false)


  async function AddCategory() {
    const param ={
      name:categoryNameRef.current.value
    }

    let {payload} = await dispatch(setCategories(param))
    if (payload.success == true) {
      dispatch(getCategories());
      categoryNameRef.current.value = '';
      toast.success('The Category Added Successfully', {
        position: "bottom-right",
        });
      setError('');
    }
    else{
      setError(payload.results.message);
    }
  }

  async function DeleteCategory(name){
    await dispatch(deleteCategories(name))
    dispatch(getCategories())
  }

  const [UpdatedCat, setUpdatedCat] = useState('');
  const newNameRef = useRef(null);

  async function UpdateCategory(){
    let updateArr = [UpdatedCat, newNameRef.current.value]
    await dispatch(updateCategories(updateArr))
    dispatch(getCategories())
  }

  const [CategoryName, setCategoryName] = useState('')
  const [categoryProducts, setCategoryProducts] = useState(null)
  async function getCategoryProducts(name) {
    setCategoryName(name);
    let {results} = await fetchDataFromApi(`/categories/getCategoryProducts?name=${name}`);
    console.log(results);
    setCategoryProducts(results);
  }

  useEffect(()=>{
    dispatch(getCategories())
  },[])
  

  return (
    <>
    {/* <ToastContainer /> */}
  <div className="d-flex justify-content-between align-items-center m-3 mt-4">
    <h2 className="h3 afterHeader position-relative">Medicines Categories</h2>
    <button type="button" className="btn btn-primary me-sm-4" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
      Add New Category
    </button>
  </div>
  
  {/* Start Add New Category Modal */}
  {<div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h1 className="modal-title fs-5" id="staticBackdropLabel">New Category</h1>
          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div className="modal-body">
          <div className="mb-3">
            <label htmlFor="formGroupExampleInput" className="form-label">Category Name</label>
            <input ref={categoryNameRef} type="text" className="form-control" id="formGroupExampleInput" />
            {Error?<p className="text-danger my-2">{Error}</p>:''}
          </div>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
          <button type="button" className="btn btn-primary px-3" onClick={AddCategory}>Save</button>
        </div>
      </div>
    </div>
  </div>}
  
  {/* End Add New Category Modal */}
      <div className="mx-md-1 mx-5 px-md-5">
    <table className="categoryTable table table-xl text-center table-hover" style={{marginTop:'80px',border:'1px solid #80808052'}}>
      <thead>
        <tr className="fw-medium">
          <td>Id</td>
          <td>Category Name</td>
          <td>Action</td>
        </tr>
      </thead>
      <tbody>
        {categories?.map((Product, index)=> 
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{Product.name}</td>
            <td>
              <button className="btn btn-sm btn-primary ms-2" onClick={()=> getCategoryProducts(Product.name)} data-bs-toggle="modal" data-bs-target="#staticBackdrop3">
              <i className="fa-solid fa-eye"></i>
              </button>
              <button className="btn btn-sm btn-primary ms-2" onClick={()=> setUpdatedCat(Product.name)} data-bs-toggle="modal" data-bs-target="#staticBackdrop2">
                <i className="fa-regular fa-pen-to-square"></i>
              </button>
              <button className="btn btn-sm btn-danger ms-2" onClick={()=> DeleteCategory(Product.name)}>
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
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="staticBackdropLabel2">Update Category</h1>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                  <div className="mb-3">
                    <label htmlFor="formGroupExampleInput2" className="form-label">New Category Name</label>
                    <input type="text" ref={newNameRef} className="form-control" defaultValue={UpdatedCat} id="formGroupExampleInput2" />
                    {/* {Error?<p className="text-danger my-2">{Error}</p>:''} */}
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                  <button onClick={()=> UpdateCategory()} type="button" className="btn btn-primary px-3">Save</button>
                </div>
              </div>
            </div>
          </div>
          {/* End Add Update Category Modal */}
          <CategoryProducts Category={{categoryProducts, CategoryName}}/>
  </div>
    </>
  );
}
