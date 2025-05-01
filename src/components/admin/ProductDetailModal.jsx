import { getProductDetailForAdmin } from "@/services/productService";
import { formatCurrency } from "@/utils/formatCurrency";
import { formatDateTimeVN } from "@/utils/formatDatetime";
import { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";

const ProductDetailModal = ({ onClose, productId }) => {
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productData] = await Promise.all([
          getProductDetailForAdmin(productId)
        ]);
        setProduct(productData);
      }
      catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="fixed inset-0 bg-muted bg-opacity-50 z-50 flex items-start justify-center overflow-auto">
      <div className="bg-white w-full max-w-xl rounded-lg shadow-lg p-6 relative">
        <h2 className="text-xl font-bold mb-4">Chi tiết sản phẩm</h2>
        <div className="mb-4">
          <img src={product?.imageUrl} alt={product?.name} className="w-32 h-32 object-cover border" />
        </div>
        <div className="space-y-2">
          <p><strong>Tên sản phẩm:</strong> {product?.name}</p>
          <p><strong>Mô tả:</strong> {product?.description}</p>
          <p><strong>Giá:</strong> {formatCurrency(product?.price)}</p>
          <p><strong>Tồn kho:</strong> {product?.availableQuantity}</p>
          <p><strong>Danh mục:</strong> {product?.categoryName}</p>
          <p><strong>Ngày tạo:</strong> {product && formatDateTimeVN(product.createdAt)}</p>
          <p><strong>Ngày cập nhật:</strong> {product && formatDateTimeVN(product.updatedAt)}</p>
          <p><strong>Người tạo:</strong> {product?.createdBy}</p>
          <p><strong>Người sửa:</strong> {product?.modifiedBy}</p>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Đánh giá sản phẩm</h3>
          <table className="min-w-full table-auto border">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 border text-left">Đánh giá</th>
                <th className="px-4 py-2 border text-left">Bình luận</th>
                <th className="px-4 py-2 border text-left">Ngày cập nhật</th>
                <th className="px-4 py-2 border text-left">Khách hàng</th>
                <th className="px-4 py-2 border text-left">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {reviews && reviews.content.length !== 0 ? reviews.map((review, index) => (
                <tr key={index}>
                  <td className="px-4 py-2 border">{review.rating} sao</td>
                  <td className="px-4 py-2 border">{review.comment}</td>
                  <td className="px-4 py-2 border">{review.updatedAt}</td>
                  <td className="px-4 py-2 border">{review.customer}</td>
                  <td className="px-4 py-2 border">
                    <button

                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 cursor-pointer"
                    >
                      <MdDelete />
                    </button>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="5" className="p-4 text-center text-gray-500">
                    Không có đánh giá nào.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[var(--primary-color)] text-white rounded hover:opacity-90 cursor-pointer"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailModal;
