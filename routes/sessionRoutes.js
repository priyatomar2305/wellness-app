import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { getPublicSessions, getMySessions,deleteSession,checkAuth, getSessionById, saveDraft, publishSession } from "../controllers/sessionController.js";

const router = express.Router();

router.get("/sessions", getPublicSessions);
router.get("/my-sessions", authMiddleware, getMySessions);
router.get("/my-sessions/:id", authMiddleware, getSessionById);
router.post("/my-sessions/save-draft", authMiddleware, saveDraft);
router.post("/my-sessions/publish", authMiddleware, publishSession);
router.delete("/my-sessions/:id/delete",authMiddleware, deleteSession); // DELETE endpoint
router.get("/check", authMiddleware, checkAuth);

export default router;
