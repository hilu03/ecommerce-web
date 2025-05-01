import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { MdError } from "react-icons/md";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await login(email, password);  
    if (res.success) {      
      if (res.userData.role === "ROLE_ADMIN") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } else {
      setErrorMsg(res.message);
    }
  };
  
  return (
    <div className="w-full max-w-md m-auto bg-indigo-100 rounded p-8">   
      <header className='flex justify-center mb-4'>
        <Link to='/' className="inline-block">
          <img className="w-20 mx-auto mb-5" src={logo} />
        </Link>
      </header>   
      <form onSubmit={handleSubmit}>
        {errorMsg && <p className="text-red-500 flex items-center justify-center mb-2 gap-2"><MdError />{errorMsg}</p>}
        <div>
          <label for='email' className="block mb-2 text-[var(--primary-color)] after:ml-0.5 after:text-red-500 after:content-['*']">Email</label>
          <input className="w-full p-2 mb-6 bg-white text-[var(--primary-color)] border-b-2 border-indigo-500 outline-none" type="email" name="email" id='email' placeholder='yourname@example.com' required value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label className="block mb-2 text-[var(--primary-color)] after:ml-0.5 after:text-red-500 after:content-['*']" for="password">Mật khẩu</label>
          <input className="w-full p-2 mb-6 bg-white text-[var(--primary-color)] border-b-2 border-indigo-500 outline-none" type="password" name="password" id='password' required placeholder='Nhập mật khẩu' value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div>          
          <input value='Đăng nhập' className="w-full bg-[var(--secondary-color)] hover:bg-[var(--primary-color)] text-white font-bold py-2 px-4 mb-6 rounded cursor-pointer" type="submit" />
        </div>       
      </form>  
      <footer>
        <Link className="text-indigo-700 hover:text-[var(--secondary-color)] text-md underline float-left" to='#'>Quên mật khẩu?</Link>
        <Link className="text-indigo-700 hover:text-[var(--secondary-color)] text-md underline float-right" to='/signup'>Tạo tài khoản</Link>
      </footer>   
    </div>
  )
}

export default Login