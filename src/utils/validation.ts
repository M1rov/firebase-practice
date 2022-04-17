export const validateEmail = (email: string): boolean =>
  /\S+@\S+\.\S+/.test(email);

export const validatePassword = (password: string): boolean =>
  password.length >= 12;

export const validateName = (name: string): boolean => {
  const namesArr = name.split(' ');
  if (namesArr.length < 2) {
    return false;
  }
  return namesArr.every((word) =>
    word[0] ? word[0] === word[0].toUpperCase() : false,
  );
};
