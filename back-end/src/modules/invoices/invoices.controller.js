

import connection from "../../../db/connection.js";

let flag=false;
// this is the controller of the add a new invoice :
export const  addInvoice=async (req,res,next)=>
{
    try
    {
        // recieve the data in the body :
        // enter  the data in invoice table:
        let {invoiceNumberProducts,invoiceTotalPrice,userId,arrayProducts}=req.body;
        let io=JSON.stringify(arrayProducts);
        connection.query(`insert into invoices (invoice_number_products ,invoice_date ,invoice_time ,invoice_total_price,user_id ) values(${invoiceNumberProducts},current_date(),current_time(),${invoiceTotalPrice},${userId})`,(err,results,fields)=>
        {
           if(err==null)
           {
               // insert into the table values of invoicesProducts and in the products:
             for(let i=0;i<arrayProducts.length;i++)
             {
                connection.query(`select id from products where id=${arrayProducts[i].id}`,(err,results,fields)=>
                {
                    if(results.length==0)
                    {
                      flag=true;
                      console.log("no");
                     
                    }
                })
             }
               
           
               connection.query(`insert into invoices_products(array_products,invoice_id ) values('${io}',(select invoice_id from invoices order by invoice_id desc limit 1))`,(err,results,fields)=>
               {
                  if(err==null)
                  {

                  
                     arrayProducts.forEach((ele,index)=>
                     {
                          connection.query(`update products set quantity=quantity-${ele.quantity} where id=${ele.id}`,(err,results,fields)=>
                          {
                               if(err==null)
                               {
                                    
                               }
                               else
                               return res.json({sucsess:false,message:"there is an erro",err});
                            
                           
                          
                          })
                     })
                     
                     connection.query("update products set quantity=0 where quantity<0",(err,results,fields)=>
                     {
                          if(err==null)
                          {

                          
                             return res.json({sucsess:true,results:{message:"the invoice is added successfully"}});
                          }
                          else{
                            return res.json({sucsess:false,message:"there is an erro",err});
                          }
                          
                       
                     })
                  }
                  else{
                    return res.json({sucsess:false,message:"there is an erro",err});
                  }
                 

                })
            
           }
           else{
            return res.json({sucsess:false,message:"there is an erro",err});
           }
        });
    }
    catch(err)
    {
     return res.json({sucsess:false,err});
    }
}
// update an invoices
export const updateInvoice=(req,res,next)=>
{
// get the data of the invoice:
let FinalProductsQuantity=[];
let {id}=req.params;
let {arrayProducts,invoiceTotalPrice,invoiceNumberProducts}=req.body;
// change the data:
let io=JSON.stringify(arrayProducts);
try{
  {
    connection.query(`select array_products from invoices_products where invoice_id=${id}`,(err,results,fields)=>
    {
      if(err==null)
      {
        // get the arary of the products:
                    let resultsFinal=JSON.parse(results[0].array_products);
        // get the new invoices array:
        console.log("this is the array will i get",arrayProducts); 
        for(let i=0;i<resultsFinal.length;i++)
        {
         
          for(let j=0;j<arrayProducts.length;j++)
          {
             if(resultsFinal[i].id==arrayProducts[j].id)
             {
                  let theQuantity;
                  let objectFinal={id:"",quantity:null};
                  if(arrayProducts[j].quantity>resultsFinal[i].quantity)
                  {
                      theQuantity=resultsFinal[i].quantity-arrayProducts[j].quantity;
                      objectFinal.id=resultsFinal[i].id;
                      objectFinal.quantity=theQuantity;
                      FinalProductsQuantity.push(objectFinal);
                  }
                  else if(arrayProducts[j].quantity<resultsFinal[i].quantity)
                  {
                          theQuantity=resultsFinal[i].quantity-arrayProducts[j].quantity;
                          objectFinal.id=resultsFinal[i].id;
                          objectFinal.quantity=theQuantity;
                          FinalProductsQuantity.push(objectFinal);
                  }
                  else{
                     if(arrayProducts[j].quantity==resultsFinal[i].quantity)
                     {
                      theQuantity=0;
                      objectFinal.id=resultsFinal[i].id;
                      objectFinal.quantity=theQuantity;
                      FinalProductsQuantity.push(objectFinal);
                     }
                  }
             }
             else
             {
              continue;
             }
          }
        }
        console.log(FinalProductsQuantity);
         connection.query(`update invoices set updated_at=sysdate(),invoice_total_price=${invoiceTotalPrice},invoice_number_products=${invoiceNumberProducts} where invoice_id=${id}`,(err,results,fields)=>
         {
          if(err==null)
          {
            connection.query(`update invoices_products set array_products='${io}' where invoice_id=${id} `,(err,results,fields)=>
            {
              if(err==null)
              {
                FinalProductsQuantity.forEach((ele,index)=>
                {
                  connection.query(`update products set quantity=quantity+${ele.quantity} where id=${ele.id}`,(err,results,fields)=>
                  {
                    if(err==null)
                    {
                      
                    }
                    else{
                      console.log("there is an erorr ",err);
                    }
                  })
                })
              }
              else{
                console.log("there is an error",err);
              }
            })
          }
          else{
            console.log("there is an error ",err);
          }
         });
         return res.json({sucsess:true,results:"the invoice is updated successfully"});
      }
      else{
               console.log("theere is an error");
      }
    })
}
}
catch(err)
{
return res.json({sucsess:false,message:"there is an error",err});
}

}
// get all the invoices:
export  const getAllinvoices=(req,res,next)=>
{
  try
  {
    connection.query("select * from invoices order by invoice_id,invoice_time,invoice_date desc",(err,results,fields)=>
  {
    if(err==null)
    {
      return res.json({sucsess:true,results:{data:results}});
    }
    else{
      console.log("there is na error");
    }
  })
  }
  catch(err)
  {
    return res.json({succss:false,message:"errr",err});
  }

  
}

