// token时间
const TOKEN_TIME = "tokenTime";
// token过期时间
const TOKEN_TIME_VALUE = 24 * 60 * 60 * 1000;

// 设置token过期时间
export const setTokenTime = () => {
  localStorage.setItem(TOKEN_TIME, Date.now() + "");
};

// 获取token过期时间
export const getTokenTIme = () => {
  return localStorage.getItem(TOKEN_TIME);
};

// token是否过期
export const diffTokenTIme = () => {
  const current = Date.now();
  const tokenTime = Number(getTokenTIme());
  return current - tokenTime > TOKEN_TIME_VALUE;
};

// 获取当前时间
export const currentTime = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();
  const padStart = (num) => (num < 10 ? "0" + num : num);
  const monthStr = padStart(month);
  const dayStr = padStart(day);
  const hourStr = padStart(hour);
  const minuteStr = padStart(minute);
  const secondStr = padStart(second);
  const formatDate = `${year}-${monthStr}-${dayStr} ${hourStr}:${minuteStr}:${secondStr}`;
  return formatDate;
};
