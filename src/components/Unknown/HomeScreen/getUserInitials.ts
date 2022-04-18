const getUserInitials = (username: string): string => {
  const namesArr = username.trim().split(' ');
  return namesArr.reduce((acc, name, index) => {
    if (index === 0 || index === namesArr.length - 1) {
      return `${acc}${name.charAt(0).toUpperCase()}`;
    }
    return acc;
  }, '');
};

export default getUserInitials;
