import { Router } from "express";
const router = Router();

//*--> Import all controllers  <--*//
import {
    getallpost, getPost
} from "../controllers/PostController.mjs";


//? POST

//? GET
router.route("/post/:id").get(getPost);
router.route("/getPosts").get(getallpost);

export default router;
