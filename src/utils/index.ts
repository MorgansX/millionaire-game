export const delayedCb = (cb: () => void, delay: number) => setTimeout(() => cb(), delay);

export const formatAmount = (amount: number) => {
  const parts = amount.toString().split('.');

  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  console.log(parts.join('.'));
  return parts.join('.');
};
