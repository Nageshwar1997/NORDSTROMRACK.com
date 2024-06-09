const { default: SummaryApi } = require("../common/index");

const fetchCategoryWiseProduct = async (category) => {
  const response = await fetch(SummaryApi.categoryWiseProduct.url, {
    method: SummaryApi.categoryWiseProduct.method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      category: category,
    }),
  });
    const dataResponse = await response.json();

  return dataResponse;
};


fetchCategoryWiseProduct("airpods");

export default fetchCategoryWiseProduct;
