import { Router } from "express";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { loginController, logoutController, refreshUserController, registerController } from "../controllers/auth.js";
import { validateBody } from "../middlewares/validateBody.js";
import { registerUserValidationShema } from "../validations/registerUserValidation.js";
import { loginUserValidation } from "../validations/loginUserValidation.js";

const authRouter = Router();

authRouter.post('/register', validateBody(registerUserValidationShema), ctrlWrapper(registerController));
authRouter.post('/login', validateBody(loginUserValidation), ctrlWrapper(loginController));
authRouter.post('/logout', ctrlWrapper(logoutController));
authRouter.post('/refresh', ctrlWrapper(refreshUserController));

export default authRouter;
