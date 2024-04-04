import express from "express";
import { login,loginn,register,logOut } from"../controllers/auth.js";

const router = express.Router();

router.post("/login", login);
router.post("/loginn", loginn);
router.post("/register", register);
router.get("/logout/:id", logOut);

export default router;