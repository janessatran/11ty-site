const embeds = require("eleventy-plugin-embed-everything");

module.exports = function (eleventyConfig) {
  let copyOptions = {
    debug: true, // log debug information
  };

  eleventyConfig.addPassthroughCopy({ "img/favicon": "/" });

  const files = ["src/fonts", "src/css"];
  files.forEach((file) => eleventyConfig.addPassthroughCopy(file, copyOptions));

  eleventyConfig.addPlugin(embeds);

  // Returns a collection of blog posts in reverse date order
  eleventyConfig.addCollection("archive", (collection) => {
    return [...collection.getFilteredByGlob("./src/archive/*.md")].reverse();
  });

  eleventyConfig.addFilter(
    "filterByTags",
    function (collection = [], ...requiredTags) {
      return collection.filter((post) => {
        return requiredTags.flat().every((tag) => {
          if (post.data.tags) return post.data.tags.includes(tag);
        });
      });
    }
  );

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
