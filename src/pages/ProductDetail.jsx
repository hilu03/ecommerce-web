import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductInfo from "@/components/ProductInfo";
import { getProductById, getReviewStatisticByProductId } from "@/services/productService";
import { getReviewByProductId } from "@/services/reviewService";
import ReviewSection from "@/components/ReviewSection";

const ProductDetail = () => {
  const { id } = useParams();  // Lấy id từ URL
  const [product, setProduct] = useState(null);
  const [reviewStatistic, setReviewStatistic] = useState(null);
  const [reviews, setReviews] = useState(null);
  const [page, setPage] = useState(0);

  useEffect(() => {
    // Gọi API lấy thông tin sản phẩm
    const fetchProductDetail = async () => {
      try {
        const productData = await getProductById(id);
        setProduct(productData);
      } catch (error) {
        console.error("Error fetching product details:", error.message);
      }
    };

    // Gọi API lấy thông tin review của sản phẩm
    const fetchReviewStatistic = async () => {
      try {
        const reviewData = await getReviewStatisticByProductId(id);
        setReviewStatistic(reviewData);
      } catch (error) {
        console.error("Error fetching product reviews:", error.message);
      }
    };

    const fetchReviewByProductId = async () => {
      try {
        const reviewData = await getReviewByProductId(id, page);
        // console.log(reviewData);
        setReviews(reviewData);
      } catch (error) {
        console.error("Error fetching product reviews:", error.message);
      }
    };

    fetchProductDetail();
    fetchReviewStatistic();
    fetchReviewByProductId();
  }, [id]);  // Gọi lại khi ID thay đổi

  // Đợi dữ liệu tải về
  if (!product || !reviewStatistic || !reviews) return <div>Loading...</div>;

  return (
    <>
    <ProductInfo
      product={{
        ...product,
        rating: reviewStatistic.averageRating,
        reviewCount: reviewStatistic.count,
      }}
    />
    <ReviewSection reviewStatistic={reviewStatistic} product={product} reviews={reviews}/>
    </>
  );
};

export default ProductDetail;
