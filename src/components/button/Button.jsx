import { Link } from "react-router-dom";
import LinkStyle from "./Button.style";

const Button = ({ children, href, ...props }) => {
  return (
    <LinkStyle {...props} className="btn_wrapper">
      <Link to={href ? href : "#"} style={{ color: "#090B1A" }}>
        {children}
      </Link>
      <div className="hover_shape_wrapper">
        <span className="btn_hover_shape btn_hover_shape-1"></span>
        <span className="btn_hover_shape btn_hover_shape-2"></span>
        <span className="btn_hover_shape btn_hover_shape-3"></span>
      </div>
    </LinkStyle>
  );
};

export default Button;
