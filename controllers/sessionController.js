import Session from "../models/Session.js";

export const getPublicSessions = async (req, res) => {
  const sessions = await Session.find({ status: "published" });
  res.json(sessions);
};

export const getMySessions = async (req, res) => {
  const sessions = await Session.find({ user_id: req.user });
  res.json(sessions);
};

export const getSessionById = async (req, res) => {
  const session = await Session.findOne({ _id: req.params.id, user_id: req.user });
  if (!session) return res.status(404).json({ message: "Not found" });
  res.json(session);
};

// export const saveDraft = async (req, res) => {
//   const { id, title, tags, json_file_url } = req.body;
//  if( !title || !tags
//   ) {
//      return res.json({ message: "missing fields"});


// }  const updateData = { title, tags, json_file_url, status: "draft", updated_at: Date.now() };
 
//   let session;
//   if (id) {
//     session = await Session.findOneAndUpdate({ _id: id, user_id: req.user }, updateData, { new: true });
//   } else {
//     session = new Session({ ...updateData, user_id: req.user });
//     await session.save();
//   }
//   res.json({ message: "Draft saved", session });
// };
export const saveDraft = async (req, res) => {
  const { id, title, tags, json_file_url } = req.body;

  // ❗ Early return with 400 Bad Request
  if (!title || !tags) {
    return res.status(400).json({ message: "Missing title or tags" });
  }

  const updateData = {
    title,
    tags,
    json_file_url,
    status: "draft",
    updated_at: Date.now()
  };

  try {
    let session;
    if (id) {
      session = await Session.findOneAndUpdate(
        { _id: id, user_id: req.user },
        updateData,
        { new: true }
      );
    } else {
      session = new Session({ ...updateData, user_id: req.user });
      await session.save();
    }

    res.json({ message: "Draft saved", session });
  } catch (err) {
    console.error("Error saving draft:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const publishSession = async (req, res) => {
  const { id } = req.body;
   
  
  const session = await Session.findOneAndUpdate({ _id: id, user_id: req.user }, { status: "published" }, { new: true });
  res.json({ message: "Session published", session });
  // if (!session) {
  //   return res.status(404).json({ message: "Session not found" });
  // }
};

export const deleteSession = async (req, res) => {
  try {
    const deleted = await Session.findOneAndDelete({ 
      _id: req.params.id, 
      user_id: req.user // Make sure to protect it
    });

    if (!deleted) {
      return res.status(404).json({ message: "Session not found" });
    }

    res.json({ message: "Session deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
// authController.js
export const checkAuth = async (req, res) => {
  try {
    // req.user comes from your middleware
    res.json({ user: { email: req.userEmail || req.user?.email } });
  } catch {
    res.status(401).json({ message: "Unauthorized" });
  }
};
