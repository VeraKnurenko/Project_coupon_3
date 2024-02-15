import "./PageNotFound.css";
import notFound1 from '../../../assets/images/notFound1.jpg';
import notFound2 from '../../../assets/images/notFound2.jpg';
import notFound3 from '../../../assets/images/notFound3.png';
import {Button} from "@mui/material";
import {useNavigate} from "react-router-dom";

function PageNotFound(): JSX.Element {
    const images = [notFound1, notFound2, notFound3];
    const navigate = useNavigate();
    function getRandomInt( max: number) {
        // min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - 1));
    }
    const index = getRandomInt( images.length);

    return (
        <div className="PageNotFound">
            <Button variant={"contained"} onClick={() => navigate(-1)}  > Back  </Button>

            <h2>Page Not Found</h2>
            <img src={images[index]} alt="Not Found" />
			
        </div>
    );
}

export default PageNotFound;
