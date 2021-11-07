export const isEmail: (email: string) => boolean = email => {
  if (email.match(/\w+\@\w+\.\w+/g)) return true;
  return false;
};
