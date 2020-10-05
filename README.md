### Cấu trúc project

- Routes: Khai báo các route API và các middleware
- Middlewares: Chứa các hàm trung gian để kiểm tra điều kiện hoặc các sự kiện chung trước khi đi vào controller
- Controllers: Mục đích kiểm tra tính hợp lệ của dữ liệu đầu vào. Sau đó điều hướng đến các service để thực thi nghiệp vụ
- Services: Thực thi các nghiệp vụ của project
- Models: Chứa các models
- Utils: Chứa các hàm xử lý chung cho cả project
- Erros: Xử lý các lỗi do hệ thống phát sinh và trả về mã code cho frontend
- Scripts: Chạy những scirpt liên quan đến hệ điều hành
- Test: Chứa các file unit test
- Environments: Chứa các file lưu các thông số của project tùy theo mỗi môi trường

### Biến môi trường

Đối với mỗi project cần có file môi trường là `.env` được đặt ở thư mục root. Khi chạy các biến trong .env sẽ được load lên MEMORY để có thể gọi ở mọi file. (Lưu ý: File `.env` sẽ bị ignore khi đưa lên git, mọi thông số sẽ được chuyển sang .env.default để mọi người có thể update khi có thay đổi)
