import express from "express";
import { deleteTask, getMyTask, newTask, updateTask } from "../controller/task.js";
import { isAuthonticated } from "../middlewares/auth.js";

const router = express.Router();


router.post("/new", isAuthonticated, newTask);
router.get("/my", isAuthonticated, getMyTask);
router.route("/:id").put( isAuthonticated, updateTask).delete(isAuthonticated, deleteTask) ;

export default router 
 