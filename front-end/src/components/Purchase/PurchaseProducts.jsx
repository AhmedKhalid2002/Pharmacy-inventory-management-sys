import React from 'react'

export default function PurchaseProducts({purchaseProducts}) {

  
  return <>
    <div className="modal fade" id="staticBackdrop3" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable" style={{maxWidth:'1040px', width:'fit-content'}}>
        <div className="modal-content">
          <div className="modal-header">
            {/* <h1 className="modal-title fs-5" id="staticBackdropLabel">{Category?.CategoryName} Medicines</h1> */}
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body" style={{minWidth:"500px"}}>
            <table className="categoryTable table table-xl text-center table-hover" style={{border:'1px solid #80808052'}}>
              <thead>
                <tr>
                  <td>Id</td>
                  <td>Product Name</td>
                  <td>Category Name</td>
                  <td>Packets</td>
                  <td>Expiry_date</td>
                  <td>Price_of_buy</td>
                  <td>Price_of_sale</td>
                  <td>Quantity</td>
                  <td>Sale</td>
                </tr>
              </thead>
              <tbody>
                {purchaseProducts?.map((product, index)=> <tr key={index}>
                  <td>{index+1}</td>
                  <td>{product.name}</td>
                  <td>{product.category_name}</td>
                  <td>{product.packets_section}</td>
                  <td>{product.expiry_date}</td>
                  <td>{product.price_of_buy}</td>
                  <td>{product.price_of_sale}</td>
                  <td>{product.quantity}</td>
                  <td>{product.sale}%</td>
                </tr>)}
              </tbody>
            </table>
            
          </div>
        </div>
      </div>
    </div>
  </>
}
