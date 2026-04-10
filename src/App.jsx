import React, { useState } from 'react';
import { CheckCircle2, XCircle, ArrowRight, RotateCcw, AlertCircle, Play, Check } from 'lucide-react';

// DỮ LIỆU CÂU HỎI MẪU
// BẠN HÃY THAY THẾ CÁC CÂU HỎI TỪ GOOGLE FORM CỦA BẠN VÀO ĐÂY
const questionsData = [
  {
    "id": 1,
    "question": "Quy trình phần mềm bao gồm những hoạt động nào?",
    "options": [
      { "text": "Thiết kế, lập trình, bảo trì", "isCorrect": false },
      { "text": "Đặc tả, thiết kế, kiểm thử, bảo trì", "isCorrect": true },
      { "text": "Lập kế hoạch, phân tích, kiểm thử", "isCorrect": false },
      { "text": "Thiết kế, lập trình, phân tích", "isCorrect": false }
    ],
    "explanation": "Theo Ian Sommerville, 4 hoạt động cơ bản của mọi quy trình phần mềm là Đặc tả (Specification), Thiết kế & Hiện thực (Design & Implementation), Thẩm định (Validation/Kiểm thử) và Tiến hóa (Evolution/Bảo trì)."
  },
  {
    "id": 2,
    "question": "Hoạt động nào là bước đầu tiên trong quy trình phần mềm?",
    "options": [
      { "text": "Thiết kế phần mềm", "isCorrect": false },
      { "text": "Đặc tả yêu cầu", "isCorrect": true },
      { "text": "Kiểm thử phần mềm", "isCorrect": false },
      { "text": "Bảo trì phần mềm", "isCorrect": false }
    ],
    "explanation": "Đặc tả yêu cầu (Requirement Specification) là bước khởi đầu để xác định rõ hệ thống cần làm gì trước khi tiến hành thiết kế và lập trình."
  },
  {
    "id": 3,
    "question": "Yếu tố nào dưới đây không thuộc quy trình kỹ thuật về yêu cầu?",
    "options": [
      { "text": "Nghiên cứu khả thi", "isCorrect": false },
      { "text": "Thu thập và phân tích yêu cầu", "isCorrect": false },
      { "text": "Thiết kế hệ thống", "isCorrect": true },
      { "text": "Kiểm tra tính hợp lệ của yêu cầu", "isCorrect": false }
    ],
    "explanation": "Thiết kế hệ thống thuộc về giai đoạn thiết kế (Design phase), không nằm trong giai đoạn Kỹ thuật yêu cầu (Requirements Engineering)."
  },
  {
    "id": 4,
    "question": "Mục tiêu chính của hoạt động thẩm định phần mềm là gì?",
    "options": [
      { "text": "Đảm bảo hệ thống không có lỗi", "isCorrect": false },
      { "text": "Xác nhận hệ thống đáp ứng yêu cầu của khách hàng", "isCorrect": true },
      { "text": "Tăng tốc độ phát triển phần mềm", "isCorrect": false },
      { "text": "Giảm chi phí phát triển", "isCorrect": false }
    ],
    "explanation": "Thẩm định (Validation) trả lời cho câu hỏi 'Are we building the right product?', tức là xác nhận phần mềm xây dựng có đúng với mong đợi và yêu cầu thực tế của khách hàng hay không."
  },
  {
    "id": 5,
    "question": "Kiểm định (verification) và kiểm thử (validation) trong thẩm định phần mềm có ý nghĩa gì?",
    "options": [
      { "text": "Kiểm tra hệ thống tuân theo đặc tả và thỏa mãn yêu cầu khách hàng", "isCorrect": true },
      { "text": "Phát hiện và sửa lỗi trong phần mềm", "isCorrect": false },
      { "text": "Tối ưu hóa hiệu suất hệ thống", "isCorrect": false },
      { "text": "Cải thiện giao diện người dùng", "isCorrect": false }
    ],
    "explanation": "Verification đảm bảo phần mềm được xây dựng đúng theo tài liệu đặc tả (build the product right), còn Validation đảm bảo phần mềm đáp ứng đúng nhu cầu thực tế của khách hàng (build the right product)."
  },
  {
    "id": 6,
    "question": "Trong quy trình phần mềm, thiết kế và hiện thực phần mềm có thể được thực hiện như thế nào?",
    "options": [
      { "text": "Tuần tự", "isCorrect": false },
      { "text": "Đan xen hoặc liên quan đến nhau", "isCorrect": true },
      { "text": "Độc lập hoàn toàn", "isCorrect": false },
      { "text": "Sau khi kiểm thử phần mềm", "isCorrect": false }
    ],
    "explanation": "Thiết kế và hiện thực thường là các hoạt động đan xen. Khi lập trình (hiện thực), lập trình viên có thể phát hiện các vấn đề cần phải quay lại điều chỉnh thiết kế."
  },
  {
    "id": 7,
    "question": "Mô hình quy trình phần mềm nào thường được sử dụng để phát triển hệ thống lớn?",
    "options": [
      { "text": "Mô hình thác nước", "isCorrect": true },
      { "text": "Mô hình xoắn ốc", "isCorrect": false },
      { "text": "Mô hình Agile", "isCorrect": false },
      { "text": "Mô hình V", "isCorrect": false }
    ],
    "explanation": "Mô hình thác nước (Waterfall) với cách tiếp cận Plan-driven (hướng kế hoạch) thường được ứng dụng cho các hệ thống phần mềm lớn, phức tạp, hệ thống nhúng nơi yêu cầu được xác định rất kỹ từ đầu."
  },
  {
    "id": 8,
    "question": "Mô hình xoắn ốc trong quy trình phần mềm bao gồm bao nhiêu giai đoạn chính?",
    "options": [
      { "text": "2", "isCorrect": false },
      { "text": "3", "isCorrect": false },
      { "text": "4", "isCorrect": true },
      { "text": "5", "isCorrect": false }
    ],
    "explanation": "Mô hình xoắn ốc của Boehm có 4 cung (sectors) chính: (1) Xác định mục tiêu, (2) Phân tích và giảm thiểu rủi ro, (3) Phát triển và thẩm định, (4) Lập kế hoạch cho pha tiếp theo."
  },
  {
    "id": 9,
    "question": "Yếu tố nào dưới đây không phải là một phần của mô hình xoắn ốc?",
    "options": [
      { "text": "Xác định mục tiêu", "isCorrect": false },
      { "text": "Phân tích rủi ro", "isCorrect": false },
      { "text": "Lập kế hoạch dự án", "isCorrect": false },
      { "text": "Tích hợp hệ thống", "isCorrect": true }
    ],
    "explanation": "Tích hợp hệ thống là một pha đặc trưng trong các mô hình như Thác nước hoặc chữ V, không phải là tên của một cung chính trong mô hình xoắn ốc."
  },
  {
    "id": 10,
    "question": "Mục tiêu của việc kiểm thử phần mềm là gì?",
    "options": [
      { "text": "Xác định chi phí phát triển", "isCorrect": false },
      { "text": "Tìm kiếm và sửa lỗi trong phần mềm", "isCorrect": true },
      { "text": "Tăng tốc độ phát triển phần mềm", "isCorrect": false },
      { "text": "Đảm bảo hệ thống dễ bảo trì", "isCorrect": false }
    ],
    "explanation": "Kiểm thử phần mềm là quá trình thực thi chương trình với mục đích tìm ra các lỗi (bug/defect) tiềm ẩn để tiến hành sửa chữa."
  },
  {
    "id": 11,
    "question": "Hoạt động nào sau đây không thuộc quy trình phần mềm?",
    "options": [
      { "text": "Phân tích yêu cầu", "isCorrect": false },
      { "text": "Lập kế hoạch dự án", "isCorrect": true },
      { "text": "Thiết kế giao diện", "isCorrect": false },
      { "text": "Kiểm thử tích hợp", "isCorrect": false }
    ],
    "explanation": "Lập kế hoạch dự án thuộc về nhóm Quản lý dự án (Project Management), trong khi quy trình kỹ thuật phần mềm tập trung vào phân tích, thiết kế, lập trình và kiểm thử."
  },
  {
    "id": 12,
    "question": "Quy trình phát triển phần mềm nào tập trung vào việc tái sử dụng mã nguồn?",
    "options": [
      { "text": "Quy trình hướng thành phần", "isCorrect": true },
      { "text": "Quy trình hướng đối tượng", "isCorrect": false },
      { "text": "Quy trình Agile", "isCorrect": false },
      { "text": "Quy trình thác nước", "isCorrect": false }
    ],
    "explanation": "Quy trình hướng thành phần (Component-based software engineering) được thiết kế đặc biệt xoay quanh việc tìm kiếm, tùy chỉnh và tích hợp các thành phần (component) đã có sẵn để tái sử dụng."
  },
  {
    "id": 13,
    "question": "Tại sao kiểm thử phần mềm là một phần quan trọng của quy trình phần mềm?",
    "options": [
      { "text": "Giúp xác định chi phí phát triển", "isCorrect": false },
      { "text": "Đảm bảo hệ thống hoạt động đúng như yêu cầu", "isCorrect": true },
      { "text": "Tăng tính sáng tạo của nhóm phát triển", "isCorrect": false },
      { "text": "Giảm thời gian phát triển", "isCorrect": false }
    ],
    "explanation": "Kiểm thử là khâu chốt chặn để đảm bảo rằng phần mềm khi được bàn giao sẽ hoạt động đúng, ổn định và thỏa mãn các yêu cầu đã đề ra."
  },
  {
    "id": 14,
    "question": "Mô hình V trong quy trình phần mềm nhấn mạnh điều gì?",
    "options": [
      { "text": "Sự liên kết giữa thiết kế và kiểm thử", "isCorrect": true },
      { "text": "Phát triển tuần tự", "isCorrect": false },
      { "text": "Tái sử dụng mã nguồn", "isCorrect": false },
      { "text": "Phát triển phần mềm nhanh chóng", "isCorrect": false }
    ],
    "explanation": "Mô hình chữ V chỉ ra rằng mỗi pha phát triển (phân tích, thiết kế) đều có một mức kiểm thử tương ứng (kiểm thử hệ thống, kiểm thử tích hợp, kiểm thử đơn vị)."
  },
  {
    "id": 15,
    "question": "Hoạt động nào sau đây không phải là một phần của thẩm định phần mềm?",
    "options": [
      { "text": "Kiểm định (verification)", "isCorrect": false },
      { "text": "Kiểm thử (validation)", "isCorrect": false },
      { "text": "Phân tích rủi ro", "isCorrect": true },
      { "text": "Kiểm thử hệ thống", "isCorrect": false }
    ],
    "explanation": "Phân tích rủi ro là hoạt động của quản lý dự án (như trong mô hình xoắn ốc), không phải là hoạt động thuộc quá trình Thẩm định và Kiểm chứng (V&V)."
  },
  {
    "id": 16,
    "question": "Hoạt động thiết kế phần mềm bao gồm gì?",
    "options": [
      { "text": "Lập kế hoạch dự án", "isCorrect": false },
      { "text": "Thiết kế cấu trúc phần mềm để hiện thực hóa đặc tả", "isCorrect": true },
      { "text": "Kiểm thử phần mềm", "isCorrect": false },
      { "text": "Đặc tả yêu cầu", "isCorrect": false }
    ],
    "explanation": "Thiết kế phần mềm là việc chuyển đổi từ tài liệu đặc tả yêu cầu sang một bản thiết kế cấu trúc, kiến trúc hệ thống, cơ sở dữ liệu để đội lập trình có thể hiện thực hóa."
  },
  {
    "id": 17,
    "question": "Phát triển phần mềm hướng thành phần (component-based development) tập trung vào điều gì?",
    "options": [
      { "text": "Thiết kế từ đầu", "isCorrect": false },
      { "text": "Tái sử dụng các thành phần phần mềm có sẵn", "isCorrect": true },
      { "text": "Phát triển phần mềm nhanh chóng", "isCorrect": false },
      { "text": "Đảm bảo tính bảo mật cao", "isCorrect": false }
    ],
    "explanation": "Thay vì viết code lại từ đầu, phát triển hướng thành phần tập trung vào việc tìm, đánh giá và lắp ghép các module/thành phần đã có sẵn nhằm tiết kiệm chi phí và thời gian."
  },
  {
    "id": 18,
    "question": "Yêu cầu nào dưới đây thường được viết cho các khách hàng?",
    "options": [
      { "text": "Yêu cầu hệ thống", "isCorrect": false },
      { "text": "Yêu cầu người dùng", "isCorrect": true },
      { "text": "Yêu cầu chức năng", "isCorrect": false },
      { "text": "Yêu cầu phi chức năng", "isCorrect": false }
    ],
    "explanation": "Yêu cầu người dùng (User Requirements) được viết bằng ngôn ngữ tự nhiên, dễ hiểu để khách hàng và người sử dụng cuối có thể đọc và đồng thuận."
  },
  {
    "id": 19,
    "question": "Một trong những mục tiêu của việc quản lý yêu cầu là gì?",
    "options": [
      { "text": "Tăng tốc độ phát triển phần mềm", "isCorrect": false },
      { "text": "Đảm bảo yêu cầu được thực hiện đúng cách", "isCorrect": true },
      { "text": "Giảm chi phí phát triển", "isCorrect": false },
      { "text": "Tăng cường bảo mật hệ thống", "isCorrect": false }
    ],
    "explanation": "Quản lý yêu cầu giúp theo dõi, kiểm soát sự thay đổi, từ đó đảm bảo rằng các yêu cầu đã thống nhất sẽ được nhóm phát triển thực hiện đầy đủ và chính xác."
  },
  {
    "id": 20,
    "question": "Trong mô hình hóa hệ thống, mô hình nào biểu diễn ngữ cảnh và môi trường của hệ thống?",
    "options": [
      { "text": "Mô hình ngữ cảnh", "isCorrect": true },
      { "text": "Mô hình tương tác", "isCorrect": false },
      { "text": "Mô hình cấu trúc", "isCorrect": false },
      { "text": "Mô hình hành vi", "isCorrect": false }
    ],
    "explanation": "Mô hình ngữ cảnh (Context Model) xác định ranh giới của hệ thống, chỉ ra hệ thống sẽ tương tác với các thực thể môi trường nào ở bên ngoài."
  },
  {
    "id": 21,
    "question": "Yêu cầu chức năng là gì?",
    "options": [
      { "text": "Mô tả các dịch vụ hệ thống cung cấp", "isCorrect": true },
      { "text": "Mô tả các ràng buộc khi hệ thống hoạt động", "isCorrect": false },
      { "text": "Mô tả hiệu suất hệ thống", "isCorrect": false },
      { "text": "Mô tả giao diện người dùng", "isCorrect": false }
    ],
    "explanation": "Yêu cầu chức năng (Functional Requirements) là những mô tả hệ thống cần phải làm gì, cung cấp dịch vụ gì và phản ứng thế nào với các đầu vào."
  },
  {
    "id": 22,
    "question": "Yêu cầu phi chức năng là gì?",
    "options": [
      { "text": "Các yêu cầu không liên quan đến chức năng chính của hệ thống", "isCorrect": false },
      { "text": "Các yêu cầu về hiệu suất, bảo mật, độ tin cậy", "isCorrect": true },
      { "text": "Các yêu cầu về dịch vụ hệ thống cung cấp", "isCorrect": false },
      { "text": "Các yêu cầu về giao diện người dùng", "isCorrect": false }
    ],
    "explanation": "Yêu cầu phi chức năng (Non-functional Requirements) là các ràng buộc về hệ thống như thời gian phản hồi, bảo mật, độ ổn định và các tiêu chuẩn nền tảng."
  },
  {
    "id": 23,
    "question": "Quá trình nào bao gồm việc xác định và phân tích yêu cầu?",
    "options": [
      { "text": "Đặc tả yêu cầu", "isCorrect": false },
      { "text": "Thu thập yêu cầu", "isCorrect": true },
      { "text": "Kiểm chứng yêu cầu", "isCorrect": false },
      { "text": "Quản lý yêu cầu", "isCorrect": false }
    ],
    "explanation": "Quá trình Elicitation and Analysis (Thu thập và phân tích yêu cầu) là quá trình làm việc với khách hàng để khám phá, xác định và phân tích nhu cầu của họ."
  },
  {
    "id": 24,
    "question": "Kỹ thuật nào được sử dụng để ghi lại các yêu cầu chi tiết?",
    "options": [
      { "text": "Yêu cầu chức năng", "isCorrect": false },
      { "text": "Đặc tả yêu cầu", "isCorrect": true },
      { "text": "Phân tích yêu cầu", "isCorrect": false },
      { "text": "Kiểm chứng yêu cầu", "isCorrect": false }
    ],
    "explanation": "Đặc tả yêu cầu (Requirements Specification) là quá trình ghi chép lại yêu cầu một cách chính xác, chi tiết vào tài liệu (thường gọi là SRS)."
  },
  {
    "id": 25,
    "question": "Yêu cầu nào dưới đây thường được viết bằng ngôn ngữ tự nhiên?",
    "options": [
      { "text": "Yêu cầu hệ thống", "isCorrect": false },
      { "text": "Yêu cầu người dùng", "isCorrect": true },
      { "text": "Yêu cầu chức năng", "isCorrect": false },
      { "text": "Yêu cầu phi chức năng", "isCorrect": false }
    ],
    "explanation": "Yêu cầu người dùng được viết bằng ngôn ngữ tự nhiên không chứa thuật ngữ kỹ thuật phức tạp để khách hàng dễ dàng hiểu và xác nhận."
  },
  {
    "id": 26,
    "question": "Hoạt động kiểm chứng yêu cầu bao gồm gì?",
    "options": [
      { "text": "Xác định yêu cầu hệ thống", "isCorrect": false },
      { "text": "Đảm bảo yêu cầu chính xác và đầy đủ", "isCorrect": true },
      { "text": "Phân tích yêu cầu", "isCorrect": false },
      { "text": "Viết tài liệu yêu cầu", "isCorrect": false }
    ],
    "explanation": "Kiểm chứng yêu cầu (Requirements Validation) nhằm phát hiện lỗi trong tài liệu yêu cầu, đảm bảo chúng đầy đủ, nhất quán và phản ánh đúng ý muốn của người dùng."
  },
  {
    "id": 27,
    "question": "Quản lý yêu cầu bao gồm việc gì?",
    "options": [
      { "text": "Xác định yêu cầu", "isCorrect": false },
      { "text": "Theo dõi và kiểm soát các thay đổi yêu cầu", "isCorrect": true },
      { "text": "Phân tích yêu cầu", "isCorrect": false },
      { "text": "Đặc tả yêu cầu", "isCorrect": false }
    ],
    "explanation": "Trong suốt vòng đời dự án, yêu cầu thường xuyên thay đổi. Quản lý yêu cầu giúp theo dõi, đánh giá ảnh hưởng và kiểm soát các sự thay đổi này một cách có tổ chức."
  },
  {
    "id": 28,
    "question": "Yêu cầu nào sau đây không thuộc nhóm yêu cầu phi chức năng?",
    "options": [
      { "text": "Hiệu suất hệ thống", "isCorrect": false },
      { "text": "Bảo mật hệ thống", "isCorrect": false },
      { "text": "Giao diện người dùng", "isCorrect": true },
      { "text": "Độ tin cậy", "isCorrect": false }
    ],
    "explanation": "Giao diện người dùng (UI) thường được coi là một phần của yêu cầu chức năng hoặc một miền yêu cầu riêng biệt, trong khi Hiệu suất, Bảo mật, Độ tin cậy luôn là thuộc tính phi chức năng tiêu chuẩn."
  },
  {
    "id": 29,
    "question": "Yêu cầu người dùng thường được viết cho ai?",
    "options": [
      { "text": "Nhóm phát triển phần mềm", "isCorrect": false },
      { "text": "Khách hàng", "isCorrect": true },
      { "text": "Người quản lý dự án", "isCorrect": false },
      { "text": "Kỹ sư phần mềm", "isCorrect": false }
    ],
    "explanation": "Yêu cầu người dùng (User requirements) nhắm tới đối tượng đọc là khách hàng và cấp quản lý phía khách hàng, do đó không dùng ngôn ngữ kỹ thuật phức tạp."
  },
  {
    "id": 30,
    "question": "Yêu cầu hệ thống thường bao gồm gì?",
    "options": [
      { "text": "Mô tả các dịch vụ hệ thống cung cấp", "isCorrect": false },
      { "text": "Mô tả các ràng buộc khi hệ thống hoạt động", "isCorrect": false },
      { "text": "Mô tả chi tiết về các chức năng của hệ thống", "isCorrect": true },
      { "text": "Mô tả giao diện người dùng", "isCorrect": false }
    ],
    "explanation": "Yêu cầu hệ thống (System requirements) là tài liệu mở rộng từ yêu cầu người dùng, đi vào mô tả cực kỳ chi tiết chức năng, dịch vụ và ràng buộc để làm cơ sở cho lập trình."
  },
  {
    "id": 31,
    "question": "Phân loại yêu cầu giúp làm gì?",
    "options": [
      { "text": "Xác định chi phí phát triển", "isCorrect": false },
      { "text": "Gom nhóm các yêu cầu liên quan", "isCorrect": true },
      { "text": "Tăng tốc độ phát triển phần mềm", "isCorrect": false },
      { "text": "Đảm bảo tính bảo mật cao", "isCorrect": false }
    ],
    "explanation": "Việc phân loại (Classification) giúp tổ chức các yêu cầu lộn xộn thành các nhóm (module, chức năng liên quan) để dễ quản lý và kiến trúc hệ thống."
  },
  {
    "id": 32,
    "question": "Sàng lọc yêu cầu và đàm phán giúp làm gì?",
    "options": [
      { "text": "Xác định các yêu cầu quan trọng nhất", "isCorrect": true },
      { "text": "Đảm bảo yêu cầu chính xác và đầy đủ", "isCorrect": false },
      { "text": "Phân tích yêu cầu", "isCorrect": false },
      { "text": "Viết tài liệu yêu cầu", "isCorrect": false }
    ],
    "explanation": "Sàng lọc và đàm phán (Negotiation) nhằm ưu tiên hóa (prioritize) các yêu cầu, giải quyết xung đột giữa các bên liên quan và xác định những yêu cầu quan trọng nhất cần làm trước."
  },
  {
    "id": 33,
    "question": "Hoạt động nào dưới đây không thuộc quá trình thu thập và phân tích yêu cầu?",
    "options": [
      { "text": "Phát hiện yêu cầu", "isCorrect": false },
      { "text": "Phân loại yêu cầu", "isCorrect": false },
      { "text": "Đặc tả yêu cầu", "isCorrect": true },
      { "text": "Sàng lọc yêu cầu", "isCorrect": false }
    ],
    "explanation": "Đặc tả yêu cầu (Specification) là một giai đoạn riêng biệt dùng để viết tài liệu, diễn ra sau hoặc song song nhưng độc lập với các bước phân tích, thu thập ban đầu."
  },
  {
    "id": 34,
    "question": "Trong quá trình nhận diện yêu cầu, các bên liên quan có vai trò gì?",
    "options": [
      { "text": "Phát hiện các yêu cầu của họ", "isCorrect": true },
      { "text": "Viết tài liệu yêu cầu", "isCorrect": false },
      { "text": "Kiểm thử phần mềm", "isCorrect": false },
      { "text": "Thiết kế hệ thống", "isCorrect": false }
    ],
    "explanation": "Các bên liên quan (Stakeholders) là người trực tiếp sử dụng hoặc chịu ảnh hưởng, do đó họ đóng vai trò cung cấp, phát hiện và nói ra nhu cầu thực sự của hệ thống."
  },
  {
    "id": 35,
    "question": "Phân loại và tổ chức yêu cầu giúp làm gì?",
    "options": [
      { "text": "Phân loại các yêu cầu liên quan và tổ chức thành nhóm", "isCorrect": true },
      { "text": "Xác định yêu cầu hệ thống", "isCorrect": false },
      { "text": "Đặc tả yêu cầu", "isCorrect": false },
      { "text": "Kiểm chứng yêu cầu", "isCorrect": false }
    ],
    "explanation": "Gom cụm các yêu cầu có cấu trúc tương tự hoặc cùng một subsystem giúp cho việc thiết kế kiến trúc và mô-đun hóa dễ dàng hơn."
  },
  {
    "id": 36,
    "question": "Sàng lọc yêu cầu và đàm phán giúp giải quyết điều gì?",
    "options": [
      { "text": "Xung đột giữa các yêu cầu", "isCorrect": true },
      { "text": "Viết tài liệu yêu cầu", "isCorrect": false },
      { "text": "Kiểm chứng yêu cầu", "isCorrect": false },
      { "text": "Đặc tả yêu cầu", "isCorrect": false }
    ],
    "explanation": "Trong dự án, các bộ phận khách hàng thường có các yêu cầu chồng chéo hoặc mâu thuẫn. Đàm phán là bước bắt buộc để dung hòa và giải quyết xung đột này."
  },
  {
    "id": 37,
    "question": "Yêu cầu nào thường được sử dụng làm cơ sở để thương lượng hợp đồng?",
    "options": [
      { "text": "Yêu cầu chức năng", "isCorrect": false },
      { "text": "Yêu cầu phi chức năng", "isCorrect": false },
      { "text": "Yêu cầu người dùng", "isCorrect": true },
      { "text": "Yêu cầu hệ thống", "isCorrect": false }
    ],
    "explanation": "Yêu cầu người dùng (User requirements) cung cấp bức tranh toàn cảnh ở mức cao để nhà thầu và khách hàng dựa vào đó đề xuất giá cả và ký hợp đồng ban đầu."
  },
  {
    "id": 38,
    "question": "Trong quá trình phân tích yêu cầu, các yêu cầu về phạm vi thường được phát hiện ở giai đoạn nào?",
    "options": [
      { "text": "Phát hiện yêu cầu", "isCorrect": true },
      { "text": "Phân loại yêu cầu", "isCorrect": false },
      { "text": "Sàng lọc yêu cầu", "isCorrect": false },
      { "text": "Đặc tả yêu cầu", "isCorrect": false }
    ],
    "explanation": "Ở bước khám phá và phát hiện yêu cầu (Requirement discovery/elicitation), đội ngũ sẽ xác định các quy tắc kinh doanh (business rules) và phạm vi tổng quan của hệ thống."
  },
  {
    "id": 39,
    "question": "Yêu cầu nào dưới đây thường được sử dụng làm cơ sở viết hợp đồng?",
    "options": [
      { "text": "Yêu cầu chức năng", "isCorrect": false },
      { "text": "Yêu cầu phi chức năng", "isCorrect": false },
      { "text": "Yêu cầu người dùng", "isCorrect": false },
      { "text": "Yêu cầu hệ thống", "isCorrect": true }
    ],
    "explanation": "Mặc dù yêu cầu người dùng dùng để báo giá, nhưng khi viết hợp đồng phát triển phần mềm chi tiết (outsourcing), tài liệu Yêu cầu Hệ thống (System Req) thường được đính kèm thành phụ lục ràng buộc kỹ thuật."
  },
  {
    "id": 40,
    "question": "Quá trình thu thập và phân tích yêu cầu bao gồm mấy bước chính?",
    "options": [
      { "text": "2", "isCorrect": false },
      { "text": "3", "isCorrect": false },
      { "text": "4", "isCorrect": true },
      { "text": "5", "isCorrect": false }
    ],
    "explanation": "Gồm 4 bước: (1) Khám phá yêu cầu, (2) Phân loại và tổ chức, (3) Ưu tiên hóa và đàm phán, (4) Tài liệu hóa yêu cầu (Requirements documentation)."
  },
  {
    "id": 41,
    "question": "Mô hình hóa hệ thống là gì?",
    "options": [
      { "text": "Quá trình xây dựng phần mềm", "isCorrect": false },
      { "text": "Quá trình xây dựng các mô hình trừu tượng của hệ thống", "isCorrect": true },
      { "text": "Quá trình kiểm thử phần mềm", "isCorrect": false },
      { "text": "Quá trình triển khai phần mềm", "isCorrect": false }
    ],
    "explanation": "Mô hình hóa là việc biểu diễn hệ thống thông qua các sơ đồ trừu tượng (như UML) để con người dễ nhìn nhận, thảo luận và đánh giá kiến trúc hơn."
  },
  {
    "id": 42,
    "question": "Mô hình nào biểu diễn ngữ cảnh và môi trường của hệ thống?",
    "options": [
      { "text": "Mô hình ngữ cảnh", "isCorrect": true },
      { "text": "Mô hình tương tác", "isCorrect": false },
      { "text": "Mô hình cấu trúc", "isCorrect": false },
      { "text": "Mô hình hành vi", "isCorrect": false }
    ],
    "explanation": "Mô hình ngữ cảnh (Context Model) cho thấy bức tranh hệ thống trong mối quan hệ với các hệ thống bên ngoài và thực thể xung quanh nó."
  },
  {
    "id": 43,
    "question": "Ký hiệu đồ họa nào thường được sử dụng trong mô hình hóa hệ thống?",
    "options": [
      { "text": "UML (Unified Modeling Language)", "isCorrect": true },
      { "text": "BPMN (Business Process Model and Notation)", "isCorrect": false },
      { "text": "ERD (Entity-Relationship Diagram)", "isCorrect": false },
      { "text": "DFD (Data Flow Diagram)", "isCorrect": false }
    ],
    "explanation": "UML (Ngôn ngữ mô hình hóa thống nhất) là tiêu chuẩn công nghiệp hiện nay để mô tả, thiết kế các hệ thống phần mềm hướng đối tượng."
  },
  {
    "id": 44,
    "question": "Mô hình hóa hệ thống giúp làm gì?",
    "options": [
      { "text": "Hiểu chức năng của hệ thống và giao tiếp với khách hàng", "isCorrect": true },
      { "text": "Tăng tốc độ phát triển phần mềm", "isCorrect": false },
      { "text": "Đảm bảo tính bảo mật của hệ thống", "isCorrect": false },
      { "text": "Tăng hiệu suất hệ thống", "isCorrect": false }
    ],
    "explanation": "Biểu diễn hệ thống bằng hình ảnh (đồ họa) là phương tiện giao tiếp hiệu quả nhất giữa đội ngũ kỹ thuật và các khách hàng phi kỹ thuật."
  },
  {
    "id": 45,
    "question": "Mô hình nào giúp làm rõ hệ thống đã có làm được gì?",
    "options": [
      { "text": "Mô hình ngữ cảnh", "isCorrect": false },
      { "text": "Mô hình tương tác", "isCorrect": false },
      { "text": "Mô hình hệ thống đã có sẵn", "isCorrect": true },
      { "text": "Mô hình hệ thống mới", "isCorrect": false }
    ],
    "explanation": "Mô hình hệ thống hiện tại (As-Is model) được xây dựng ở giai đoạn đầu để nhóm phát triển phân tích được điểm mạnh, điểm yếu của quy trình cũ."
  },
  {
    "id": 46,
    "question": "Mô hình nào được sử dụng để giải thích các yêu cầu cho các bên liên quan?",
    "options": [
      { "text": "Mô hình ngữ cảnh", "isCorrect": false },
      { "text": "Mô hình tương tác", "isCorrect": false },
      { "text": "Mô hình hệ thống đã có sẵn", "isCorrect": false },
      { "text": "Mô hình hệ thống mới", "isCorrect": true }
    ],
    "explanation": "Mô hình hệ thống tương lai (To-Be model) thể hiện cách hệ thống mới sẽ đáp ứng các yêu cầu nghiệp vụ để khách hàng hình dung và xét duyệt."
  },
  {
    "id": 47,
    "question": "Góc nhìn bên ngoài (external perspective) trong mô hình hóa hệ thống biểu diễn gì?",
    "options": [
      { "text": "Ngữ cảnh và môi trường của hệ thống", "isCorrect": true },
      { "text": "Các thành phần bên trong hệ thống", "isCorrect": false },
      { "text": "Các tương tác giữa các thành phần hệ thống", "isCorrect": false },
      { "text": "Các hành vi của hệ thống", "isCorrect": false }
    ],
    "explanation": "Góc nhìn ngoại cảnh cho thấy hệ thống với tư cách là một hộp đen tương tác với thế giới bên ngoài (mô hình ngữ cảnh)."
  },
  {
    "id": 48,
    "question": "Góc nhìn bên trong (internal perspective) trong mô hình hóa hệ thống biểu diễn gì?",
    "options": [
      { "text": "Ngữ cảnh và môi trường của hệ thống", "isCorrect": false },
      { "text": "Các thành phần bên trong hệ thống", "isCorrect": true },
      { "text": "Các tương tác giữa các thành phần hệ thống", "isCorrect": false },
      { "text": "Các hành vi của hệ thống", "isCorrect": false }
    ],
    "explanation": "Góc nhìn bên trong tập trung vào cấu trúc (structure) nội tại, biểu diễn cách hệ thống được phân rã thành các module, các lớp (class)."
  },
  {
    "id": 49,
    "question": "Mô hình nào biểu diễn các tương tác giữa các thành phần của hệ thống?",
    "options": [
      { "text": "Mô hình ngữ cảnh", "isCorrect": false },
      { "text": "Mô hình tương tác", "isCorrect": true },
      { "text": "Mô hình cấu trúc", "isCorrect": false },
      { "text": "Mô hình hành vi", "isCorrect": false }
    ],
    "explanation": "Mô hình tương tác (Interaction model - ví dụ Sequence diagram) miêu tả cách các đối tượng gửi tin nhắn và phối hợp để thực hiện một use case."
  },
  {
    "id": 50,
    "question": "Mô hình nào biểu diễn cấu trúc của hệ thống?",
    "options": [
      { "text": "Mô hình ngữ cảnh", "isCorrect": false },
      { "text": "Mô hình tương tác", "isCorrect": false },
      { "text": "Mô hình cấu trúc", "isCorrect": true },
      { "text": "Mô hình hành vi", "isCorrect": false }
    ],
    "explanation": "Mô hình cấu trúc (Structural model - ví dụ Class diagram, Component diagram) thể hiện tĩnh các thành phần phần mềm tạo nên hệ thống."
  },
  {
    "id": 51,
    "question": "Mô hình nào biểu diễn các hành vi của hệ thống?",
    "options": [
      { "text": "Mô hình ngữ cảnh", "isCorrect": false },
      { "text": "Mô hình tương tác", "isCorrect": false },
      { "text": "Mô hình cấu trúc", "isCorrect": false },
      { "text": "Mô hình hành vi", "isCorrect": true }
    ],
    "explanation": "Mô hình hành vi (Behavioral model - ví dụ State diagram, Activity diagram) biểu diễn trạng thái hoặc luồng dữ liệu khi hệ thống xử lý hoạt động."
  },
  {
    "id": 52,
    "question": "Mô hình hóa hệ thống giúp gì trong quá trình phát triển phần mềm?",
    "options": [
      { "text": "Giảm chi phí phát triển", "isCorrect": false },
      { "text": "Tăng cường bảo mật hệ thống", "isCorrect": false },
      { "text": "Hiểu rõ yêu cầu và thiết kế hệ thống", "isCorrect": true },
      { "text": "Tăng hiệu suất hệ thống", "isCorrect": false }
    ],
    "explanation": "Bằng cách ẩn đi các chi tiết kỹ thuật dư thừa (trừu tượng hóa), mô hình hóa giúp tập trung vào làm rõ bài toán và thiết kế kiến trúc chuẩn xác."
  },
  {
    "id": 53,
    "question": "Ký hiệu UML trong mô hình hóa hệ thống giúp làm gì?",
    "options": [
      { "text": "Biểu diễn các mô hình trừu tượng của hệ thống", "isCorrect": true },
      { "text": "Tăng tốc độ phát triển phần mềm", "isCorrect": false },
      { "text": "Đảm bảo tính bảo mật của hệ thống", "isCorrect": false },
      { "text": "Tăng hiệu suất hệ thống", "isCorrect": false }
    ],
    "explanation": "UML cung cấp 13 loại biểu đồ chuẩn quốc tế (diagrams) để biểu diễn mọi khía cạnh trừu tượng từ thiết kế tĩnh đến hành vi động của hệ thống."
  },
  {
    "id": 54,
    "question": "Mô hình nào được sử dụng để thảo luận về các điểm mạnh và yếu của hệ thống?",
    "options": [
      { "text": "Mô hình ngữ cảnh", "isCorrect": false },
      { "text": "Mô hình tương tác", "isCorrect": false },
      { "text": "Mô hình hệ thống đã có sẵn", "isCorrect": true },
      { "text": "Mô hình hệ thống mới", "isCorrect": false }
    ],
    "explanation": "Phân tích mô hình hệ thống cũ/hiện tại là cách tốt nhất để tìm ra các bottleneck (nút thắt) và điểm yếu cần khắc phục trong hệ thống mới."
  },
  {
    "id": 55,
    "question": "Mô hình nào giúp xác định các yêu cầu chức năng và phi chức năng của hệ thống?",
    "options": [
      { "text": "Mô hình ngữ cảnh", "isCorrect": false },
      { "text": "Mô hình tương tác", "isCorrect": false },
      { "text": "Mô hình hệ thống đã có sẵn", "isCorrect": false },
      { "text": "Mô hình hệ thống mới", "isCorrect": true }
    ],
    "explanation": "Mô hình hệ thống tương lai thể hiện các chức năng mới (Use Cases), qua đó giúp phân rã và xác định đầy đủ các yêu cầu cần phải code."
  },
  {
    "id": 56,
    "question": "Mô hình hóa ngữ cảnh giúp làm gì?",
    "options": [
      { "text": "Biểu diễn các dịch vụ hệ thống cung cấp", "isCorrect": false },
      { "text": "Xác định các yêu cầu chức năng và phi chức năng", "isCorrect": false },
      { "text": "Xác định các yêu cầu người dùng", "isCorrect": false },
      { "text": "Hiểu ngữ cảnh và môi trường của hệ thống", "isCorrect": true }
    ],
    "explanation": "Vẽ ranh giới hệ thống giúp nhà thiết kế biết được phần mềm phải giao tiếp với API bên ngoài nào, hardware nào, nhân sự nào (Môi trường/Ngữ cảnh)."
  },
  {
    "id": 57,
    "question": "Góc nhìn bên ngoài trong mô hình hóa hệ thống giúp làm gì?",
    "options": [
      { "text": "Hiểu rõ các tương tác giữa các thành phần hệ thống", "isCorrect": false },
      { "text": "Hiểu ngữ cảnh và môi trường của hệ thống", "isCorrect": true },
      { "text": "Xác định các yêu cầu người dùng", "isCorrect": false },
      { "text": "Biểu diễn các hành vi của hệ thống", "isCorrect": false }
    ],
    "explanation": "Góc nhìn bên ngoài (External View) không quan tâm nội bộ bên trong có gì, nó chỉ mô tả môi trường sinh thái mà phần mềm đó sẽ hoạt động bên trong."
  },
  {
    "id": 58,
    "question": "Mô hình nào giúp hiểu các tương tác giữa hệ thống và các bên liên quan?",
    "options": [
      { "text": "Mô hình ngữ cảnh", "isCorrect": false },
      { "text": "Mô hình tương tác", "isCorrect": true },
      { "text": "Mô hình cấu trúc", "isCorrect": false },
      { "text": "Mô hình hành vi", "isCorrect": false }
    ],
    "explanation": "Mô hình tương tác (Interaction models), cụ thể như Use Case Diagram, giúp chỉ ra rõ ràng cách một Actor (bên liên quan) thao tác với hệ thống ra sao."
  },
  {
    "id": 59,
    "question": "Mô hình nào giúp làm rõ cấu trúc bên trong của hệ thống?",
    "options": [
      { "text": "Mô hình ngữ cảnh", "isCorrect": false },
      { "text": "Mô hình tương tác", "isCorrect": false },
      { "text": "Mô hình cấu trúc", "isCorrect": true },
      { "text": "Mô hình hành vi", "isCorrect": false }
    ],
    "explanation": "Mô hình cấu trúc (ví dụ Sơ đồ Lớp - Class Diagram) biểu diễn cách mã nguồn và dữ liệu được đóng gói vào các module tĩnh nội bộ."
  },
  {
    "id": 60,
    "question": "Mô hình hành vi giúp làm gì?",
    "options": [
      { "text": "Hiểu ngữ cảnh và môi trường của hệ thống", "isCorrect": false },
      { "text": "Biểu diễn các tương tác giữa các thành phần hệ thống", "isCorrect": false },
      { "text": "Biểu diễn cấu trúc của hệ thống", "isCorrect": false },
      { "text": "Biểu diễn các hành vi của hệ thống", "isCorrect": true }
    ],
    "explanation": "Thể hiện các động thái của phần mềm (hành vi) để đáp lại các sự kiện (events), ví dụ cách hệ thống xử lý một luồng dữ liệu (Data-driven) hoặc trạng thái (Event-driven)."
  }
];

