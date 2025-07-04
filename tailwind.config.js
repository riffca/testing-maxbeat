const adapt = require("./tailwind.adapt");
const plugin = require("tailwindcss/plugin");

const mobileWidth = "360px";
const TabletWidth = "640px";
const DesktopWidth = "1024px";

module.exports = {
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      mobile: mobileWidth,
      tablet: TabletWidth,
      desktop: DesktopWidth,
    },
    extend: {
      colors: {
        "chars-gray-white": "rgba(255, 255, 255, 1)",
      },
    },
  },
  plugins: [
    plugin(function ({ matchUtilities }) {
      const params = {
        mobileScreenWidth: parseInt(mobileWidth),
        tabletScreenWidth: parseInt(TabletWidth),
        desktopScreenWidth: parseInt(DesktopWidth),
      };

      const adaptSimple = adapt.createAdaptiveFactory({
        ...params,
      });

      const styles = adapt.tailwindSizeDefinitions;

      Object.keys(styles).forEach((key) => {
        const currentStyles = styles[key];

        matchUtilities({
          [key + "-rem"]: (value) => adaptSimple.createRemSize(value, currentStyles),
        });

        matchUtilities({
          [key + "-mob"]: (value) => adaptSimple.createVwSize(value, currentStyles),
        });

        matchUtilities({
          [key + "-adapt"]: (value) => adaptSimple.createAdaptHandler(value, currentStyles),
        });
      });
    }),
  ],
};
