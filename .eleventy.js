module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/js");
  eleventyConfig.addPassthroughCopy("src/data");

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes"
    }
  };
};