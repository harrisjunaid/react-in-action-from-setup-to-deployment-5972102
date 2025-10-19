import { useState, useEffect } from "react";
// import "../../css/ListCast.css"; // assuming spinner CSS is here
import { Spinner } from "react-bootstrap";

function ListCast() {
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function fetchCast() {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch("cast.json");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setCast(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCast();
  }, []);

  if (loading && cast.length === 0) {
    return <p>Loading cast...</p>;
  }

  if (error) {
    return (
      <div style={{ color: "red" }}>
        <p>Failed to load cast: {error}</p>
        <button onClick={fetchCast}>Retry</button>
      </div>
    );
  }

  return (
    <div>
      {/* <button onClick={fetchCast} disabled={loading} style={{ marginBottom: "1rem" }}>
        {loading && <span className="spinner"></span>}
        {loading ? "Refreshing..." : "Refresh Cast"}
      </button> */}
      <button onClick={fetchCast} disabled={loading} style={{ marginBottom: "1rem" }}>
        {loading && <Spinner animation="border" size="sm" className="me-2" />}
        {loading ? "Refreshing..." : "Refresh Cast"}
      </button>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(90px, 1fr))",
          gap: "1rem",
          marginBottom: "1rem",
        }}
      >
        {cast.map((member) => (
          <a key={member.id} data-tooltip={member.name}>
            <img src={`images/${member.slug}_tn.svg`} alt={member.name} />
          </a>
        ))}
      </div>
    </div>
  );
}

export default ListCast;