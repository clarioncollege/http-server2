const getPagination = (page, limit) => {
  const pageNumber = Math.round(Math.abs(page)) || 1;
  const limitNumber = Math.round(Math.abs(limit)) || 2;
  const skip = (pageNumber - 1) * limitNumber;

  return { pageNumber, limitNumber, skip };
};

module.exports = { getPagination };
