import "./Layout.css";
import Header from "./Header/Header";
import Navbar from "./Navbar/Navbar";
import Main from "./Main/Main";
import Footer from "./Footer/Footer";
import {BrowserRouter} from "react-router-dom";

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

            </BrowserRouter>
        </div>
    );
}

export default Layout;
