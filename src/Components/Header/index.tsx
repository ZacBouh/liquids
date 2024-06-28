import { NavLink } from "react-router-dom";

const Header = function () {
  return (
    <>
      <div className="bg-red-200">
        <h1>This is the header</h1>
        <NavLink to={"aromas"}>Aromas</NavLink>
      </div>
    </>
  );
};
export default Header;
