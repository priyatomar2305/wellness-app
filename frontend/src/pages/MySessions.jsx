import { useEffect, useState } from "react";
import api from "../api";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

export default function MySessions() {
  const [sessions, setSessions] = useState([]);
const fetchMySessions = async () => {
  const res = await api.get("/my-sessions");
  setSessions(res.data);
};
  useEffect(() => {
    
    fetchMySessions();
  }, []);

const handleDelete = async (id) => {
  try {
    await api.delete(`/my-sessions/${id}/delete`);
    toast.success("deleted")
fetchMySessions()
  } catch (error) {
    toast.error("Failed to delete session");
  }
};
  return (
    <div className="container mt-4">
      <h2>My Sessions</h2>
      <Link to="/session-editor" className="btn btn-success mb-3">
        + Create New Session
      </Link>
      <div className="list-group">
        {sessions.map((s) => (
         <div> <Link
            key={s._id}
            to={`/session-editor/${s._id}`}
            className="list-group-item list-group-item-action"
          >
            {s.title} ({s.status})
          </Link>
            <button className="float-end btn btn-primary" onClick={() => handleDelete(s._id)}> delete</button>
</div>
        ))}
      </div>
    </div>
  );
}
