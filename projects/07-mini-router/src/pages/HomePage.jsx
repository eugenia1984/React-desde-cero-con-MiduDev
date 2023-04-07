import Link from "../compnents/link/Link";
import { navigate } from "../utils/navigation";

export function HomePage() {
  return (
    <>
      <h1>Home</h1>
      <p>This is a page to create a React Router from scratch.</p>
      {/* <button onClick={() => navigate("/about")}>About</button> */}
      <Link to="/about">About</Link>
    </>
  );
}
