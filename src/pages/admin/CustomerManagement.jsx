import CustomPagination from "@/components/CustomPagination";
import { getActiveUsers, getInactiveUsers, toggleUserStatus } from "@/services/adminService";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const CustomerManagement = () => {
  const [users, setUsers] = useState(null);
  const [loading, setLoading] = useState(false);
  const [statusFilter, setStatusFilter] = useState("active");
  const [page, setPage] = useState(1);
  const [size] = useState(10);

  const fetchData = async () => {
    setLoading(true);
    try {
      const data =
        statusFilter === "active"
          ? await getActiveUsers(page - 1, size)
          : await getInactiveUsers(page - 1, size);
      setUsers(data);
    } catch (error) {
      toast.error("Không thể tải dữ liệu người dùng");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [statusFilter, page]);

  const handleToggleStatus = async (email) => {
    try {
      console.log(email);
      await toggleUserStatus(email);
      toast.success("Trạng thái người dùng đã được cập nhật");
      fetchData();
    } catch (error) {
      toast.error(error.message || "Cập nhật trạng thái thất bại");
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Quản lý khách hàng</h2>
      </div>

      <div className="flex flex-wrap justify-between items-center gap-6 mb-4">
        <div>
          <label className="mr-4 font-medium">Trạng thái:</label>
          <label className="mr-4">
            <input
              type="radio"
              value="active"
              checked={statusFilter === "active"}
              onChange={() => {
                setStatusFilter("active");
                setPage(1);
              }}
              className="mr-1"
            />
            Hoạt động
          </label>
          <label>
            <input
              type="radio"
              value="inactive"
              checked={statusFilter === "inactive"}
              onChange={() => {
                setStatusFilter("inactive");
                setPage(1);
              }}
              className="mr-1"
            />
            Bị chặn
          </label>
        </div>
      </div>

      <div className="bg-white p-4 shadow rounded-lg">
        {loading ? (
          <p>Đang tải...</p>
        ) : (
          <table className="min-w-full border border-gray-300">
            <thead>
              <tr className="bg-gray-100 text-center">
                <th className="p-2 border">Email</th>
                <th className="p-2 border">Họ</th>
                <th className="p-2 border">Tên</th>
                <th className="p-2 border">Số điện thoại</th>
                <th className="p-2 border">Trạng thái</th>
                <th className="p-2 border">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {users?.content.length > 0 ? users?.content.map((user) => (
                <tr key={user.email} className="hover:bg-gray-50 text-center">
                  <td className="p-2 border">{user.email}</td>
                  <td className="p-2 border">{user.userProfile.lastName}</td>
                  <td className="p-2 border">{user.userProfile.firstName}</td>
                  <td className="p-2 border">{user.userProfile.phoneNumber}</td>
                  <td className="p-2 border">
                    <span
                      className={`px-3 py-1 rounded-full text-white ${user.active ? "bg-green-500" : "bg-red-500"
                        }`}
                    >
                      {user.active ? "Hoạt động" : "Đã chặn"}
                    </span>
                  </td>
                  <td className="p-2 border">
                    <button
                      onClick={() => handleToggleStatus(user.email)}
                      className={`px-3 py-1 rounded-full text-white cursor-pointer ${user.active
                        ? "bg-red-500 hover:bg-red-600"
                        : "bg-green-500 hover:bg-green-600"
                        }`}
                    >
                      {user.active ? "Chặn" : "Bỏ chặn"}
                    </button>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="6" className="p-4 text-center text-gray-500">
                    Không có người dùng nào.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}

        {users?.page.totalPages > 1 && (
          <div className="mt-4 flex justify-center">
            <CustomPagination
              page={page}
              totalPages={users.page.totalPages}
              onPageChange={setPage}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerManagement;
