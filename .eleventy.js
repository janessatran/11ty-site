const embeds = require("eleventy-plugin-embed-everything");

module.exports = function (eleventyConfig) {
  let copyOptions = {
    debug: true, // log debug information
  };

  const files = ["src/fonts", "src/css"];
  files.forEach((file) => eleventyConfig.addPassthroughCopy(file, copyOptions));

  eleventyConfig.addPlugin(embeds);

  return {
    // When a passthrough file is modified, rebuild the pages:
    passthroughFileCopy: true,
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "_site",
    },
  };
};
