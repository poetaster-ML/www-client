function currentSlug () {
  const { slug } = this.$route.params;
  return slug ? { slug } : null;
};

function currentSlugOrFirst () {
  return currentSlug() || { first: 1 };
};

export {
  currentSlug,
  currentSlugOrFirst
};
