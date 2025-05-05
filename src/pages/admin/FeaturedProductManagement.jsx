import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { addFeaturedProduct, deleteFeatureProduct, getActiveFeaturedProduct } from "@/services/productService";
import ProductDetailModal from "@/components/admin/ProductDetailModal";
import UpdateFeaturedProductModal from "@/components/admin/UpdateFeaturedProductModal";
import { toast } from "sonner";
import CreateFeaturedProductModal from "@/components/admin/CreateFeaturedProductModal";

const FeaturedProductManagement = () => {
  const [featuredProducts, setFeaturedProducts] = useState(null);
  const [page, setPage] = useState(1);
  const [size] = useState(10);
  const [isDetailModalOpen, setDetailModalOpen] = useState(false);
  const [detailProductId, setDetailProductId] = useState(null);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [editProduct, setEditProduct] = useState(null);

  const fetchData = async () => {
    try {
      const data = await getActiveFeaturedProduct(page - 1, size);
      setFeaturedProducts(data);
    }
    catch (error) {
      toast.error("Không thể lấy dữ liệu!");
    }
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  const handleDelete = async (id) => {
    try {
      await deleteFeatureProduct(id);
      toast.success("Thao tác thành công!");
      fetchData();
    }
    catch (error) {
      toast.error("Xóa không thành công!");
    }
  };

  const handleAddingFeaturedProduct = async (data) => {
    try {
      await addFeaturedProduct(data);
      toast.success("Thêm thành công!");
      setCreateModalOpen(false);
      fetchData();
    }
    catch (error) {
      toast.error("Thêm thất bại!");
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Sản phẩm nổi bật</h1>
        <Button className='bg-[var(--primary-color)] hover:opacity-80 hover:bg-[var(--primary-color)] cursor-pointer' onClick={() => setCreateModalOpen(true)}>
          + Thêm sản phẩm nổi bật
        </Button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 bg-white">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2 text-center">Sản phẩm</th>
              <th className="border px-4 py-2 text-center">Hình ảnh</th>
              <th className="border px-4 py-2 text-center">Mô tả</th>
              <th className="border px-4 py-2 text-center">Ngày bắt đầu</th>
              <th className="border px-4 py-2 text-center">Ngày kết thúc</th>
              <th className="border px-4 py-2 text-center">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {featuredProducts?.content?.length > 0 ? featuredProducts.content.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="border px-4 py-2 max-w-[200px] truncate text-center">{item.product.name}</td>
                <td className="border px-4 py-2">
                  <img
                    src={item.product.imageUrl}
                    alt={item.product.name}
                    className="w-16 h-16 object-contain mx-auto"
                  />
                </td>
                <td className="border px-4 py-2 text-center">{item.description}</td>
                <td className="border px-4 py-2 text-center">
                  {item.startDate}
                </td>
                <td className="border px-4 py-2 text-center">
                  {item.endDate}
                </td>
                <td className="border px-4 py-2">
                  <div className="flex gap-2 justify-center ">
                    <button
                      onClick={() => {
                        setDetailModalOpen(true);
                        setDetailProductId(item.product.id);
                      }}
                      className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer"
                    >
                      Xem
                    </button>
                    <button
                      onClick={() => {
                        setEditProduct(item);
                        setEditModalOpen(true);
                      }}
                      className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 cursor-pointer"
                    >
                      Chỉnh sửa
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className={`px-3 py-1 rounded text-white cursor-pointer bg-red-500 hover:bg-red-600`}
                    >
                      Xóa
                    </button>
                  </div>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan="6" className="p-4 text-center text-gray-500">
                  Không có sản phẩm nào.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {featuredProducts?.page.totalPages > 1 && (
          <div className="mt-4 flex justify-center">
            <CustomPagination
              page={page}
              totalPages={featuredProducts.page.totalPages}
              onPageChange={setPage}
            />
          </div>
        )}
      </div>

      {
        isCreateModalOpen && <CreateFeaturedProductModal
          onClose={() => setCreateModalOpen(false)}
          productId={detailProductId}
          onSave={handleAddingFeaturedProduct}
        />
      }

      {
        isDetailModalOpen && <ProductDetailModal
          onClose={() => setDetailModalOpen(false)}
        />
      }

      {isEditModalOpen && (
        <UpdateFeaturedProductModal
          product={editProduct}
          onClose={() => setEditModalOpen(false)}
          onSave={fetchData}
        />
      )}
    </div>
  );
};

export default FeaturedProductManagement;
