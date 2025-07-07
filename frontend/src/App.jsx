import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import { useEffect } from "react";
import { CONST } from "./const";
import axios from "axios";
import ChangeThemeInput from "./components/ChangeThemeInput";
import ProductListPage from "./pages/ProductListPage";
import Admin from "./pages/Admin";
function App() {

  const navigate = useNavigate()

  useEffect(() => {

    const fetchData = async () => {
      try {
        const res = await axios.get(CONST.backendUrl + "/user/getUserInforOwn", {
          withCredentials: true
        })
        const userData = res.data.userData
        localStorage.setItem("userData", JSON.stringify(userData))
        // navigate("/products")
      } catch (error) {
        console.log(error)
        navigate("/login")
      }

    }
    fetchData()

  }, [])

  return (
    <>
      <ChangeThemeInput />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/products" element={<ProductListPage />} />
        <Route path="/admin" element={<Admin />} />


      </Routes>
    </>
  );
}

export default App;
