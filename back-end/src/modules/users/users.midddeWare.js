
import connection from "../../../db/connection.js";
export const middleWareSignup=(req,res,next)=>
{
   let  {name,age,phone,email,address,password,role}=req.body;
   req.emailFlag=true;
   connection.query(`select user_email  from users where user_email='${email}'`,(err,results,fields)=>
   {
      if(err==null)
      {
           req.emailFlag=true;
           console.log("the results is",results);
           if(phone.length>11)
           {
                return res.json({success:false,results:{message:"the phone is wrong(11digit)"}});
           }
           if(age<18&&age>100)
           {
             return res.json({success:false,results:{message:"the age must be between 18:100"}})
           }
           return next();
      }
      else{
         console.log("there is an error",err);
         return res.json({success:false,results:{message:"the email is existed already"}});
      }
   })


}

//midldle ware login:
export const middleWareLogin=(req,res,next)=>
{ 
    //make sure of the data:
    let {email,password}=req.body;
    connection.query(`select user_email,user_password from users where user_email='${email}' and user_password='${password}'`,(err,results,fields)=>
    {
        console.log("the results is",results);
        if(err==null)
        {
            if(results.length>0)
            {
               req.fail=false; 
               return next();
            } 
            else{
                req.fail=true;
                return res.json({success:false,results:{message:"the user email or passwrod is not correct"}});
            }
        }
        else{
            console.log("there is an eror in the server or queryr",err);
        }
    

    })

}
// all the admins middlewrae:
export const middleWareAllAdmins=()=>
{
  // middleware:
  let {email}=req.body;
  connection.query(`select user_role from users where user_email='${email}'`,(err,results,fields)=>{
    try{
     if(err==null)
     {
            if(results.length>0)
            {
                if(results[0].user_role=="superAdmin")
                {
                    return next();
                }
                else{
                   return res.json({success:false,results:{message:"you must be an superAdmin  to access this"}});
                }
            }else{
                return res.json({message:false,results:{message:"the email your sended is not exists"}});
            }
     }
     else{
          console.log("there is an error in the seever or in query",err);
     }
    }
    catch(error)
    {
        console.log("there is an erro in the syntax",error)
    }

    })
};


//get an specifiec user(admin):
export const middleWareAdmin=(req,res,next)=>
{
    // middleware:
    //emial in body ,admin id in params:
let {id}=req.params;
let {email}=req.body;
connection.query(`select * from users where user_email='${email}'`,(err,results,fields)=>
{ 
    if(err==null)
    {
       if(results.length>0)
       {
        return next();
       }
       else{
                return res.json({success:false,message:"the email not belong to the admin"});
       }
    }
    else{
        console.log("there is aan error",err)
    }
})
   
};

// remove an admin from the admins:
export const middleWareAdminRemove=(req,res,next)=>
{
    let {id}=req.params;
    connection.query(`select * from users where user_id=${id}`,(err,results,fields)=>
    {
        if(err==null){
            console.log("the results is",results);
            if(results.length>0)
            {
                    return next();
            }
            else{
                return res.json({success:false,results:{message:"there is no admin by this id"}});
            }

        }
        else{
            console.log("there is an error in the request or queyr server",err)
        }
    });
}