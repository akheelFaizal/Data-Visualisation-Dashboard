
import { useEffect, useState } from "react";

function LikelihoodCard({ filters }) {
  const [likelihood, setLikelihood] = useState(0);

  useEffect(() => {
    const params = new URLSearchParams(filters).toString();
    fetch(`/api/metrics/likelihood?${params}`)
      .then((res) => res.json())
      .then((data) => setLikelihood(data.likelihood || 0))
      .catch((err) => console.error("Likelihood error:", err));
  }, [filters]);

  return (
    <div className="w-full h-1/3 bg-[#264255] rounded-xl flex items-center justify-center text-white font-semibold text-lg">
      Likelihood: {likelihood}
    </div>
  );
}

export default LikelihoodCard;
