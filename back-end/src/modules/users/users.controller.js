import connection from "../../../db/connection.js";
export const controllerSignUp=(req,res,next)=>
{
    let {name,email,password,age,role,address,phone}=req.body;
    connection.query(`insert into users (user_name,user_age,user_phone,user_email,user_password,address,user_role) values('${name}',${age},'${phone}','${email}','${password}','${address}','${role}')`,(err,results,fields)=>
    {
        if(err==null)
        {
              return res.json({success:true,results:{message:"successfully added you can now logIn"}});
        }   
        else{
              console.log("there is an error",err);
        }  
    })
}

export const controllerLogin=(req,res,next)=>
{
   let {email,password}=req.body;
   connection.query(`select * from users where user_email='${email}' and user_password='${password}'`,(err,results,fields)=>
   {
       try{
        console.log("the final results is",results);
              res.json({success:true,results:{message:"successsfully login",account:results[0]}});
       }
       catch(err)
       {
        console.log("there is an eror in the server or in the query",err);
       }

   })
}
// get all admins by superAdmin:
export const controllerAllAdmin=(req,res,next)=>
{
    connection.query(`select user_name,user_phone,user_id from users`,(err,results,fields)=>
    {
        if(err==null)
        {
            console.log(results);
            return res.json({success:true,results:{data:results}});
        }
        else{
            console.log("there is an error in the server or query")
        }
    });
};
//get an specifiec admin:
export const  controllerAdmin=(req,res,next)=>
{
   // this is what i neeeded only:
   let {id}=req.params;
   connection.query(`select user_name,user_age,user_email,user_id,address,user_phone from users where user_id=${id}`,(err,results,fields)=>
   {
       if(err==null)
       {
             return res.json({success:true,results:{data:results[0]}});
       }
      else{
        console.log("there is an error in the server or in the query");
      }
   })
} 
export const controllerAdminRemove=(req,res,next)=>
{
    let {id}=req.params;
    connection.query(`delete from users where user_id=${id}`,(err,results,next)=>
    {
        if(err==null)
        {
            return res.json({success:true,results:{message:"the user(admin) is deleted successfully"}});
        }
        else{
            console.log("there is an error in the server or query");
        }
    })
}
