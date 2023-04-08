import { Link } from "../components/link/Link.jsx";

export default function HomePage() {
  return (
    <>
      <h1>Home</h1>
      <p>This is a page to create a React Router from scratch.</p>
      <Link to="/about">Go to ABOUT</Link>
    </>
  );
}
