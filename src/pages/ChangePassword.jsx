import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from '../assets/logo.png';
import { changePassword } from "@/services/authService";
import { useAuth } from "@/context/AuthContext";
import { MdError } from "react-icons/md";

const ChangePassword = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [cfNewPassword, setCfNewPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const { logout } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (cfNewPassword !== newPassword) {
      setErrorMsg("Mật khẩu mới và mật khẩu xác nhận không trùng khớp!")
      return;
    }
    try {
      await changePassword(
        {
          oldPassword: currentPassword,
          newPassword
        }
      );
      logout(false);
      navigate("/login");
    }
    catch (error) {
      setErrorMsg("Mật khẩu hiện tại chưa chính xác!");
    }
  };

  return (
    <div className="w-full max-w-md m-auto bg-indigo-100 rounded p-8">
      <form onSubmit={handleSubmit} className="px-8 pt-6 pb-8 mb-4 bg-white dark:bg-gray-800 rounded">
        <div className='flex justify-center mb-4'>
          <Link to='/' className="inline-block">
            <img className="w-20 mx-auto mb-5" src={logo} />
          </Link>
        </div>
        {errorMsg && <p className="text-red-500 flex items-center justify-center mb-2 gap-2"><MdError />{errorMsg}</p>}


        <div className="mb-4 md:mb-0">
          <label className="block mb-2 text-sm font-bold text-gray-700 dark:text-white after:ml-0.5 after:text-red-500 after:content-['*']" htmlFor="current-password">
            Mật khẩu hiện tại
          </label>
          <input
            className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 dark:text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            id="current-password"
            type="password"
            placeholder="******************"
            required
            value={currentPassword}
            onChange={e => setCurrentPassword(e.target.value)}
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-bold text-gray-700 dark:text-white after:ml-0.5 after:text-red-500 after:content-['*']" htmlFor="new-password">
            Mật khẩu mới
          </label>
          <input
            className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 dark:text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            id="new-password"
            type="password"
            placeholder="******************"
            required
            value={newPassword}
            onChange={e => setNewPassword(e.target.value)}
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-bold text-gray-700 dark:text-white after:ml-0.5 after:text-red-500 after:content-['*']" htmlFor="cf-password">
            Xác nhận mật khẩu
          </label>
          <input
            className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 dark:text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            id="cf-password"
            type="password"
            placeholder="******************"
            required
            value={cfNewPassword}
            onChange={e => setCfNewPassword(e.target.value)}
          />
        </div>
        <div className="mb-6 text-center">
          <button
            className="w-full px-4 py-2 font-bold text-white rounded-full bg-[var(--secondary-color)] hover:bg-blue-500 dark:bg-blue-700 dark:text-white dark:hover:bg-blue-900 focus:outline-none focus:shadow-outline cursor-pointer"
            type="submit"
          >
            Đổi mật khẩu
          </button>
        </div>



      </form>
    </div>
  )
}

export default ChangePassword