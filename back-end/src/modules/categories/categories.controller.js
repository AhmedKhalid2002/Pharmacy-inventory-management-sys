import connection from "../../../db/connection.js";
import routerSuppliers from "../suppliers/suppliers.routes.js";
export const addCategory=(req,res,next)=>
{
    let {name}=req.body;
    connection.query(`insert into category(name) values('${name}')`,(err,results,fields)=>
    {
       if(err==null)
       {
        return res.json({success:true,results:{message:"the category is added successfully"}});
       }
       else{
        return res.json({success:false,results:{message:"the name of categories is already exists"}});
       }
    })
}
export const  deleteCategory=(req,res,next)=>
{
    // this is query required:
    let {name}=req.query;
   connection.query(`delete from category where name='${name}'`,(err,results,fields)=>
   {
        if(err==null)
        {
            return res.json({success:true,results:{message:"the categoty is deleted successfully"}});
        }
        else{
            return res.json({success:false,results:{message:"there is no category exists by this name"}});
        }
   })
};
export const updateCategory=(req,res,next)=>
{
    let name=req.query;
    let {name_category}=req.body;
    connection.query(`update category set name='${name_category}' where name='${name.name}'`,(err,results,fields)=>
    {
          if(err==null)
          {
             return res.json({success:true,results:{message:"the product is updated suceccessfully"}});
          }
          else{
            console.log("the error is ",err);
            return res.json({success:false,results:{message:"this category is not exists"}});
          
          }
    })
}
// get all the categories:
export const getAllCategories=(req,res,next)=>
{
    connection.query("select * from category",(err,results,fields)=>{
        if(err==null)
        {
            return res.json({success:true,results:{message:"there are all the categories",data:results}});
        }
        else{
            return res.json({success:false,results:{message:"there is no categories founded"}});
        }
    })
};
export const getProductCatefory=(req,res,next)=>
{
   let {name}=req.query;
   connection.query(`select * from category join products  on(products.category_name=category.name)where category.name='${name}'`,(err,results,fields)=>
   {
       if(err==null)
       {
          if(results.length>0)
          {
            return res.json({success:true,results:{message:"success requests",results:{data:results}}});
          }
          else{
            return res.json({success:false,results:{message:"theere is no category by this name(category is not exists)"}})
          }
       }
       else{
        console.log("there is an error",err);
       }
   })
};
//get controller products
export const getAllCategoiresProduts=(req,res,next)=>{
    let {name}=req.query;
    connection.query(`select * from products join category on(products.category_name=category.name) where  products.category_name='${name}'`,(err,results,fields)=>
    {
        if(err==null)
        {
              if(results.length==0)
              {
                return res.json({success:true,results:{message:"there is no products in this category"}});
              }
              else{
                return res.json({success:true,results:{data:results}})
              }
        }
        else{
            console.log("there is an error",err);
        }
    })
}