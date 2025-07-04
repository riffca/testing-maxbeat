const tailwindSizeDefinitions = {
  // Padding
  p: ["padding"],
  px: ["padding-left", "padding-right"],
  py: ["padding-top", "padding-bottom"],
  pt: ["padding-top"],
  pr: ["padding-right"],
  pb: ["padding-bottom"],
  pl: ["padding-left"],
  ps: ["padding-inline-start"],
  pe: ["padding-inline-end"],

  // Margin
  m: ["margin"],
  mx: ["margin-left", "margin-right"],
  my: ["margin-top", "margin-bottom"],
  mt: ["margin-top"],
  mr: ["margin-right"],
  mb: ["margin-bottom"],
  ml: ["margin-left"],
  ms: ["margin-inline-start"],
  me: ["margin-inline-end"],

  // Width/Height
  w: ["width"],
  h: ["height"],
  "min-w": ["min-width"],
  "min-h": ["min-height"],
  "max-w": ["max-width"],
  "max-h": ["max-height"],

  // Spacing
  "space-x": ["margin-left"],
  "space-y": ["margin-top"],
  "space-x-reverse": ["margin-right"],
  "space-y-reverse": ["margin-bottom"],

  // Border
  border: ["border-width"],
  "border-x": ["border-left-width", "border-right-width"],
  "border-y": ["border-top-width", "border-bottom-width"],
  "border-t": ["border-top-width"],
  "border-r": ["border-right-width"],
  "border-b": ["border-bottom-width"],
  "border-l": ["border-left-width"],
  "border-s": ["border-inline-start-width"],
  "border-e": ["border-inline-end-width"],

  // Border Radius
  rounded: ["border-radius"],
  "rounded-t": ["border-top-left-radius", "border-top-right-radius"],
  "rounded-r": ["border-top-right-radius", "border-bottom-right-radius"],
  "rounded-b": ["border-bottom-right-radius", "border-bottom-left-radius"],
  "rounded-l": ["border-top-left-radius", "border-bottom-left-radius"],
  "rounded-tl": ["border-top-left-radius"],
  "rounded-tr": ["border-top-right-radius"],
  "rounded-br": ["border-bottom-right-radius"],
  "rounded-bl": ["border-bottom-left-radius"],
  "rounded-ss": ["border-start-start-radius"],
  "rounded-se": ["border-start-end-radius"],
  "rounded-ee": ["border-end-end-radius"],
  "rounded-es": ["border-end-start-radius"],

  // Gap
  gap: ["gap"],
  "gap-x": ["column-gap"],
  "gap-y": ["row-gap"],

  // Typography
  text: ["font-size"],
  leading: ["line-height"],
  tracking: ["letter-spacing"],
};

function createAdaptiveFactory({
  mobileScreenWidth,
  tabletScreenWidth,
  desktopScreenWidth,
  remSize = 16,
}) {
  function getRemFromPixel(pixel) {
    return `${pixel / remSize}rem`;
  }

  function getVwFromPixel(pixel, viewportWidth = mobileScreenWidth) {
    return `${(pixel / viewportWidth) * 100}vw`;
  }

  function createMQString(conditions) {
    return (
      "@media " +
      Object.entries(conditions)
        // eslint-disable-next-line no-unused-vars
        .filter(([_, value]) => Boolean(value))
        .map(([feature, value]) => `(${feature}: ${value}px)`)
        .join(" and ")
    );
  }

  const generateStyles = (value, currentStyles) => {
    const result = {};
    currentStyles.forEach((style) => {
      result[style] = value;
    });
    return result;
  };

  function createVwSize(value, currentStyles) {
    return generateStyles(getVwFromPixel(value), currentStyles);
  }

  function createRemSize(value, currentStyles) {
    return generateStyles(getRemFromPixel(value), currentStyles);
  }

  function createAdaptHandler(value, currentStyles) {
    let [mobile, tablet, desktop] = value.split(",").map(Number);

    const mobileSize = getVwFromPixel(mobile);
    const tabletSize = tablet ? getRemFromPixel(tablet) : getRemFromPixel(mobile);
    const desktopSize = desktop ? getRemFromPixel(desktop) : tabletSize;

    const tabletMedia = createMQString({
      "min-width": tabletScreenWidth,
    });

    const desktopMedia = createMQString({
      "min-width": desktopScreenWidth,
    });

    const generateStyles = (value) => {
      const result = {};
      currentStyles.forEach((style) => {
        result[style] = value;
      });
      return result;
    };

    return {
      ...generateStyles(mobileSize),
      [tabletMedia]: generateStyles(tabletSize),
      [desktopMedia]: generateStyles(desktopSize),
    };
  }

  return {
    createAdaptHandler,
    createVwSize,
    createRemSize,
  };
}

module.exports = {
  createAdaptiveFactory,
  tailwindSizeDefinitions,
};
