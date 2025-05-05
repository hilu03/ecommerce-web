import logo from '../assets/logo.png';
import { Link } from 'react-router-dom';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdError } from "react-icons/md";
import { registerAPI } from '@/services/authService';

const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [cfPassword, setCfPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (cfPassword !== password) {
      setErrorMsg("Mật khẩu và mật khẩu xác nhận không trùng khớp!")
      return;
    }

    try {
      await registerAPI({
        firstName,
        lastName,
        email,
        password,
        phoneNumber
      });
  
      navigate("/login");
    } catch (error) {
      setErrorMsg(error.message);
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
        <div className="mb-4 md:flex md:justify-between">
          <div className="mb-4 md:mr-2 md:mb-0">
            <label className="block mb-2 text-sm font-bold text-gray-700 dark:text-white after:ml-0.5 after:text-red-500 after:content-['*']" htmlFor="firstName">
              Tên
            </label>
            <input
              className="w-full px-3 py-2 text-sm leading-tight text-gray-700 dark:text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              id="firstName"
              type="text"
              placeholder="Tên"
              required
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
            />
          </div>
          <div className="md:ml-2">
            <label className="block mb-2 text-sm font-bold text-gray-700 dark:text-white after:ml-0.5 after:text-red-500 after:content-['*']" htmlFor="lastName">
              Họ
            </label>
            <input
              className="w-full px-3 py-2 text-sm leading-tight text-gray-700 dark:text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              id="lastName"
              type="text"
              placeholder="Họ"
              required
              value={lastName}
              onChange={e => setLastName(e.target.value)}
            />
          </div>
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-bold text-gray-700 dark:text-white after:ml-0.5 after:text-red-500 after:content-['*']" htmlFor="phone">
            Điện thoại
          </label>
          <input
            className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 dark:text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            id="phone"
            type="text"
            placeholder="Số điện thoại"
            required
            value={phoneNumber}
            onChange={e => setPhoneNumber(e.target.value)}
            maxLength={10}
            minLength={10}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-bold text-gray-700 dark:text-white after:ml-0.5 after:text-red-500 after:content-['*']" htmlFor="email">
            Email
          </label>
          <input
            className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 dark:text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-4 md:flex md:justify-between">
          <div className="mb-4 md:mr-2 md:mb-0">
            <label className="block mb-2 text-sm font-bold text-gray-700 dark:text-white after:ml-0.5 after:text-red-500 after:content-['*']" htmlFor="password">
              Mật khẩu
            </label>
            <input
              className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 dark:text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="******************"
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            {/* <p className="text-xs italic text-red-500">Please choose a password.</p> */}
          </div>
          <div className="md:ml-2">
            <label className="block mb-2 text-sm font-bold text-gray-700 dark:text-white after:ml-0.5 after:text-red-500 after:content-['*']" htmlFor="c_password">
              Xác nhận mật khẩu
            </label>
            <input
              className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 dark:text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              id="c_password"
              type="password"
              placeholder="******************"
              required
              value={cfPassword}
              onChange={e => setCfPassword(e.target.value)}
            />
          </div>
        </div>
        <div className="mb-6 text-center">
          <button
            className="w-full px-4 py-2 font-bold text-white rounded-full bg-[var(--secondary-color)] hover:bg-blue-500 dark:bg-blue-700 dark:text-white dark:hover:bg-blue-900 focus:outline-none focus:shadow-outline cursor-pointer"
            type="submit"
          >
            Đăng ký
          </button>
        </div>
        <hr className="mb-6 border-t" />
        <div className="text-center">
          <Link className="inline-block text-sm text-blue-500 dark:text-blue-500 align-baseline hover:text-blue-800"
            to="#">
            Quên mật khẩu?
          </Link>
        </div>
        <div className="text-center">
          <Link className="inline-block text-sm text-blue-500 dark:text-blue-500 align-baseline hover:text-blue-800"
            to="/login">
            Đã có tài khoản? Đăng nhập ngay!
          </Link>
        </div>
      </form>
    </div>
  )
}

export default Signup