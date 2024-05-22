const displayINRCurrency = (amount) => {
  const formatter = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
  });

  const finalResult = formatter.format(amount);

  return finalResult;
};

export default displayINRCurrency;
