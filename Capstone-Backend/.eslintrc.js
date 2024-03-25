module.exports = {
  extends: ["google"],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
  },
  rules: {
    "require-jsdoc": "off",
    "max-len": "off",
    "quotes": "off",
    "indent": "off",
    "object-curly-spacing": "off",
    "comma-dangle": "off",
    "linebreak-style": "off",
    "brace-style": "off", // Disables enforcement of the brace style rule
  },
};
