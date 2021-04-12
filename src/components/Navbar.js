import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1 className="title">CAT VOTE</h1>
      <div className="links">
        <Link
          style={{
            color: "black",
          }}
          to="/"
        >
          Home
        </Link>
        <Link
          to="/upload"
          style={{
            color: "black",
            backgroundColor: "#efb6b2",
            borderRadius: "8px",
          }}
        >
          Add Image
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
