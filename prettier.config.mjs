/** @type {import("prettier").Config} */
const config = {
  semi: true,
  singleQuote: false,
  trailingComma: "all",
  printWidth: 80,
  tabWidth: 2,
  // Auto-sorts Tailwind class names. Must be the last plugin.
  plugins: ["prettier-plugin-tailwindcss"],
};

export default config;
