import { Link } from "../components/link/Link.jsx";

const i18n = {
  es: {
    title: "Sobre nosotros",
    button: "Ir a la HOME",
    description:
      "¡Hola! Me llamo María Eugenia Costa y estoy creando un clon de React Router.",
  },
  en: {
    title: "About us",
    button: "Go to HOME",
    description:
      "Hi, I am María Eugenia and I am creating a React Router clone.",
  },
};

const useI18n = (lang) => {
  return i18n[lang] || i18n.en;
};

export default function AboutPage({ routeParams }) {
  const i18n = useI18n(routeParams.lang ?? "es");

  return (
    <>
      <h1>{i18n.title}</h1>
      <div>
        <img
          src='https://avatars.githubusercontent.com/u/72580574?s=40&v=4'
          alt="fotografía de Maria Eugenia Costa"
        />
        <p>{i18n.description}</p>
      </div>
      <Link to="/">{i18n.button}</Link>
    </>
  );
}
