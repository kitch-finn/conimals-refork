export const passwordValidator = (password: string) => {
  // 8자 이상의 영문, 숫자 조합
  const regExp = /(?=.*\d)(?=.*[a-zA-ZS]).{8,}/;
  return regExp.test(password);
};

export const passwordMatchValidator = (
  password: string,
  retypePassword: string
) => {
  if (password === '' || retypePassword === '') return false;
  return password === retypePassword;
};

export const nicknameValidator = (nickname: string) => {
  // 1~12자의 영문, 숫자, 한글 사용 가능
  const regExp = /^[A-Za-z0-9_ㄱ-ㅎㅏ-ㅣ가-힣]{1,12}$/;
  return regExp.test(nickname);
};

export const emailValidator = (email: string) => {
  const regExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regExp.test(email);
};