// get an specefiec invoice:
export const getSpeciefic=(req,res,next)=>
{
  let {id}=req.params;
  try{
    connection.query(`select * from  invoices join invoices_products  on(invoices.invoice_id=invoices_products.invoice_id) where invoices.invoice_id=${id} `,(err,results,fields)=>
    {
      if(err==null)
      {
        return res.json({sucsess:true,results:{results}});
      }
      else{
            console.log("there is an error",err);
      }
    })
  }
 catch(err){
  return res.json({succss:false,message:"errr",err});
 }
}
// get by the day desc:
export const getDay=(req,res,next)=>
{
  let {date}=req.body;
  try
  {
    connection.query(`select * from invoices where invoice_date='${date}'  order by invoice_id,invoice_time,invoice_date desc`,(err,results,fields)=>
  {
    if(err==null)
    {
      return res.json({sucsess:true,results:{data:results}});
    }
    else{
      console.log("there is na error");
    }
  })
  }
  catch(err)
  {
    return res.json({succss:false,message:"errr",err});
  }
}
//delete invoice:
export const deleteInvoice=(req,res,next)=>
{
try
{
  let {invoiceId}=req.params;
connection.query(`delete from invoices_products  where invoice_id=${invoiceId }`,(err,results,fields)=>
{
  if(err==null)
  {
      connection.query(`delete from invoices where invoice_id=${invoiceId}`,(err,results,fields)=>
      {
        if(err==null)
        {
          connection.query("select * from invoices",(err,results,fields)=>
          {
            if(err==null)
            {
                 return res.json({sucsess:true,message:"the invoice is deleted successfully",data:results});
            }
            else{

            }
          })
        }
        else{

        }
      })
  }
  else{
      console.log("there is an error")
  }
})

}
catch(err)
{
  return res.json({sucsess:false,err,stack:err.stack});
}
}