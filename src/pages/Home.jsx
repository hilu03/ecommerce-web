import FeatureProduct from '@/components/FeaturedProduct'
import Banner from '../components/Banner'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  // const navigate = useNavigate();
  // useEffect(() => {
  //   const user = JSON.parse(localStorage.getItem("user"));
  
  //   if (user && user.role === "ROLE_ADMIN") {
  //     navigate("/admin");
  //   }

  // }, []);

  return (
    <>
      <Banner/>
      <FeatureProduct/>
    </>
  )
}

export default Home