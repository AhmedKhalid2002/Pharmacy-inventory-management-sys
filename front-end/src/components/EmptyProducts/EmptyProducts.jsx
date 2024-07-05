import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getEmptyProducts, getProductByFirstLetter } from "../../Redux/inventorySlice";

export default function EmptyProducts() {
  let dispatch= useDispatch();
  const {EmptyProducts} = useSelector((state)=> state.inventory)


  const handleSearch = async (value) => {
    await  dispatch(getProductByFirstLetter(value))
  };

  useEffect(()=>{
    dispatch(getEmptyProducts())
  },[])
  

  return (
    <>
  <div className="d-flex justify-content-between align-items-center m-3 mt-4">
    <h2 className="h3 afterHeader position-relative">Expired Products</h2>
  </div>
  
  <div className="mx-md-1 mx-3  px-md-3">
  {/*----------------------------------------------- Start Table of Products --------------------------------------------*/}

  {/* <div className="Search mt-5">
    <input
      placeholder="Search For Specific Product?"
      onKeyUp={(e) => {
        handleSearch(e.target.value);
      }}
      style={{ width: '450px' }}
      type="text"
      className="form-control"
    />
    </div> */}

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
        </tr>
      </thead>
      <tbody>
      {EmptyProducts?<>
          {EmptyProducts?.map((product, index)=> <tr key={index}>
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
        </>
        : 
        <tr>
          <td colSpan={10}>There Are No Products Available</td>
        </tr>
        }
      </tbody>
    </table>
  {/*----------------------------------------------- End Table of Products --------------------------------------------*/}
  </div>
    </>
  );
}
