async function helloworld(req, res) {
  return res.send({ status: 1, message: 'Hello guys' });
}

module.exports = {
  helloworld,
};
