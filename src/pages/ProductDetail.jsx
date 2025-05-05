import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductInfo from "@/components/ProductInfo";
import ReviewSection from "@/components/ReviewSection";
import { getProductById, getReviewStatisticByProductId } from "@/services/productService";
import { getReviewByProductId } from "@/services/reviewService";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [reviewStatistic, setReviewStatistic] = useState(null);
  const [reviews, setReviews] = useState({ content: [], page: { number: 0, totalPages: 1 } });

  const fetchProduct = async () => {
    try {
      const productData = await getProductById(id);
      setProduct(productData);
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  const fetchReviewStatistic = async () => {
    try {
      const statisticData = await getReviewStatisticByProductId(id);
      setReviewStatistic(statisticData);
    } catch (error) {
      console.error("Error fetching review statistic:", error);
    }
  };

  const fetchReviewByProductId = async (page = 0) => {
    try {
      const reviewPage = await getReviewByProductId(id, page);
      setReviews(prev => ({
        content: page === 0 ? reviewPage.content : [...prev.content, ...reviewPage.content],
        page: reviewPage.page
      }));
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  const handleLoadMore = () => {
    fetchReviewByProductId(reviews.page.number + 1);
  };

  const reloadReviews = async () => {
    await fetchReviewStatistic();
    await fetchReviewByProductId(0);
  };

  useEffect(() => {
    fetchProduct();
    fetchReviewStatistic();
    fetchReviewByProductId(0);
  }, [id]);

  if (!product || !reviewStatistic) return <div>Loading...</div>;

  return (
    <div>
      <ProductInfo product={product} reviewStatistic={reviewStatistic}/>
      <ReviewSection
        product={product}
        reviewStatistic={reviewStatistic}
        reviews={reviews}
        reloadFunction={reloadReviews}
        onLoadMore={handleLoadMore}
      />
    </div>
  );
};

export default ProductDetail;
