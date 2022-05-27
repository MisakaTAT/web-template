let TokenKey = 'Token';

function getToken(): string {
  return localStorage.getItem(TokenKey);
}

function setToekn(token: string) {
  localStorage.setItem(TokenKey, token);
}

function removeToken() {
  localStorage.removeItem(TokenKey);
}

export default { getToken, setToekn, removeToken, TokenKey };
