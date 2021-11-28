export const isEmail: (email: string) => boolean = email => {
  if (email.match(/\w+\@\w+\.\w+/g)) return true;
  return false;
};

export function HidePasswordChars(password: string): string {
  let hidenChars = '';
  let counter = 0;
  while (password && counter < password.length) {
    hidenChars += '*';
    counter++;
  }
  return hidenChars;
}
