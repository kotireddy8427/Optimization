import React, { useState, useEffect } from "react";
import { useApi } from "../hooks/useApi";
import { fetchClaims } from "../api/claimsApi";

export default function ClaimsList() {
  const [page, setPage] = useState(1);
  const pageSize = 20;
  const { data, loading, execute } = useApi(fetchClaims);

  useEffect(() => {
    execute(page, pageSize);
  }, [page, execute]);

  const handleNext = () => setPage((p) => p + 1);
  const handlePrev = () => setPage((p) => Math.max(1, p - 1));

  return (
    <div style={{ maxWidth: 800, margin: "20px auto" }}>
      <h2>Claims List (Page {page})</h2>
      {loading && <p>Loading...</p>}
      <ul>
        {data?.data?.map((claim) => (
          <li key={claim.id}>
            {claim.claimant} - ${claim.amount} - {claim.status}
          </li>
        ))}
      </ul>
      <button onClick={handlePrev} disabled={page === 1}>Previous</button>
      <button onClick={handleNext}>Next</button>
      {data?.fromCache && <p style={{ color: "green" }}>Data loaded from cache</p>}
    </div>
  );
}
