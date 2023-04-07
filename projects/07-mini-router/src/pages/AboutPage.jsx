import Link from "../compnents/link/Link";

export function AboutPage() {
  return (
    <>
      <h1>About</h1>
      <div>
        <img
          src="https://avatars.githubusercontent.com/u/72580574?s=40&v=4"
          alt="fotografía de Maria Eugenia Costa"
        />
        <p>Hi, I'm María Eugenia and I'm creating a React Router clone.</p>
      </div>
      <Link to="/">Home</Link>
    </>
  );
}
