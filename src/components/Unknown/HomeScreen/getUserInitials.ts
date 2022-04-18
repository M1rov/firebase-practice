interface IUser {
  displayName: string | null;
}

const getUserInitials = (user: IUser): string => {
  if (!user?.displayName) {
    return 'U';
  }
  const namesArr = user.displayName.split(' ');
  return namesArr.reduce((acc, name, index) => {
    if (index === 0 || index === namesArr.length - 1) {
      return `${acc}${name.charAt(0).toUpperCase()}`;
    }
    return acc;
  }, '');
};

export default getUserInitials;
