import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <div class="flex h-screen bg-[var(--primary-color)] justify-center">
      <Outlet />
    </div>
  )
}

export default AuthLayout