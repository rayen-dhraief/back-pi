import express from "express";
import { verifyToken } from "../middleware/auth.js";
import { getActivities ,deleteActivity ,updateActivity,incrementParticipants, addActivityFeedback} from "../controllers/Activity.js";
const router = express.Router();

/* READ */
router.get("/get", verifyToken, getActivities);
router.delete('/remove/:id', deleteActivity);
router.put('/update/:id', updateActivity);
router.put('/updatePnb/:id',verifyToken, incrementParticipants);
router.post('/addActivityFeedback/:id', verifyToken , addActivityFeedback);
// router.get("/:userId/posts", verifyToken, getUserPosts);

// /* UPDATE */
// router.patch("/:id/like", verifyToken, likePost);

export default router;
