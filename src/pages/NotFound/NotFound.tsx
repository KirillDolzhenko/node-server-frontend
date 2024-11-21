import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div>
      <h1>Not Found</h1>
      <Link to="/profile">Profile</Link>
    </div>
  );
}

export default NotFound;
