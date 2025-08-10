import { useEffect, useState } from "react";

function IntensityCard({ filters }) {
  const [intensity, setIntensity] = useState(0);

  useEffect(() => {
    const params = new URLSearchParams(filters).toString();
    fetch(`/api/metrics/intensity?${params}`)
      .then((res) => res.json())
      .then((data) => setIntensity(data.intensity || 0))
      .catch((err) => console.error("Intensity error:", err));
  }, [filters]);

  return (
    <div className="w-full h-1/3 bg-[#264255] rounded-xl flex items-center justify-center text-white font-semibold text-lg">
      Intensity: {intensity}
    </div>
  );
}

export default IntensityCard;
