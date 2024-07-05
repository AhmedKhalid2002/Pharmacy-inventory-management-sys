import connection from "../../../db/connection.js";
const controllerAddSuplier=(req,res,next)=>
{
    let {name,phone,address}=req.body;
    connection.query(`insert into  suppliers(supplier_name,phone,address) values('${name}','${phone}','${address}')`,(err,results,fields)=>
    {
         if(err==null)
         {
            return res.json({success:true,results:{message:"the supplier  added successfully"}});
         }
        else{
           return res.json({suucess:false,results:{message:"this suppliers is already exists"}});
        }
    })
    
};
export const controllerDeleteSuplier=(req,res,next)=>
{
    let {id}=req.params;
    connection.query(`delete from suppliers where supplirer_id=${id}`,(err,results,fields)=>
    {
      if(err==null)
      {
          return res.json({success:true,results:{message:"the suppier is deleted successfully"}});
      }
      else{

          return res.json({success:false,results:{message:"this supplier is not exists"}});
      }
    })
};
// update:
export const  controllerUpdateSupplier=(req,res,next)=>
{
   let {id}=req.params;
   let {supplier_name,phone,address}=req.body;
    connection.query(`update suppliers set supplier_name='${supplier_name}',phone='${phone}',address='${address}' where supplirer_id=${id}`,(err,results,fields)=>
    {
      if(err==null)
      {
          return res.json({success:true,results:{message:"the suppier is updated successfully"}});
      }
      else{

          return res.json({success:false,results:{message:"this supplier is not exists"}});
      }
    });
};
// get all suppliers:
export const getAllSupplier=(req,res,next)=>
{
 connection.query("select * from suppliers",(err,results,fields)=>
 {
    if(err==null)
    {
       return  res.json({success:true,results:{message:"the request is ended success",data:results}});
    }
    else{
           return res.json({success:false,results:{message:"there are no suplliers founded"}})
    }
 })
}
export default controllerAddSuplier;