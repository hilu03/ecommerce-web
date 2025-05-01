import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Mock data cho người dùng
  const mockData = [
    { id: 1, email: "john.doe@example.com", firstName: "John", lastName: "Doe", phone: "0123456789", status: "active" },
    { id: 2, email: "jane.smith@example.com", firstName: "Jane", lastName: "Smith", phone: "0987654321", status: "blocked" },
    { id: 3, email: "alice.jones@example.com", firstName: "Alice", lastName: "Jones", phone: "0912345678", status: "active" },
    { id: 4, email: "bob.brown@example.com", firstName: "Bob", lastName: "Brown", phone: "0933456789", status: "blocked" },
  ];

  const fetchData = () => {
    setLoading(true);
    try {
      setUsers(mockData); // Gán dữ liệu mock vào state
    } catch (error) {
      toast.error("Không thể tải dữ liệu người dùng");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Hàm toggle trạng thái người dùng
  const handleToggleStatus = (id) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === id
          ? {
              ...user,
              status: user.status === "active" ? "blocked" : "active", // Toggle trạng thái
            }
          : user
      )
    );
    toast.success("Trạng thái người dùng đã được cập nhật");
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Quản lý người dùng</h2>
      </div>

      {/* Table */}
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
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 text-center">
                  <td className="p-2 border">{user.email}</td>
                  <td className="p-2 border">{user.firstName}</td>
                  <td className="p-2 border">{user.lastName}</td>
                  <td className="p-2 border">{user.phone}</td>
                  <td className="p-2 border">
                    <span
                      className={`px-3 py-1 rounded-full text-white ${
                        user.status === "active" ? "bg-green-500" : "bg-red-500"
                      }`}
                    >
                      {user.status === "active" ? "Hoạt động" : "Đã chặn"}
                    </span>
                  </td>
                  <td className="p-2 border">
                    <button
                      onClick={() => handleToggleStatus(user.id)} // Toggle trạng thái
                      className={`px-3 py-1 rounded-full text-white cursor-pointer ${
                        user.status === "active"
                          ? "bg-red-500 hover:bg-red-600"
                          : "bg-green-500 hover:bg-green-600"
                      }`}
                    >
                      {user.status === "active" ? "Chặn" : "Bỏ chặn"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default UserManagement;
