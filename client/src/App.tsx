import Footer from "./components/Footer";
import Login from "./components/Forms/Auth/Login";
import Register from "./components/Forms/Auth/Register";
import Navbar from "./components/Navbar";


export default function App() {
  return (
    <div><Navbar/>
    {/* <Login/> */}
    <Register/>
    <Footer/>
    </div>
  )
}
