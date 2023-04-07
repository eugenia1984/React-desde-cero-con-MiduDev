import Link from "../compnents/link/Link";

export function HomePage() {
  return (
    <>
      <h1>Home</h1>
      <p>This is a page to create a React Router from scratch.</p>
      <Link to="/about">About</Link>
    </>
  );
}
