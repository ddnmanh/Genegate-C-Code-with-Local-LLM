# Generate C++ Code with LLM Model Local

Đây là một dự án sử dụng mô hình ngôn ngữ lớn (LLM) để tạo mã C++ cục bộ. Dự án tích hợp mô hình `qwen2.5-coder-7b-instruct` chạy trên phần mềm **LM Studio**, với backend được xây dựng bằng **Flask (Python)** và giao diện người dùng sử dụng **ReactJS**.

## Cấu trúc dự án

- **/backend**: Chứa mã nguồn server API Flask (Python) để xử lý yêu cầu và giao tiếp với mô hình LLM.
- **/frontend**: Chứa mã nguồn giao diện ReactJS để người dùng tương tác.
- **/problems**: Chứa các yêu cầu bài toán mẫu.

## Yêu cầu

Trước khi chạy dự án, hãy đảm bảo bạn đã cài đặt các thành phần sau:

1. **LM Studio**: Đã cài đặt và đang chạy mô hình `qwen2.5-coder-7b-instruct` với cổng mặc định `1234`.
2. **Python**: Phiên bản 3.13 trở lên (cho Flask backend).
3. **Node.js**: Phiên bản 20 trở lên (cho ReactJS frontend).
4. **npm**: Đi kèm với Node.js để quản lý gói trong frontend.
5. **port**: Thiết bị phải còn trống các cổng `1234`, `8080`, `3000`.

## Hướng dẫn cài đặt và chạy dự án
*** Lưu ý hướng dẫn này được viết cho MacOS. Khi sử dụng trên OS khác xin vui lòng tham khảo thêm tài liệu trên internet.
### 1. Backend 
#### 1.1 Di chuyển vào thư mục backend:
```bash
cd backend
```
#### 1.2 Tạo môi trường ảo
```bash
python3 -m venv myenv
```
#### 1.3 Chạy môi trường ảo
```bash
source myenv/bin/activate
```
#### 1.4 Cài đặt các thư viện
```bash
pip install -r requirements.txt
```
#### 1.5 Chạy server
```bash
python3 app.py
```

### 2. Frontend
#### 2.1 Di chuyển vào thư mục fontend:
```bash
cd fontend
```
#### 2.2 Cài đặt các thư viện:
```bash
npm install
```
#### 2.3 Chạy giao diện
```bash
npm start
```

### 3. Cấu hình LM Studio
* Mở LM Studio và tải mô hình qwen2.5-coder-7b-instruct.
* Đảm bảo LM Studio đang chạy server cục bộ (thường là http://localhost:1234) để Flask backend có thể gửi yêu cầu tới mô hình.
