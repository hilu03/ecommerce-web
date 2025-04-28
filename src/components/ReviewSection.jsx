import { useState } from 'react'
import RatingStars from './RatingStars';
import { formatDateTimeVN } from '@/utils/formatDatetime';

const ReviewSection = ({ reviewStatistic, product, reviews }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRating, setSelectedRating] = useState(0);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedRating(0); // Reset khi đóng modal
  };

  const handleRatingClick = (rating) => {
    setSelectedRating(rating);
  };

  return (
    <>
      <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
        <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Đánh giá</h2>
            <div className="mt-2 flex items-center gap-2 sm:mt-0">
              <RatingStars rating={reviewStatistic.averageRating} />
              <p className="text-sm font-medium leading-none text-gray-500 dark:text-gray-400">
                ({reviewStatistic.averageRating})
              </p>
              <p className="text-sm font-medium leading-none text-gray-900 underline hover:no-underline dark:text-white">
                {reviewStatistic.count} đánh giá
              </p>
            </div>
          </div>

          <div className="my-6 gap-8 sm:flex sm:items-start md:my-8">
            <div className="shrink-0 space-y-4">
              <p className="text-2xl font-semibold leading-none text-gray-900 dark:text-white text-center">
                {reviewStatistic.averageRating}/5
              </p>
              <button
                type="button"
                className="mb-2 me-2 rounded-lg bg-[var(--primary-color)] cursor-pointer px-5 py-2.5 text-sm font-medium text-white hover:opacity-70"
                onClick={openModal}
              >
                Viết đánh giá
              </button>
            </div>
            <div className="mt-6 min-w-0 flex-1 space-y-3 sm:mt-0">
              {reviewStatistic.ratingCounts.map(review => (
                <div className="flex items-center gap-2" key={review.rating}>
                  <p className="w-2 shrink-0 text-start text-sm font-medium leading-none text-gray-900 dark:text-white">
                    {review.rating}
                  </p>
                  <svg className="h-4 w-4 shrink-0 text-yellow-300" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                  </svg>
                  <div className="h-1.5 w-80 rounded-full bg-gray-200 dark:bg-gray-700">
                    <div className="h-1.5 rounded-full bg-yellow-300" style={{ width: `${review.percent}%` }} />
                  </div>
                  <a href="#" className="w-8 shrink-0 text-right text-sm font-medium leading-none text-primary-700 hover:underline dark:text-primary-500 sm:w-auto sm:text-left">
                    {review.count} <span className="hidden sm:inline">đánh giá</span>
                  </a>
                </div>
              ))}
            </div>
          </div>

          {reviews.content.map(review => (
            <div className="mt-6 divide-y divide-gray-200 dark:divide-gray-700" key={review.id}>
              <div className="gap-3 pb-6 sm:flex sm:items-start">
                <div className="shrink-0 space-y-2 sm:w-48 md:w-72">
                  <div className="flex items-center gap-0.5">
                    <RatingStars rating={review.rating} />
                  </div>
                  <div className="space-y-0.5">
                    <p className="text-base font-semibold text-gray-900 dark:text-white">
                      {review.customer.lastName} {review.customer.firstName}
                    </p>
                    <p className="text-sm font-normal text-gray-500 dark:text-gray-400">
                      {formatDateTimeVN(review.updatedAt)}
                    </p>
                  </div>
                </div>
                <div className="mt-4 min-w-0 flex-1 space-y-4 sm:mt-0">
                  <p className="text-base font-normal text-gray-500 dark:text-gray-400">
                    {review.comment}
                  </p>
                </div>
              </div>
            </div>
          ))}

          {reviews.page.number !== reviews.page.totalPages - 1 && (
            <div className="mt-6 text-center">
              <button
                type="button"
                className="mb-2 me-2 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 cursor-pointer"
              >
                Xem thêm đánh giá
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Add Review Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-opacity-50">
          <div className="relative w-full max-w-lg p-4">
            <div className="relative rounded-lg bg-white shadow dark:bg-gray-800">
              <div className="flex items-center justify-between rounded-t border-b border-gray-200 p-4 dark:border-gray-700">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Đánh giá sản phẩm:
                  </h3>
                  <p className="font-medium text-primary-700 dark:text-primary-500">
                    {product.name}
                  </p>
                </div>
                <button
                  onClick={closeModal}
                  className="rounded-lg p-2 text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  ✕
                </button>
              </div>

              <div className="p-4 md:p-5">
                {/* Chọn rating */}
                <div className="flex items-center justify-center space-x-1 mb-4">
                  {[1, 2, 3, 4, 5].map(star => (
                    <svg
                      key={star}
                      onClick={() => handleRatingClick(star)}
                      className={`w-8 h-8 cursor-pointer ${
                        star <= selectedRating ? 'text-yellow-400' : 'text-gray-300'
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.204 3.703a1 1 0 00.95.69h3.891c.969 0 1.371 1.24.588 1.81l-3.148 2.292a1 1 0 00-.364 1.118l1.204 3.703c.3.921-.755 1.688-1.54 1.118l-3.148-2.292a1 1 0 00-1.176 0l-3.148 2.292c-.785.57-1.84-.197-1.54-1.118l1.204-3.703a1 1 0 00-.364-1.118L2.707 9.13c-.783-.57-.38-1.81.588-1.81h3.89a1 1 0 00.951-.69l1.204-3.703z" />
                    </svg>
                  ))}
                </div>

                {/* Nội dung đánh giá */}
                <textarea
                  rows="4"
                  className="w-full rounded-lg border border-gray-300 p-2 text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="Chia sẻ trải nghiệm của bạn..."
                />

                {/* Submit button */}
                <div className="mt-4 flex justify-end">
                  <button
                    type="submit"
                    className="rounded-lg bg-[var(--primary-color)] px-5 py-2 text-white hover:opacity-80"
                  >
                    Gửi đánh giá
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
};

export default ReviewSection;
