function matchIp(str) {
  const regex = /\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/;
  const result = str.match(regex);
  if (result) return result[0];
  return null;
}

module.exports = {
  matchIp,
};
