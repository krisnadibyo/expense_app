
export const isPhoneNumber = (phone: string) => {
  return phone.match(/^[0-9]{10}$/);
}

export const isEmail = (email: string) => {
  return email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
}

export const formatCurrency = (amount: number) => {
  return amount.toLocaleString('IDR', {
    style: 'currency',
    currency: 'IDR',
  });
}

export const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString();
};