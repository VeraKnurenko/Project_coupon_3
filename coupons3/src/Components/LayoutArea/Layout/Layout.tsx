import "./Layout.css";
import {BrowserRouter} from "react-router-dom";
import Header from "../Header/Header";
import Navbar from "../Navbar/Navbar";
import Main from "../../MainArea/Main/Main";
import Footer from "../Footer/Footer";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


function Layout(): JSX.Element {
    return (
        <div className="Layout">
            <BrowserRouter>
                <header>
                    <Header/>
                </header>
                <nav>
                    <Navbar/>
                </nav>
                <main>
                    <Main/>
                </main>
                <footer>
                    <Footer/>
                </footer>
    <ToastContainer/>
            </BrowserRouter>
			
        </div>
    );
}

export default Layout;
