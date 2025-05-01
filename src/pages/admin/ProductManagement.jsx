import { useEffect, useState } from "react";
import { formatCurrency } from "@/utils/formatCurrency";
import ProductFormModal from "@/components/admin/ProductFormModal";
import { getAllActiveProducts, getAllHiddenProducts, getActiveProductByCategoryId, toggleProductStatus, getHiddenProductByCategoryId } from "@/services/productService";
import { getActiveCategories } from "@/services/categoryService";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination";
import ProductDetailModal from "@/components/admin/ProductDetailModal";

const ProductManagement = () => {
  const [statusFilter, setStatusFilter] = useState("active");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [isModalOpen, setModalOpen] = useState(false);
  const [isDetailModalOpen, setDetailModalOpen] = useState(false);
  const [detailProductId, setDetailProductId] = useState(null);
  const [editingProductId, setEditingProductId] = useState(null);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState(null);
  const [page, setPage] = useState(1);
  const [size] = useState(10);

  const handleOpenModal = () => {
    setEditingProductId(null);
    setModalOpen(true);
  };

  const handleEdit = (productId) => {
    setEditingProductId(productId);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setEditingProductId(null);
  };

  const handleToggle = async (productId) => {
    try {
      const updatedProduct = await toggleProductStatus(productId);
      setProducts((prevProducts) => ({
        ...prevProducts,
        content: prevProducts.content.map((product) =>
          product.id === productId ? { ...product, deleted: !product.deleted } : product
        ),
      }));
    } catch (err) {
      console.error("Lỗi khi thay đổi trạng thái sản phẩm:", err);
    }
  };

  const fetchProducts = async () => {
    try {
      const data = await getAllActiveProducts(page - 1, size);
      setProducts(data);
    } catch (err) {
      console.error("Lỗi khi tải sản phẩm:", err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoryData, productsData] = await Promise.all([
          getActiveCategories(),
          getAllActiveProducts(page - 1, size),
        ]);
        setCategories(categoryData);
        setProducts(productsData);
      } catch (err) {
        console.error("Lỗi khi tải sản phẩm hoặc danh mục:", err);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (categoryFilter === "all") {
          if (statusFilter === "active") {
            const data = await getAllActiveProducts(page - 1, size);
            setProducts(data);
          }
          else {
            const data = await getAllHiddenProducts(page - 1, size);
            setProducts(data);
          }
        }
        else {
          if (statusFilter === "active") {
            const data = await getActiveProductByCategoryId(categoryFilter, page - 1, size);
            setProducts(data);
          }
          else {
            const data = await getHiddenProductByCategoryId(categoryFilter, page - 1, size);
            setProducts(data);
          }
        }
      }
      catch (err) {
        console.error("Lỗi khi tải sản phẩm hoặc danh mục:", err);
      }
    };

    fetchData();
  }, [categoryFilter, statusFilter, page]);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Quản lý sản phẩm</h2>
        <button
          onClick={handleOpenModal}
          className="bg-[var(--primary-color)] text-white px-4 py-2 rounded hover:opacity-80 cursor-pointer"
        >
          + Thêm sản phẩm
        </button>
      </div>

      {/* Bộ lọc */}
      <div className="flex flex-wrap justify-between items-center gap-6 mb-4">
        <div>
          <label className="mr-2 font-medium">Danh mục:</label>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="p-2 border rounded border-[var(--primary-color)]"
          >
            <option value="all">Tất cả</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mr-4 font-medium">Trạng thái:</label>
          <label className="mr-4">
            <input
              type="radio"
              value="active"
              checked={statusFilter === "active"}
              onChange={() => setStatusFilter("active")}
              className="mr-1"
            />
            Hoạt động
          </label>
          <label>
            <input
              type="radio"
              value="inactive"
              checked={statusFilter === "inactive"}
              onChange={() => setStatusFilter("inactive")}
              className="mr-1"
            />
            Đã ẩn
          </label>
        </div>
      </div>

      {/* Bảng sản phẩm */}
      <div className="bg-white p-4 shadow rounded-lg">
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-100 text-center">
              <th className="p-2 border">Tên sản phẩm</th>
              <th className="p-2 border">Hình ảnh</th>
              <th className="p-2 border">Tồn kho</th>
              <th className="p-2 border">Giá</th>
              <th className="p-2 border">Danh mục</th>
              <th className="p-2 border">Trạng thái</th>
              <th className="p-2 border">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {products?.content?.length > 0 ? (
              products.content.map((product) => (
                <tr key={product.id} className="text-center hover:bg-gray-50">
                  <td className="p-2 border text-left">{product.name}</td>
                  <td className="p-2 border">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-16 h-16 object-contain mx-auto"
                    />
                  </td>
                  <td className="p-2 border">{product.availableQuantity}</td>
                  <td className="p-2 border">{formatCurrency(product.price)}</td>
                  <td className="p-2 border">{product.categoryName}</td>
                  <td className="p-2 border">
                    <span
                      className={`px-3 py-1 rounded text-white text-center text-sm ${!product.deleted ? "bg-green-500" : "bg-red-500"
                        }`}
                    >
                      {!product.deleted ? "Hoạt động" : "Đã ẩn"}
                    </span>
                  </td>
                  <td className="p-2 border">
                    <div className="flex gap-2 justify-center ">
                      <button
                        onClick={() => {
                          setDetailModalOpen(true);
                          setDetailProductId(product.id);
                        }}
                        className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer"
                      >
                        Xem
                      </button>
                      <button
                        onClick={() => handleEdit(product.id)}
                        className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 cursor-pointer"
                      >
                        Chỉnh sửa
                      </button>
                      <button
                        onClick={() => handleToggle(product.id)}
                        className={`px-3 py-1 rounded text-white cursor-pointer ${!product.deleted
                          ? "bg-red-500 hover:bg-red-600"
                          : "bg-green-500 hover:bg-green-600"
                          }`}
                      >
                        {!product.deleted ? "Ẩn" : "Hiện"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="p-4 text-center text-gray-500">
                  Không có sản phẩm nào.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {products?.page.totalPages > 1 && (
          <div className="mt-4 flex justify-center">
            <Pagination>
              <PaginationContent>
                {/* Previous Button */}
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                    className={page === 1 ? "pointer-events-none opacity-50" : ""}
                  >
                    Previous
                  </PaginationPrevious>
                </PaginationItem>

                {/* Numbered Pagination */}
                {Array.from(
                  { length: Math.min(5, products.page.totalPages) }, // Show up to 5 pages
                  (_, index) => {
                    const startPage = Math.max(1, page - 2); // Start from 2 pages before the current page
                    const pageNumber = startPage + index; // Calculate the page number dynamically
                    if (pageNumber > products.page.totalPages) return null; // Avoid rendering invalid pages
                    return (
                      <PaginationItem key={pageNumber}>
                        <button
                          onClick={() => setPage(pageNumber)}
                          className={`px-3 py-1 border rounded ${page === pageNumber
                            ? "bg-blue-500 text-white"
                            : "bg-white text-gray-700"
                            }`}
                        >
                          {pageNumber}
                        </button>
                      </PaginationItem>
                    );
                  }
                )}

                {/* Next Button */}
                <PaginationItem>
                  <PaginationNext
                    onClick={() =>
                      setPage((prev) => Math.min(prev + 1, products.page.totalPages))
                    }
                    className={
                      page === products.page.totalPages
                        ? "pointer-events-none opacity-50"
                        : ""
                    }
                  >
                    Next
                  </PaginationNext>
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}

      </div>

      <ProductFormModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        productId={editingProductId}
        categories={categories}
        onSuccess={fetchProducts}
      />

      {
        isDetailModalOpen && <ProductDetailModal
          onClose={() => setDetailModalOpen(false)}
          productId={detailProductId}
        />
      }

    </div>
  );
};

export default ProductManagement;