const displayUSDCurrency = (amount) => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  });

  const finalResult = formatter.format(amount);

  return finalResult;
};

export default displayUSDCurrency;
