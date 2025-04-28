const AdminDashboard = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Dashboard Overview</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Orders */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Total Orders</h3>
          <p className="text-3xl font-bold text-blue-600">1,240</p>
        </div>

        {/* Products */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Total Products</h3>
          <p className="text-3xl font-bold text-green-600">320</p>
        </div>

        {/* Users */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Total Users</h3>
          <p className="text-3xl font-bold text-purple-600">810</p>
        </div>
      </div>

      {/* Add more analytics here later */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Recent Activities</h3>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>New order placed by user #1032</li>
          <li>User #542 registered an account</li>
          <li>Product "Wireless Mouse" updated</li>
        </ul>
      </div>
    </div>
  );
};

export default AdminDashboard;
