import { useEffect, useState, useRef } from "react";
import { searchByName } from "@/services/productService";
import { Button } from "@/components/ui/button";

const CreateFeaturedProductModal = ({ onClose, onSave }) => {
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const dropdownRef = useRef();

  // Debounced search
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (searchTerm.trim()) {
        fetchSearch(0, true);
      } else {
        setSearchResults([]);
        setHasMore(false);
      }
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [searchTerm]);

  const fetchSearch = async (pageNumber = 0, replace = false) => {
    try {
      setLoading(true);
      const res = await searchByName(searchTerm, pageNumber, 5);
      const content = res.content;
      setSearchResults(prev =>
        replace ? content : [...prev, ...content]
      );
      setHasMore(res.page.number < res.page.totalPages - 1);
      setPage(pageNumber);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (product) => {
    setSelectedProduct(product);
    setSearchTerm(product.name);
    setSearchResults([]);
  };

  const handleSubmit = () => {
    if (!selectedProduct) return;
    onSave({
      productId: selectedProduct.id,
      description,
      startDate,
      endDate,
    });
    onClose();
  };

  const handleLoadMore = () => {
    fetchSearch(page + 1);
  };

  return (
    <div className="fixed inset-0 bg-muted bg-opacity-40 z-50 flex justify-center items-center">
      <div className="bg-white rounded-xl w-full max-w-xl p-6 relative">
        <h2 className="text-xl font-semibold mb-4">Thêm sản phẩm nổi bật</h2>

        <div className="mb-4 relative">
          <label className="block font-medium mb-1">Chọn sản phẩm</label>
          <input
            type="text"
            className="w-full border rounded p-2"
            placeholder="Tìm theo tên sản phẩm..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setSelectedProduct(null);
            }}
          />
          {searchResults.length > 0 && !selectedProduct && (
            <ul
              ref={dropdownRef}
              className="absolute z-50 w-full bg-white shadow-md rounded mt-1 max-h-64 overflow-auto border"
            >
              {searchResults.map((item) => (
                <li
                  key={item.id}
                  className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleSelect(item)}
                >
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-10 h-10 object-cover rounded"
                  />
                  <span className="text-sm">{item.name}</span>
                </li>
              ))}
              {hasMore && (
                <li
                  className="text-center text-sm text-blue-600 py-2 cursor-pointer hover:underline"
                  onClick={handleLoadMore}
                >
                  Xem thêm...
                </li>
              )}
            </ul>
          )}
        </div>

        <div className="space-y-4">
          <div>
            <label className="block font-medium mb-1">Mô tả</label>
            <textarea
              className="w-full border rounded p-2"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Ngày bắt đầu</label>
            <input
              type="date"
              className="w-full border rounded p-2"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Ngày kết thúc</label>
            <input
              type="date"
              className="w-full border rounded p-2"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <Button variant="outline" onClick={onClose}>
            Hủy
          </Button>
          <Button
            className="bg-[var(--primary-color)] hover:opacity-80"
            onClick={handleSubmit}
            disabled={!selectedProduct}
          >
            Lưu
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateFeaturedProductModal;
