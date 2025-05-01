import { createProduct, getProductById, updateProduct } from "@/services/productService";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const ProductFormModal = ({ isOpen, onClose, productId, categories, onSuccess }) => {
  const isEditing = !!productId;

  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    availableQuantity: "",
    category: "",
    image: null,
    imageUrl: "", // để lưu ảnh hiện tại khi chỉnh sửa
  });

  const [imagePreview, setImagePreview] = useState("");

  useEffect(() => {
    if (isEditing) {
      const getProductDetail = async () => {
        const { name, description, availableQuantity, price, imageUrl, categoryId } = await getProductById(productId);
        setProduct({ name, description, availableQuantity, price, imageUrl, category: categoryId });
      }
      getProductDetail();
    } else {
      setProduct({
        name: "",
        description: "",
        price: "",
        availableQuantity: "",
        category: "",
        image: null,
        imageUrl: "",
      });
      setImagePreview("");
    }
  }, [isEditing, productId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProduct((prev) => ({ ...prev, image: file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isEditing) {
      console.log("Cập nhật sản phẩm:", product);
      try {
        await updateProduct(
          productId,
          {
            name: product.name,
            description: product.description,
            price: product.price,
            categoryId: product.category,
            availableQuantity: product.availableQuantity,
          },
          product.image
        );
        toast.success("Cập nhật thành công!");
      }
      catch (error) {
        toast.error("Có lỗi xảy ra, vui lòng thử lại!");
        console.error(error);
      }
    }
    else {
      console.log("Tạo sản phẩm mới:", product);
      try {
        await createProduct(
          {
            name: product.name,
            description: product.description,
            price: product.price,
            categoryId: product.category,
            availableQuantity: product.availableQuantity,
          },
          product.image);
        toast.success("Thêm sản phẩm thành công!");
      }
      catch (error) {
        toast.error("Có lỗi xảy ra, vui lòng thử lại!");
        console.error(error);
      }
    }

    setProduct({
      name: "",
      description: "",
      price: "",
      availableQuantity: "",
      category: "",
      image: null,
      imageUrl: "", // để lưu ảnh hiện tại khi chỉnh sửa
    });
    setImagePreview("");
    onSuccess();

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-muted bg-opacity-50 z-50 flex items-start justify-center overflow-auto">
      <div className="bg-white w-full max-w-xl rounded-lg shadow-lg p-6 relative">
        <h2 className="text-xl font-bold mb-4">
          {isEditing ? "Chỉnh sửa sản phẩm" : "Thêm sản phẩm mới"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium mb-1">Tên sản phẩm</label>
            <input
              type="text"
              name="name"
              value={product.name}
              onChange={handleChange}
              required
              className="w-full border rounded p-2"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Mô tả</label>
            <textarea
              name="description"
              value={product.description}
              onChange={handleChange}
              className="w-full border rounded p-2"
              rows={6}
            />
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block font-medium mb-1">Giá</label>
              <input
                type="number"
                name="price"
                value={product.price}
                onChange={handleChange}
                min={1000}
                required
                className="w-full border rounded p-2"
              />
            </div>
            <div className="flex-1">
              <label className="block font-medium mb-1">Tồn kho</label>
              <input
                type="number"
                name="availableQuantity"
                value={product.availableQuantity}
                onChange={handleChange}
                required
                min={0}
                className="w-full border rounded p-2"
              />
            </div>
          </div>

          <div>
            <label className="block font-medium mb-1">Danh mục</label>
            <select
              name="category"
              value={product.category}
              onChange={(e) => setProduct({ ...product, category: e.target.value })}
              required
              className="w-full border rounded p-2"
            >
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-medium mb-1">Ảnh sản phẩm</label>
            <input
              type="file"
              accept="image/*"
              onClick={(e) => (e.target.value = null)} 
              onChange={handleImageChange}
              className="w-full"
            />

            {(imagePreview || (isEditing && product.imageUrl && !product.image)) && (
              <div className="mt-2">
                <img
                  src={imagePreview || product.imageUrl}
                  alt="Preview"
                  className="w-32 h-32 object-cover border"
                />
                <button
                  type="button"
                  onClick={() => {
                    setProduct((prev) => ({ ...prev, image: null }));
                    setImagePreview("");
                  }}
                  className="mt-2 text-sm text-red-500 underline"
                >
                  Xoá ảnh
                </button>
              </div>
            )}
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={() => {
                setProduct({
                  name: "",
                  description: "",
                  price: "",
                  availableQuantity: "",
                  category: "",
                  image: null,
                  imageUrl: "", // để lưu ảnh hiện tại khi chỉnh sửa
                });
                setImagePreview("");
                onClose();
              }}
              className="px-4 py-2 border rounded hover:bg-gray-100"
            >
              Đóng
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[var(--primary-color)] text-white rounded hover:opacity-90"
            >
              {isEditing ? "Lưu thay đổi" : "Tạo mới"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductFormModal;