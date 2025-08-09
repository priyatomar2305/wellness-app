export default function SessionCard({ session }) {
  return (
    <div className="card h-100">
      <div className="card-body">
        <h5 className="card-title">{session.title}</h5>
        <p className="card-text">{session.tags.join(", ")}</p>
        <a href={session.json_file_url} target="_blank" rel="noreferrer" className="btn btn-primary">
          View Session
        </a>
      </div>
    </div>
  );
}
