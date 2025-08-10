import { useEffect, useState } from "react";

function RelevanceCard({ filters }) {
  const [relevance, setRelevance] = useState(0);

  useEffect(() => {
    const params = new URLSearchParams(filters).toString();
    fetch(`/api/metrics/relevance?${params}`)
      .then((res) => res.json())
      .then((data) => setRelevance(data.relevance || 0))
      .catch((err) => console.error("Relevance error:", err));
  }, [filters]);

  return (
    <div className="w-full h-1/3 bg-[#264255] rounded-xl flex items-center justify-center text-white font-semibold text-lg">
      Relevance: {relevance}
    </div>
  );
}

export default RelevanceCard;
