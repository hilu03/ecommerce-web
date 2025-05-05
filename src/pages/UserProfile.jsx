import { useAuth } from '@/context/AuthContext';
import { getMyInfo, updateInfo } from '@/services/userService';
import { useState, useEffect } from 'react';
import { MdCheckCircle, MdError } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
    else {
      const fetchData = async () => {
        const data = await getMyInfo();
        setProfile(data);
      };
  
      fetchData();
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({
      ...prev,
      userProfile: {
        ...prev.userProfile,
        [name]: value,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateInfo(profile.userProfile);
      setErrorMsg('');
      setSuccessMsg('');
      setTimeout(() => {
        setSuccessMsg('Cập nhật thành công!');
      }, 1000);
    }
    catch (error) {
      setErrorMsg("Cập nhật thất bại!"); 
    }
    
  };

  return (
    <div className="max-w-md mx-auto bg-white dark:bg-gray-800 p-6 rounded shadow mt-10">
      <h2 className="text-2xl font-semibold mb-4 text-center">Thông tin cá nhân</h2>

      {errorMsg && (
        <p className="text-red-500 flex items-center gap-2 mb-3">
          <MdError /> {errorMsg}
        </p>
      )}
      {successMsg && (
        <p className="text-green-500 flex items-center gap-2 mb-3">
          <MdCheckCircle /> {successMsg}
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-white">Email</label>
          <input
            type="email"
            name="email"
            value={profile?.email}
            disabled
            className="w-full px-3 py-2 border rounded bg-gray-100 dark:bg-gray-700 text-gray-500"
          />
        </div>

        <div className="flex gap-2">
          <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-700 dark:text-white">Tên</label>
            <input
              type="text"
              name="firstName"
              value={profile?.userProfile.firstName}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-700 dark:text-white">Họ</label>
            <input
              type="text"
              name="lastName"
              value={profile?.userProfile.lastName}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-white">Số điện thoại</label>
          <input
            type="text"
            name="phoneNumber"
            value={profile?.userProfile.phoneNumber}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-white">Địa chỉ</label>
          <input
            type="text"
            name="address"
            value={profile?.userProfile.address}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-[var(--primary-color)] text-white font-semibold rounded hover:bg-[var(--secondary-color)] transition cursor-pointer"
        >
          Cập nhật
        </button>
      </form>
    </div>
  );
};

export default UserProfile;
