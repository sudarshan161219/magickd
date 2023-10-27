import { Router } from "express";
const router = Router();

//*--> Import all controllers  <--*//
import { getItem } from "../controllers/userController.mjs";

//? POST

//? GET
router.route("/getItem").get(getItem);

export default router;
