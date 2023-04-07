import Link from "../compnents/link/Link";

const Page404 = () => {
  return (
    <>
      <section>
        <h1>This is not fine</h1>
        <img
          src="https://www.antevenio.com/wp-content/uploads/2017/08/15-ejemplos-de-paginas-404-que-generan-engagement-1.jpg"
          alt="page not found"
        />
      </section>
      <Link to="/">Go to Home</Link>
    </>
  );
};

export default Page404;
