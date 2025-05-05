import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  createCategory,
  getActiveCategories,
  getDeletedCategories,
  updateCategory,
  toggleCategory,
} from "@/services/categoryService"; // Giả sử các API này được tách riêng

const CategoryManagement = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [editingCategory, setEditingCategory] = useState(null);
  const [editName, setEditName] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [showModal, setShowModal] = useState(false);

  const [filter, setFilter] = useState("active"); // "active" hoặc "deleted"
  const [loading, setLoading] = useState(false);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const data =
        filter === "active"
          ? await getActiveCategories()
          : await getDeletedCategories();
      setCategories(data);
    } catch (err) {
      console.error("Không thể load danh mục", err);
      toast.error("Tải danh mục thất bại");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [filter]);

  const handleAddCategory = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    try {
      const newCategory = await createCategory({ name, description });
      setCategories((prev) => [...prev, newCategory]);
      setName("");
      setDescription("");
      toast.success("Thêm danh mục thành công!");
    } catch (error) {
      toast.error("Không thể thêm danh mục. Tên có thể đã tồn tại!");
    }
  };

  const handleToggle = async (id) => {
    try {
      await toggleCategory(id);
      toast.success("Cập nhật trạng thái thành công");
      fetchCategories(); // Tải lại danh sách sau khi toggle
    } catch (err) {
      toast.error("Không thể thay đổi trạng thái danh mục!");
    }
  };

  const handleEditClick = (category) => {
    setEditingCategory(category);
    setEditName(category.name);
    setEditDescription(category.description);
    setShowModal(true);
  };

  const handleSaveEdit = async () => {
    if (!editName.trim()) return;
    try {
      await updateCategory(editingCategory.id, {
        name: editName,
        description: editDescription,
      });

      toast.success("Cập nhật thành công");
      setShowModal(false);
      setEditingCategory(null);
      fetchCategories();
    } catch (error) {
      toast.error("Không thể cập nhật danh mục!");
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingCategory(null);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Quản lý danh mục</h2>

      {/* Form thêm danh mục */}
      <form
        onSubmit={handleAddCategory}
        className="bg-white p-6 rounded shadow-md mb-8"
      >
        <div className="mb-4">
          <label className="block mb-2 font-semibold">Tên danh mục</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Nhập tên danh mục"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-semibold">Mô tả</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border rounded resize-none"
            placeholder="Nhập mô tả danh mục"
            rows="4"
          />
        </div>

        <button
          type="submit"
          className="bg-[var(--primary-color)] text-white px-4 py-2 rounded hover:opacity-80"
        >
          Thêm danh mục
        </button>
      </form>

      {/* Bộ lọc */}
      <div className="mb-6">
        <label className="mr-2 font-medium">Hiển thị:</label>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="p-2 border rounded border-[var(--primary-color)]"
        >
          <option value="active">Danh mục đang hoạt động</option>
          <option value="deleted">Danh mục đã ẩn</option>
        </select>
      </div>

      {/* Danh sách danh mục */}
      <div className="bg-white p-6 rounded shadow-md">
        <h3 className="text-xl font-semibold mb-4">Danh sách danh mục</h3>
        {loading ? (
          <p>Đang tải...</p>
        ) : categories.length === 0 ? (
          <p className="text-gray-500">Không có danh mục nào.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full table-auto text-left">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-2 border">#</th>
                  <th className="p-2 border">Tên</th>
                  <th className="p-2 border">Mô tả</th>
                  <th className="p-2 border">Trạng thái</th>
                  <th className="p-2 border">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((cat, index) => (
                  <tr key={cat.id} className="hover:bg-gray-50">
                    <td className="p-2 border">{index + 1}</td>
                    <td className="p-2 border">{cat.name}</td>
                    <td className="p-2 border">{cat.description}</td>
                    <td className="p-2 border">
                      <span className={!cat.deleted ? "text-green-600" : "text-red-500"}>
                        {!cat.deleted ? "Hiện" : "Ẩn"}
                      </span>
                    </td>
                    <td className="p-2 border space-x-2">
                      <button
                        onClick={() => handleEditClick(cat)}
                        className="bg-blue-500 text-white px-3 py-1 rounded hover:opacity-80"
                      >
                        Sửa
                      </button>
                      <button
                        onClick={() => handleToggle(cat.id)}
                        className={`px-3 py-1 rounded text-white ${!cat.deleted ? "bg-yellow-500" : "bg-green-500"
                          } hover:opacity-80`}
                      >
                        {!cat.deleted ? "Ẩn" : "Hiện"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal chỉnh sửa */}
      {showModal && (
        <div className="fixed inset-0 bg-muted bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded shadow-lg w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">Chỉnh sửa danh mục</h3>

            <div className="mb-4">
              <label className="block mb-2 font-semibold">Tên danh mục</label>
              <input
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className="w-full p-2 border rounded"
                required
              />
            </div>

            <div className="mb-6">
              <label className="block mb-2 font-semibold">Mô tả</label>
              <textarea
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                className="w-full p-2 border rounded resize-none"
                rows="4"
              />
            </div>

            <div className="flex justify-end space-x-3">
              <button
                onClick={handleCloseModal}
                className="bg-red-500 text-white px-4 py-2 rounded hover:opacity-80"
              >
                Hủy
              </button>
              <button
                onClick={handleSaveEdit}
                className="bg-[var(--primary-color)] text-white px-4 py-2 rounded hover:opacity-80"
              >
                Lưu
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryManagement;
