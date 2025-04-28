import { FaStar, FaRegStar, FaStarHalfAlt } from 'react-icons/fa';

const RatingStars = ({ rating = 0 }) => {
  const fullStars = Math.floor(Number(rating) || 0);
  const hasHalfStar = rating - fullStars >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex text-yellow-400">
      {[...Array(fullStars)].map((_, index) => (
        <FaStar key={`full-${index}`} />
      ))}
      {hasHalfStar && <FaStarHalfAlt key="half" />}
      {[...Array(emptyStars)].map((_, index) => (
        <FaRegStar key={`empty-${index}`} />
      ))}
    </div>
  );
};

export default RatingStars