export const emailRule =
  /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

//숫자, 영문만 입력 가능 (1~20자리수)
export const usernameRule = /^[0-9a-z]{1,20}$/;

// 숫자, 영문, 특수문자 각 1자리 이상이면서 최소 8자리
export const passwordRule =
  /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,}$/;
