import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatCurrency } from "@/utils/formatCurrency";
import { Link } from "react-router-dom";

const ProductCard = ({ info }) => {
  const { imageUrl, name, description, price, id } = info;

  return (
    <Link to={`/products/${id}`}>
      <Card className="w-full max-w-sm rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 hover:border-[var(--primary-color)] hover:cursor-pointer">
        <CardHeader>
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-48 object-cover rounded-xl"
          />
        </CardHeader>
        <CardContent>
          <CardTitle className="text-xl font-semibold line-clamp-2">
            {name}
          </CardTitle>
          <CardDescription className="mt-1 text-sm text-muted-foreground line-clamp-2">
            {description}
          </CardDescription>
          <div className="mt-4 text-lg font-bold text-red-500">
            {formatCurrency(price)}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ProductCard;
