import { getActiveCategories, getCategoryById } from "@/services/categoryService";
import { getAllActiveProducts, getActiveProductByCategoryId } from "@/services/productService";
import { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import CategorySidebar from "@/components/CategorySidebar";
import ProductCard from "@/components/ProductCard";
import { Pagination } from "@/components/ui/pagination";

const ProductByCategory = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [category, setCategory] = useState(null);
  const [categories, setCategories] = useState(null);
  const [products, setProducts] = useState({
    content: [],
    page: {
      number: 0,
      totalPages: 1,
    },
  });
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const fetchCategoryById = async () => {
      try {
        setLoading(true);
        if (id === undefined) {
          setCategory({ name: "Tất cả sản phẩm", description: null});
        }
        else {
          const categoryInfo = await getCategoryById(id);
          setCategory(categoryInfo);
        }
      } catch (error) {
        console.error("Error fetching category:", error.message);
      } finally {
        setLoading(false);
      }
    };

    const fetchAllCategories = async () => {
      try {
        const data = await getActiveCategories();
        setCategories(data);
      } catch (err) {
        console.error("Không thể load danh mục", err);
      }
    };

    const fetchProductByCategoryId = async (page, size) => {
      try {
        if (id === undefined) {
          const data = await getAllActiveProducts(page, size); // API lấy tất cả sản phẩm
          setProducts(data);
          console.log(products);
        }
        else {
          const data = await getActiveProductByCategoryId(id, page, size);
          setProducts(data);
        }
      } catch (err) {
        console.error("Không thể load sản phẩm", err);
      }
    };

    const queryParams = new URLSearchParams(location.search);
    let pageParam = parseInt(queryParams.get("page") || "1", 10); // Mặc định page=1
    let page = pageParam - 1; // Backend tính từ 0

    if (isNaN(pageParam) || pageParam < 1) {
      page = 0; // Nếu người dùng nhập bậy
      navigate(`?page=1`, { replace: true });
      return;
    }

    if (page >= products.page.totalPages && products.page.totalPages > 0) {
      page = products.page.totalPages - 1;
      navigate(`?page=${products.page.totalPages}`, { replace: true });
      return;
    }

    setCurrentPage(page);
    fetchCategoryById();
    fetchAllCategories();
    fetchProductByCategoryId(page, 12); // size mỗi trang = 12
  }, [id, location.search, products.page.totalPages]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    navigate(`?page=${page + 1}`); // +1 để hiện đúng trên URL
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-50">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <div className="md:w-1/4 w-full">
          <CategorySidebar categories={categories} />
        </div>

        {/* Content */}
        <div className="md:w-3/4 w-full">
          <h2 className="font-bold text-2xl mb-1">{category?.name}</h2>
          <p className="italic mb-6">{category?.description}</p>
          <hr className="border-t-2 border-gray-400 my-4" />

          {/* Danh sách sản phẩm */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.content.map((product) => (
              <ProductCard key={product.id} info={product} />
            ))}
          </div>

          {products.content.length === 0 && (
            <p className="text-center w-full">Không có sản phẩm nào.</p>
          )}

          {/* Pagination */}
          {products.page.totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={products.page.totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductByCategory;
