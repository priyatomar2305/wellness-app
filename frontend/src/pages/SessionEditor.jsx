import { useEffect, useState } from "react";
import api from "../api.js";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function SessionEditor() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [jsonUrl, setJsonUrl] = useState("");
  const [timeoutId, setTimeoutId] = useState(null);
const [id, setId] = useState(useParams().id || "");

  // Fetch session if editing existing
  useEffect(() => {
    if (id) {
      api.get(`/my-sessions/${id}`).then((res) => {
        setTitle(res.data.title);
        setTags(res.data.tags.join(", "));
        setJsonUrl(res.data.json_file_url);
      });
    }
  }, [id]);

  // Auto-save logic (5 seconds after last input)
  const handleAutoSave = () => {
    if (timeoutId) clearTimeout(timeoutId);
    const newTimeoutId = setTimeout(() => saveDraft(), 5000);
    setTimeoutId(newTimeoutId);
  };

  
const saveDraft = async () => {
  if (!title || !tags) {
    toast.error("empty fields");
    return;
  }

  const res = await api.post("/my-sessions/save-draft", {
    id,
    title,
    tags: tags.split(",").map((t) => t.trim()),
    json_file_url: jsonUrl,
  });

  // ✅ Set the returned session ID after saving
  if (!id && res.data.session?._id) {
    setId(res.data.session._id);
    return res.data.session._id; // 🔑 Return it!
  }

  return id;
};

const publishSession = async () => {
  const savedId = await saveDraft();

  if (!savedId) {
    toast.error("Error saving session before publishing.");
    return;
  }

  // ✅ Use the freshly returned session ID
  await api.post("/my-sessions/publish", { id: savedId });
  navigate("/my-sessions");
  toast.success("saved")
};

  return (
    <div className="container mt-4">
      <h2>{id ? "Edit Session" : "Create Session"}</h2>
      <input
        className="form-control mb-2"
        placeholder="Title"
        value={title}
        onChange={(e) => { setTitle(e.target.value); handleAutoSave(); }}
      required/>
      <input
        className="form-control mb-2"
        placeholder="Tags (comma separated)"
        value={tags}
        onChange={(e) => { setTags(e.target.value); handleAutoSave(); }}
       required/>
      <input
        className="form-control mb-2"
        placeholder="JSON File URL"
        value={jsonUrl}
        onChange={(e) => { setJsonUrl(e.target.value); handleAutoSave(); }}
      />
      <button className="btn btn-secondary me-2" onClick={saveDraft}>Save Draft</button>
      <button className="btn btn-primary" onClick={publishSession}>Publish</button>
    </div>
  );
}
