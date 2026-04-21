import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function ProductDetail() {

  const { id } = useParams();
  const [plant, setPlant] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/plants")
      .then(res => res.json())
      .then(data => {

        const found = data.find(p => p._id === id);

        setPlant(found);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div className="p-10">Loading...</div>;
  }

  if (!plant) {
    return <div className="p-10 text-red-500">Product not found</div>;
  }

  return (
    <div className="p-10 flex gap-10">

      <img src={plant.img} className="w-1/2 rounded" />

      <div>
        <h1 className="text-3xl font-bold">{plant.name}</h1>
        <p className="text-green-700 text-xl">${plant.price}</p>
      </div>

    </div>
  );
}