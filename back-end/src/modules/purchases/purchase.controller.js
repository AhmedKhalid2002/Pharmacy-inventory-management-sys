import { escape } from 'mysql2';
import routerSuppliers from '../suppliers/suppliers.routes.js';
import connection from './../../../db/connection.js';

export const addPurcase=(req,res,next)=>{
    let {array,	
        total_number_of_products,	
        total_price_purchases,
        supplier_id	,
        rest_of_mony,	
        cash}=req.body;
        let array_strings=JSON.stringify(array);
        console.log(array_strings);
    connection.query(`insert into purchases (purchase_date,total_number_of_products,total_price_purchases,supplier_id,rest_of_mony,cash,time_purchase) values (current_date(),${total_number_of_products},${total_price_purchases},${supplier_id},${rest_of_mony},'${cash}',current_time())`,(err,results,fields)=>
    {
        connection.query(`insert into products_purchase (purchase_id,array_products,date_purchase) values ((select purchase_id from purchases order by purchase_id desc limit 1),'${array_strings}',current_date())`,(err,results,fields)=>
        {
            console.log("basha");
       
        for(let i=0;i<array.length;i++)
        {
              connection.query(`select * from products where name='${array[i].name}'`,(error,results,fields)=>
              {
                console.log(results);
                if(error==null)
                {
                    if(results.length==0)
                    {
                          connection.query(`insert into products (name,price_of_sale,price_of_buy,quantity,sale,expiry_date,packets_section,inventory_id,category_name)values('${array[i].name}',${array[i].price_of_sale},${array[i].price_of_buy},${array[i].quantity},'${array[i].sale}','${array[i].expiry_date}',${array[i].packets_section},${array[i].inventory_id},'${array[i].category_name}')`,(err,results,fields)=>
                          {
                            if(err==null)
                            {

                            }
                            else{
                                     console.log("there is an error 1 in this quey",err);
                            }
                          })
                    }
                    else{
                         connection.query(`update products set price_of_sale=${array[i].price_of_sale},price_of_buy=${array[i].price_of_buy},quantity=quantity+${array[i].quantity},expiry_date='${array[i].expiry_date}' where name='${array[i].name}'`,(err,results,fields)=>
                         {
                            if(err==null)
                            {
                                     console.log(results);
                            } 
                            else{
                                     console.log("there is an error 2 in this quey",err);
                            }
                         })
                    }
                }
                else{
                    console.log("there is an erro in the sustem",error);
                }
              })
        }
        if(err==null)
        {

        
        return res.json({success:true,results:{message:"the purchases is added successfully"}});
        }
        else{
            return res.json({success:false,results:{message:"please enter an coorect data"}});
        }
    })
})
}

//upadate user:
export const updatePurcase=(req,res)=>{
    const {id}=req.params;
    const {rest_of_mony,cash}=req.body;
    connection.query(
        `update purchases set rest_of_mony=${rest_of_mony}, cash='${cash}' where purchase_id =${id}`,(err,result,fields)=>{
            if(err==null){
                return res.json({success:true,massege:"Updated purcase successfully "});
            }else{
                return res.json({success:false,massege:"purcase not Updated "});
            }
        }
        )
}
// get all purchases:
export  const getAllPurchases=(req,res,next)=>
{
    connection.query("select * from  purchases join suppliers on(purchases.supplier_id=suppliers.supplirer_id) order by purchases.purchase_id desc",(err,results,fields)=>
    {
           if(err==null)
           {
            console.log(results);
               return res.json({success:true,results:{data:results}});
               
           }
           else{
            console.log("there is an error in the query",err);
           }
    });

};

// get the details of an specefiec purchase:
 
export const getDetails=(req,res,next)=>
{
  let {id}=req.params;
  connection.query(`select * from purchases join products_purchase on(purchases.purchase_id=products_purchase.purchase_id) where purchases.purchase_id=${id}`,(err,results,fields)=>
  {
    if(err==null)
    {
        console.log("yes");
        console.log(results);
        return res.json({success:true,results});
    }
    else{
            console.log("there is an erorr in the query",err);
    }
  })
}

// get all by the supplier and by the spedifiec  date
export const getPurchasesByDateAndBy=(req,res,next)=>
{
   let {date,supplier_id}=req.body;
   connection.query(`select * from suppliers join purchases on(purchases.supplier_id=suppliers.supplirer_id) where suppliers.supplirer_id=${supplier_id} and purchase_date='${date}' order by purchases.purchase_date desc`,(err,results,fields)=>
   {
      if(err==null)
      {
        return res.json({success:true,data:results});
      }
      else{
        console.log("there is an error in the query",err);
      }

   })
}
// get all for specifiec supplier:
export const getSpecifiecSupplier=(req,res,next)=>
{
 let {id}=req.params;
 connection.query(`select * from suppliers join purchases on(purchases.supplier_id=suppliers.supplirer_id)where suppliers.supplirer_id=${id} order by purchases.purchase_date ,purchases.time_purchase desc`,(err,results,fields)=>
   {
      if(err==null)
      {
        return res.json({success:true,date:results});
      }
      else{
        console.log("there is an error in the query",err);
      }

   })
}
// delete an purchase:
export const deletePurchase=(req,res,next)=>
{
try
{
// check if the user firts is superAdmin:
let {IdSuperAdmin}=req.body;
let {purchaseId}=req.params;

connection.query(`select * from users where user_id=${IdSuperAdmin}`,(err,results,fields)=>
{
    if(err==null)
    {
       if(results.length>0)
       {
           if(results[0].user_role=="superAdmin")
           {
                // get the id of the purchase then delete it:
                connection.query(`delete from products_purchase where purchase_id=${purchaseId}`,(err,results,fields)=>
                {
                    if(err==null)
                    {
                    //  
                     connection.query(`delete from purchases where purchase_id=${purchaseId}`,(err,results,fields)=>
                 {
                    if(err==null)
                    {
                      connection.query("select * from purchases",(err,results,fields)=>
                       {
                           return res.json({succes:true,message:"the purchase is deleted successfully",data:results});
                       })
                    } 
                    else{
                        console.log("there is an error",err);
                    }
                })
                       
                    }
                    else{
                     console.log("ther is an erorr here",err);
                    }
                })
               
           }
           else{
            return res.json({success:false,message:"the user is not a superAdmin to do this task"});
           }
       }
       else{
        res.json({succes:false,message:"the id of user is not exixts"});
       }
    }
    else{
    console.log("ther eis an error",err);
    }
})
}
catch(err)
{
return res.json({succes:false,message:err.message,stack:err.stack});
}
}


