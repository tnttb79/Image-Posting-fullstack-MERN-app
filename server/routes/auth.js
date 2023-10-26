import express from "express"
import { signUp, signIn} from "../controllers/auth.js"

const router = express.Router()

// sign in
router.post("/signup", signUp);

// sign up
router.post("/signin", signIn);

export default router;