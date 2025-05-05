import { useState } from "react";
import RatingStars from "./RatingStars";
import { FaCartPlus } from "react-icons/fa";
import { formatCurrency } from "@/utils/formatCurrency";


const ProductInfo = ({product, reviewStatistic}) => {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap -mx-4">
          <div className="w-full md:w-1/2 px-4 mb-8 ">
            <img src={product.imageUrl} alt="Product"
              className="bg-white w-full max-w-[720px] h-[480px] object-contain rounded-lg shadow-md mb-4 mx-auto" id="mainImage" />
          </div>

          <div className="w-full md:w-1/2 px-4">
            <h2 className="text-3xl font-bold mb-2">{product.name}</h2>
            <div className="mb-4">
              <span className="text-2xl font-bold mr-2 text-red-500">{formatCurrency(product.price)}</span>
            </div>
            <div className="flex items-center mb-4">
              <RatingStars rating={reviewStatistic.averageRating} />
              <span className="ml-2 text-gray-600">
                {reviewStatistic.averageRating}/5 ({reviewStatistic.count} đánh giá) 
              </span>
            </div>
            <p className="text-gray-700 mb-6">
              {product.description}
            </p>
            <div className="mb-6">
              <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">Quantity:</label>
              <input type="number" id="quantity" name="quantity" min="1" value={quantity} onChange={e => setQuantity(e.target.value)}
                className="w-12 text-center rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
            </div>
            <div className="flex space-x-4 mb-6">
              <button
                className="bg-[var(--primary-color)] flex gap-2 items-center text-white px-6 py-2 rounded-md cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 hover:opacity-70">
                <FaCartPlus />
                Thêm vào giỏ hàng
              </button>
              <button
                className="bg-gray-200 flex gap-2 items-center  text-gray-800 px-6 py-2 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                  strokeWidth="1.5" stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                </svg>
                Yêu thích
              </button>
            </div>


          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductInfo