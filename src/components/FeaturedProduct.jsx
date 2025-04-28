import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { getActiveFeaturedProduct } from "@/services/productService";

const FeaturedProduct = () => {
  const [featuredProduct, setFeaturedProduct] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getActiveFeaturedProduct();
        setFeaturedProduct(data.content);
      } catch (err) {
        console.error("Cannot load featured products!", err);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="mt-8 px-4 sm:px-6 lg:px-12 xl:px-20">
      <h2 className="text-center text-2xl font-bold mb-6">
        Sản phẩm nổi bật
      </h2>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {featuredProduct.length > 0 
        ? featuredProduct.map(p => <ProductCard info={p.product} />) 
        : <p className="text-center w-full">Không có sản phẩm nào.</p>}
      </div>
    </div>
  );
};

export default FeaturedProduct;
