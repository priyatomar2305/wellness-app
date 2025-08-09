import { useEffect, useState } from "react";
import api from "../api";
import SessionCard from "../components/SessionCard";

export default function Dashboard() {
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    const fetchSessions = async () => {
      const res = await api.get("/sessions");
      setSessions(res.data);
    };
    fetchSessions();
  }, []);

  return (
    <div className="container mt-4">
      <h2>Published Wellness Sessions</h2>
      <div className="row">
        {sessions.map((session) => (
          <div className="col-md-4 mt-3" key={session._id}>
            <SessionCard session={session} />
          </div>
        ))}
      </div>
    </div>
  );
}