export default function App() {
  const [started, setStarted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const currentQuestion = questionsData[currentIndex];
  const hasAnswered = answers[currentIndex] !== undefined;
  const currentAnswer = answers[currentIndex];

  const handleStart = () => {
    setStarted(true);
  };

  const handleSelectOption = (optionIndex) => {
    if (hasAnswered) return;

    const isCorrect = currentQuestion.options[optionIndex].isCorrect;
    setAnswers({
      ...answers,
      [currentIndex]: {
        selected: optionIndex,
        isCorrect: isCorrect
      }
    });
  };

  const handleNext = () => {
    if (currentIndex < questionsData.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setShowResults(true);
    }
  };

  const handleRestart = () => {
    setStarted(false);
    setCurrentIndex(0);
    setAnswers({});
    setShowResults(false);
  };

  // MÀN HÌNH BẮT ĐẦU
  if (!started) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-sans text-slate-800">
        <div className="bg-white max-w-lg w-full rounded-2xl shadow-xl overflow-hidden border border-slate-100">
          <div className="bg-blue-600 p-8 text-center">
            <h1 className="text-3xl font-bold text-white mb-2">Bài Trắc Nghiệm</h1>
            <p className="text-blue-100">Kiểm tra kiến thức của bạn qua {questionsData.length} câu hỏi</p>
          </div>
          <div className="p-8 flex flex-col items-center">
            <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mb-6">
              <CheckCircle2 className="w-10 h-10 text-blue-600" />
            </div>
            <ul className="text-slate-600 space-y-3 mb-8 w-full max-w-sm">
              <li className="flex items-center gap-2"><Check className="w-5 h-5 text-green-500" /> Trả lời xong sẽ biết đúng/sai ngay</li>
              <li className="flex items-center gap-2"><Check className="w-5 h-5 text-green-500" /> Có lời giải thích chi tiết cho từng câu</li>
              <li className="flex items-center gap-2"><Check className="w-5 h-5 text-green-500" /> Xem lại các câu sai ở cuối bài</li>
            </ul>
            <button
              onClick={handleStart}
              className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-all shadow-md hover:shadow-lg active:scale-95"
            >
              <Play className="w-5 h-5" fill="currentColor" />
              Bắt đầu làm bài
            </button>
          </div>
        </div>
      </div>
    );
  }

  // MÀN HÌNH KẾT QUẢ VÀ XEM LẠI
  if (showResults) {
    const correctCount = Object.values(answers).filter(a => a.isCorrect).length;
    const totalQuestions = questionsData.length;
    const scorePercentage = Math.round((correctCount / totalQuestions) * 100);
    const wrongQuestions = questionsData.filter((_, idx) => !answers[idx]?.isCorrect);

    return (
      <div className="min-h-screen bg-slate-50 py-10 px-4 font-sans text-slate-800">
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Box Tổng kết */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 text-center">
            <h2 className="text-3xl font-bold text-slate-800 mb-6">Hoàn thành bài thi!</h2>

            <div className="relative w-40 h-40 mx-auto mb-6">
              <svg className="w-full h-full" viewBox="0 0 36 36">
                <path
                  style={{ color: '#f1f5f9' }}
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                />
                <path
                  style={{ color: scorePercentage >= 50 ? '#22c55e' : '#f97316' }}
                  strokeDasharray={`${scorePercentage}, 100`}
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-bold">{correctCount}/{totalQuestions}</span>
              </div>
            </div>

            <p className="text-lg text-slate-600 mb-8">
              {scorePercentage >= 80 ? "Xuất sắc! Bạn nắm kiến thức rất vững." :
               scorePercentage >= 50 ? "Khá tốt! Nhưng vẫn còn điểm có thể cải thiện." :
               "Đừng buồn! Hãy xem lại các câu sai và thử lại nhé."}
            </p>

            <button
              onClick={handleRestart}
              className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-xl transition-all shadow-md"
            >
              <RotateCcw className="w-5 h-5" />
              Làm lại bài
            </button>
          </div>

          {/* Danh sách câu sai */}
          {wrongQuestions.length > 0 && (
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                <AlertCircle className="w-6 h-6 text-orange-500" />
                Các câu hỏi bạn đã trả lời sai ({wrongQuestions.length})
              </h3>

              <div className="space-y-8">
                {wrongQuestions.map((q) => {
                  const qIndex = questionsData.findIndex(item => item.id === q.id);
                  const userAnswerIdx = answers[qIndex]?.selected;

                  return (
                    <div key={q.id} style={{ paddingBottom: '2rem', borderBottom: '1px solid #f1f5f9' }}>
                      <p className="font-semibold text-lg text-slate-800 mb-4">
                        Câu {qIndex + 1}: {q.question}
                      </p>

                      <div className="space-y-2 mb-4">
                        {q.options.map((opt, oIdx) => {
                          const isUserChoice = oIdx === userAnswerIdx;
                          const isCorrectChoice = opt.isCorrect;

                          let style = { background: '#f8fafc', border: '1px solid #e2e8f0', color: '#475569' };
                          if (isCorrectChoice) style = { background: '#dcfce7', border: '1px solid #22c55e', color: '#166534', fontWeight: '500' };
                          else if (isUserChoice) style = { background: '#fee2e2', border: '1px solid #ef4444', color: '#991b1b', textDecoration: 'line-through', opacity: '0.7' };

                          return (
                            <div key={oIdx} style={{ ...style, padding: '0.75rem', borderRadius: '0.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <span>{opt.text}</span>
                              {isCorrectChoice && <CheckCircle2 className="w-5 h-5 text-green-600" />}
                              {isUserChoice && !isCorrectChoice && <XCircle className="w-5 h-5 text-red-600" />}
                            </div>
                          );
                        })}
                      </div>

                      <div style={{ background: '#eff6ff', borderLeft: '4px solid #3b82f6', padding: '1rem', borderRadius: '0 0.5rem 0.5rem 0' }}>
                        <p className="text-sm font-semibold text-blue-800 mb-1">Giải thích:</p>
                        <p className="text-sm text-blue-900">{q.explanation}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // MÀN HÌNH LÀM BÀI TRẮC NGHIỆM
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center py-10 px-4 font-sans text-slate-800">
      <div className="max-w-2xl w-full">

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between text-sm font-medium text-slate-500 mb-2">
            <span>Câu hỏi {currentIndex + 1} / {questionsData.length}</span>
            <span>{Math.round(((currentIndex) / questionsData.length) * 100)}% Hoàn thành</span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2.5">
            <div
              className="bg-blue-600 h-2.5 rounded-full transition-all duration-500"
              style={{ width: `${((currentIndex) / questionsData.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-6">
            <h2 style={{ fontSize: '1.2rem', fontWeight: '700', color: '#1e293b', marginBottom: '1.5rem', lineHeight: '1.6' }}>
              {currentQuestion.question}
            </h2>

            <div className="space-y-3">
              {currentQuestion.options.map((option, index) => {
                const isSelected = hasAnswered && currentAnswer.selected === index;
                const isCorrect = option.isCorrect;

                let style = {
                  width: '100%',
                  textAlign: 'left',
                  padding: '1rem',
                  borderRadius: '0.75rem',
                  border: '2px solid',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  cursor: hasAnswered ? 'default' : 'pointer',
                  transition: 'all 200ms',
                  background: '#ffffff',
                  borderColor: '#e2e8f0',
                  color: '#1e293b',
                };

                if (hasAnswered) {
                  if (isCorrect) {
                    style = { ...style, borderColor: '#22c55e', background: '#f0fdf4', color: '#14532d', fontWeight: '600' };
                  } else if (isSelected && !isCorrect) {
                    style = { ...style, borderColor: '#ef4444', background: '#fef2f2', color: '#7f1d1d' };
                  } else {
                    style = { ...style, borderColor: '#f1f5f9', background: '#f8fafc', color: '#94a3b8', opacity: '0.5' };
                  }
                }

                return (
                  <button
                    key={index}
                    onClick={() => handleSelectOption(index)}
                    disabled={hasAnswered}
                    style={style}
                  >
                    <span>{option.text}</span>
                    {hasAnswered && isCorrect && <CheckCircle2 className="w-6 h-6 text-green-600" />}
                    {hasAnswered && isSelected && !isCorrect && <XCircle className="w-6 h-6 text-red-600" />}
                  </button>
                );
              })}
            </div>

            {/* Feedback & Explanation */}
            {hasAnswered && (
              <div style={{
                marginTop: '1.5rem',
                padding: '1.25rem',
                borderRadius: '0.75rem',
                border: '1px solid',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '1rem',
                animation: 'fadeIn 0.3s ease-out',
                background: currentAnswer.isCorrect ? '#f0fdf4' : '#fef2f2',
                borderColor: currentAnswer.isCorrect ? '#bbf7d0' : '#fecaca',
              }}>
                <div style={{ flexShrink: 0, marginTop: '0.125rem' }}>
                  {currentAnswer.isCorrect ?
                    <CheckCircle2 className="w-7 h-7 text-green-600" /> :
                    <XCircle className="w-7 h-7 text-red-600" />
                  }
                </div>
                <div>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '0.25rem', color: currentAnswer.isCorrect ? '#166534' : '#991b1b' }}>
                    {currentAnswer.isCorrect ? 'Chính xác!' : 'Sai rồi!'}
                  </h4>
                  <p style={{ fontSize: '0.875rem', color: '#334155', lineHeight: '1.6' }}>
                    {currentQuestion.explanation}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div style={{ padding: '1rem', background: '#f8fafc', borderTop: '1px solid #f1f5f9', display: 'flex', justifyContent: 'flex-end' }}>
            {hasAnswered ? (
              <button
                onClick={handleNext}
                style={{
                  display: 'flex', alignItems: 'center', gap: '0.5rem',
                  background: '#2563eb', color: '#ffffff', fontWeight: '600',
                  padding: '0.625rem 1.5rem', borderRadius: '0.5rem',
                  cursor: 'pointer', border: 'none', fontSize: '1rem'
                }}
              >
                {currentIndex < questionsData.length - 1 ? (
                  <>Câu tiếp theo <ArrowRight className="w-5 h-5" /></>
                ) : (
                  <>Xem kết quả <CheckCircle2 className="w-5 h-5" /></>
                )}
              </button>
            ) : (
              <div style={{ color: '#94a3b8', fontSize: '0.875rem', fontStyle: 'italic', padding: '0.625rem 0' }}>
                Vui lòng chọn một đáp án để tiếp tục
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        button:not(:disabled):hover {
          filter: brightness(0.97);
        }
      `}</style>
    </div>
  );
}
