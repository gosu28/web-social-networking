// Trước khi đi vào controllers request sẽ đi qua một trong các hàm dưới đây
// tùy vào việc được khai báo ở route
async function authenticate(req, res, next) {}

async function authorize(req, res, next) {}

module.exports = { authenticate, authorize };
