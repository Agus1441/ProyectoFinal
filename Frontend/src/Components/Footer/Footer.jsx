import { useNavigate } from "react-router-dom";

const Footer = () => {
    const navigate = useNavigate();

    return(
        <div>
            <button onClick={() => {navigate("/myfeed")}}>Feed</button>
            <button onClick={() => {navigate("/profile")}}>Perfil</button>
        </div>
    )
}

export default Footer;