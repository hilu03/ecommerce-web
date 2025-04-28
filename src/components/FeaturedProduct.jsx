import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { getActiveFeaturedProduct } from "@/services/productService";

const FeaturedProduct = () => {
  const [featuredProduct, setFeaturedProduct] = useState([]);
  const [page, setPage] = useState(0);
  const [isLastPage, setIsLastPage] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getActiveFeaturedProduct(page);
        setFeaturedProduct(data.content);
        if (data.page.number === data.page.totalPages - 1) {
          setIsLastPage(true);
        }
      } catch (err) {
        console.error("Cannot load featured products!", err);
      }
    }

    fetchData();
  }, [page]);

  return (
    <div className="mt-8 px-4 sm:px-6 lg:px-12 xl:px-20">
      <h2 className="text-center text-2xl font-bold mb-6">
        Sản phẩm nổi bật
      </h2>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {featuredProduct.length > 0
          ? featuredProduct.map(p => <ProductCard key={p.product.id} info={p.product} />)
          : <p className="text-center w-full">Không có sản phẩm nào.</p>}
      </div>
      {!isLastPage && (
        <div className="mt-6 text-center">
          <button
            type="button"
            className="mb-2 me-2 rounded-lg border bg-[var(--primary-color)] border-gray-200 px-5 py-2.5 text-sm font-medium text-white hover:bg-white hover:text-[var(--primary-color)] hover:border-[var(--primary-color)] cursor-pointer"
            onClick={() => {
              setPage(page + 1);
            }}
          >
            Xem thêm
          </button>
        </div>
      )}
    </div>
  );
};

export default FeaturedProduct;
