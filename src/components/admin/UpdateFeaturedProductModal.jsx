import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { updateFeaturedProduct } from "@/services/productService";

const UpdateFeaturedProductModal = ({ onClose, product, onSave }) => {
  const [description, setDescription] = useState(product.description || "");
  const [startDate, setStartDate] = useState(product.startDate || "");
  const [endDate, setEndDate] = useState(product.endDate || "");

  const handleSubmit = async () => {
    try {
      await updateFeaturedProduct(product.id, {
        description,
        startDate,
        endDate
      });
      toast.success("Cập nhật thành công!"); 
      onClose();
      onSave();
    }
    catch (error) {
      toast.error("Không thể cập nhật, vui lòng thử lại!");
    }
  };

  return (
    <div className="fixed inset-0 bg-muted bg-opacity-40 z-50 flex justify-center items-center">
      <div className="bg-white rounded-xl w-full max-w-xl p-6 shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Chỉnh sửa sản phẩm nổi bật</h2>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          className="space-y-4"
        >
          <div>
            <label className="block font-medium mb-1">Mô tả</label>
            <textarea
              className="w-full border rounded p-2"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Ngày bắt đầu</label>
            <input
              type="date"
              className="w-full border rounded p-2"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Ngày kết thúc</label>
            <input
              type="date"
              className="w-full border rounded p-2"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              required
            />
          </div>

          <div className="mt-6 flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={onClose}>
              Hủy
            </Button>
            <Button type="submit" className="bg-[var(--primary-color)] hover:opacity-80">
              Lưu
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateFeaturedProductModal;
