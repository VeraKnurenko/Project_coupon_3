import "./AboutUs.css";
import link from '../../../assets/images/link.jpg'

function AboutUs(): JSX.Element {


    return (
        <div className="AboutUs">
            <h1>Welcome to My Site!</h1>
           <p> This is Veronikas' Very useful coupons website.</p>

            <p> Veronika loves many things, mostly bargains on good quality coupons <br/> and doing backend programming</p>
            <p>Veronika does not enjoy CSS very much, <br/> and would like to ask forgivness for the color palette she chose</p>

            <img src={link} alt={"link"}/>

			
        </div>
    );
}

export default AboutUs;
