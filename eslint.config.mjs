import withNuxt from "./.nuxt/eslint.config.mjs";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";

export default withNuxt(eslintPluginPrettierRecommended, {
  rules: {
    "prettier/prettier": [
      "error",
      {
        semi: true,
        printWidth: 100,
        tabWidth: 2,
      },
    ],
  },
});
