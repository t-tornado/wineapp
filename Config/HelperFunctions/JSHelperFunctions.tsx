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

export function PasswordIsValid(password: string) {
  return password.length >= 6;
}

export function VeriifyPasswordsAreValidAndMatch(
  password: string,
  repeatedPassword: string,
) {
  return PasswordIsValid(password) && PasswordIsValid(repeatedPassword);
}
