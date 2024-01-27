import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import SlackLogo from "../../images/slack_logo.svg";
import SlackLogoYB from "../../images/slack_logo_yb.svg";
import "./ParleyLogo.css";

const ParleyLogo = ({ isColorful, color }) => {
  const user = useSelector((state) => state.session.user);

  const home = user ? `/client/${user.id}/get-started/landing` : "/";

  return (
    <Link to={home} className="logo-container">
      <img
        src={isColorful ? SlackLogo : SlackLogoYB}
        className="logo-img"
        alt="Go to home page"
      />
      <h1 className="logo-text" style={{ color: color }}>
        Parley
      </h1>
    </Link>
  );
};

export default ParleyLogo;
