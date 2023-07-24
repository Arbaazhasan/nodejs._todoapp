import express from "express";
import { getMyProfile, login, logout, register } from "../controller/user.js";
import { isAuthonticated } from "../middlewares/auth.js";

const router = express.Router();



router.post("/new", register);
router.post("/login", login);

router.get("/logout", logout);

router.get("/me", isAuthonticated ,getMyProfile);


export default router; 