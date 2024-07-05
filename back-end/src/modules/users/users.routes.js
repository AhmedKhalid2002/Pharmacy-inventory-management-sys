import { Router } from "express";
import { middleWareSignup } from "./users.midddeWare.js";
import { controllerSignUp } from "./users.controller.js";
import { controllerLogin } from "./users.controller.js";
import { middleWareLogin } from "./users.midddeWare.js";
import { middleWareAllAdmins} from "./users.midddeWare.js";
import { controllerAllAdmin } from "./users.controller.js";
import { middleWareAdmin } from "./users.midddeWare.js";
import { controllerAdmin } from "./users.controller.js";
import { middleWareAdminRemove } from "./users.midddeWare.js";
import { controllerAdminRemove } from "./users.controller.js";
let userRouter=Router();
// signup api:
userRouter.post("/signup",middleWareSignup,controllerSignUp);
//login (superAdmin/admin):
userRouter.post("/login",middleWareLogin,controllerLogin);
// superAdmin get all the users:
userRouter.get("/allAdmins",controllerAllAdmin);
//api to get an speciefic admin from the pages:
userRouter.get("/admin/:id",middleWareAdmin,controllerAdmin);
// remove an specifiec admin fro the admins Lists:
userRouter.delete("/admin/:id",middleWareAdminRemove,controllerAdminRemove);
export default userRouter;



