export function formatNumber(number: number, options: Intl.NumberFormatOptions = {}): string {
  return new Intl.NumberFormat("ru-RU", {
    ...options,
  }).format(number)
}

// utils.js
export function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

export const formatPrice = (price) => {
  return new Intl.NumberFormat("en-US", {
      style: "decimal",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
  }).format(price);
};

export const formatPercent = (percent) => {
  return parseFloat(percent).toFixed(2);  // Ensure only two decimal places
};

export const formatDateTime = () => {
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: true, // 12-hour format
  };
  const currentDate = new Date();
  return currentDate.toLocaleString('en-US', options)
};



