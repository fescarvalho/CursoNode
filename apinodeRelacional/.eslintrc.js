module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: ["airbnb-base", "prettier"],
  plugins: ["prettier"],
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {
    "class-methods-use-this": "off",
    "no-param-reassing": "off",
    camelcase: "off",
    "prettier/prettier": "error",
    "no-undescore-dangle": "off",
    "no-unused-vars": ["error", { argsIgnorePattern: "next" }],
  },
};
ss;
