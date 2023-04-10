module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["plugin:react/recommended", "standard-with-typescript"],
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    proyect: "./tsconfig.json",
  },
  plugins: ["react"],
  rules: {
    "react/props-types": "off",
    "react/react-in-jsx-sxope": "off",
  },
};
