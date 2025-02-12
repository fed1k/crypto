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

export function maskEmail(email) {
  // Check if the email contains the '@' symbol
  if (!email.includes('@')) {
    throw new Error("Invalid email format. Please provide a valid email.");
  }

  const [localPart, domain] = email.split('@');

  if (!domain) {
    throw new Error("Invalid email format. Missing domain.");
  }

  const domainName = domain.split('.')[0]; // Get the part before the first dot in the domain
  const maskedLocalPart = localPart.slice(0, 3) + '***';
  const maskedDomain = domainName.slice(0, 1) + '****';
  const maskedDomainWithExtension = domain.replace(domainName, maskedDomain);

  return `${maskedLocalPart}@${maskedDomainWithExtension}`;
}

export function uidToNumber(uid: string) {
  if (typeof uid !== 'string' || uid.length === 0) {
    throw new Error("Invalid UID: It should be a non-empty string.");
  }

  let result = 0;
  for (let i = 0; i < uid.length; i++) {
    result += uid.charCodeAt(i);
  }

  // Modulo 1 billion to ensure it is a 9-digit number
  return result % 1000000000;
}







