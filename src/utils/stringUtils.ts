
export const isPhoneNumber = (phone: string) => {
  return phone.match(/^[0-9]{10}$/);
}

export const isEmail = (email: string) => {
  return email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
}