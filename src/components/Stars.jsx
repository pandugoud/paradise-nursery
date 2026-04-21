export default function Stars({ rating = 4 }) {
  return (
    <div className="text-yellow-400 text-sm">
      {"★".repeat(rating)}{"☆".repeat(5 - rating)}
    </div>
  );
}