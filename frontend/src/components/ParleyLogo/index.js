import SlackLogo from "../../images/slack_logo.svg";
import SlackLogoYB from "../../images/slack_logo_yb.svg";
import "./ParleyLogo.css";

const ParleyLogo = ({ isColorful }) => {
  return (
    <div className="logo-container">
      <img src={isColorful ? SlackLogo : SlackLogoYB} className="logo-img" />
      <h1 className="logo-text">Parley</h1>
    </div>
  );
};

export default ParleyLogo;
