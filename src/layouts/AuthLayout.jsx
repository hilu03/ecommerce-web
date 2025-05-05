import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <div className="flex h-screen bg-[var(--primary-color)] justify-center">
      <Outlet />
    </div>
  )
}

export default AuthLayout