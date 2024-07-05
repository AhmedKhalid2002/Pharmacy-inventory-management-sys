
import { json } from "express";
import connection from "../../../db/connection.js";
export const addProductContoroller=(req,res,next)=>
{
    let {	
        name,
        price_of_sale,
        price_of_buy,
        quantity,
        sale,
        expiry_date,
       
        packets_section,
        inventory_id,
        category_name}=req.body;
    connection.query(`insert into products (name,price_of_sale,price_of_buy,quantity,sale,expiry_date,packets_section,inventory_id,category_name) values('${name}',${price_of_sale}, ${price_of_buy},${quantity},'${sale}','${expiry_date}', ${packets_section}, ${inventory_id},'${category_name}')`,(error,results,fields)=>
        {
            if(error==null)
            {
                 return res.json({succes:true,results:{message:"the product is added successfully"}});
            }
            else{
               console.log("theere is an error",error);
               return res.json({succes:false,results:{message:"the proucts is already exixts"}});
            }
        })
};
export const getAllProducts=(req,res,next)=>
{
   connection.query("select * from products",(err,results,next)=>
   {
       if(err==null)
       {
           console.log(results);
           return res.json({succes:true,results:{data:results}});
       } 
       else{
        console.log("there is an error",err);
       }
   })
};

export const updateProduct=(req,res,next)=>
{
    let {id}=req.params;
    let {
        price_of_sale,
        price_of_buy,
        quantity,
        sale,
        }=req.body;
        connection.query(`update products set price_of_sale=${price_of_sale},price_of_buy=${price_of_buy},quantity=${quantity},sale='${sale}'where id=${id}`,(err,results,fields)=>
        {
            if(err==null)
            {
                console.log(results);
                return res.json({succes:true,results:{message:"the products is updated successfully"}});
            }
            else{
                console.log("there is an error",err);
                return res.json({succes:false,results:{message:"the products is not exixts"}});
            }
        })
};

export const deleteProducts=(req,res,next)=>
{
   let {id}=req.params;
   connection.query(`delete from products where id=${id}`,(err,results,fields)=>
   {
      if(err==null)
      {
          console.log(results);
          return res.json({succes:true,results:{message:"the product is delted successfully"}});
      }
      else{
        console.log("there s an error",err);
        return res.json({succes:false,results:{message:"the product is not exists"}});
      }
   })
};

export const getProductsByLetter=(req,res,next)=>
{
   let {letter}=req.query;
   connection.query(`select * from products where name like '${letter}%'`,(err,results,fields)=>
   {
      if(err==null){
        console.log("the reslts is",results);
        if(results.length==0)
        {
            return res.json({success:true,results:{message:"there is no products starts with this letter"}});
        }
        return res.json({success:true,results:{message:"the requests is ended successfully",results}});
      }
      else{
        console.log("there is an error in the reqeust or query",err);
      }
   })
};
export const getProductsByName=(req,res,next)=>
{
    let {name}=req.query;
    connection.query(`select * from products where name='${name}'`,(err,results,fields)=>
    {
        if(err==null){
            console.log("the reslts is",results);
            if(results.length==0)
            {
                return res.json({success:true,results:{message:"there is no products by this name"}});
            }
            return res.json({success:true,results:{data:results}});
          }
          else{
            console.log("there is an error in the reqeust or query",err);
          }
    })
};
// empty products>>>>> where the quantity ==0;
export const emptyMedicines=(req,res,next)=>
{
    try{
        
    connection.query("select * from products where quantity=0 or quantity<0",(err,results,fields)=>
    {
        if(err==null)
         return res.json({success:true,results:{data:results}});
    })
}
catch(err)
{
    return res.json({success:false,results:err})
}
}

// get the expiry products:
export const getExpiryProducts=(req,res,next)=>
{
    try{
      connection.query("select * from products where current_date>expiry_date or current_date=expiry_date order by expiry_date desc",(error,results,fields)=>
      {
        if(error==null)
        {
          if(results.length==0)
          {
            return res.json({succes:true,data:"we don't have an expiry products in the invetory"});
          }
          else{
            return res.json({succes:true,data:results});
          }
        }
        else{
            console.log("there is an werror",error);
        }
      })
    }
    catch(err)
    {
        return res,json({succes:false,message:"there is an error in get the products (expiry)",err});
    }
}

