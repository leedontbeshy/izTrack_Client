# Donate Feature - Trang ủng hộ

## 📋 Tổng quan

Trang Donate cho phép người dùng ủng hộ dự án izTrack thông qua các phương thức thanh toán phổ biến tại Việt Nam.

## 🎯 Tính năng

### Phương thức thanh toán được hỗ trợ:

1. **MB Bank** - Ngân hàng Quân đội
2. **MoMo** - Ví điện tử MoMo
3. **ShopeePay** - Ví điện tử Shopee
4. **Techcombank** - Ngân hàng Kỹ thương
5. **Vietcombank** - Ngân hàng Ngoại thương
6. **ZaloPay** - Ví điện tử ZaloPay

### UI/UX Features:

✅ **Grid Layout** - Hiển thị 6 phương thức thanh toán dạng grid 2x3 (mobile) hoặc 3x2 (desktop)
✅ **Interactive Cards** - Hover effects và active states
✅ **QR Code Display** - Hiển thị mã QR khi chọn phương thức
✅ **Back Navigation** - Nút quay về trang chủ ở header
✅ **Dark Theme** - Phù hợp với thiết kế tổng thể
✅ **Responsive** - Tối ưu cho mobile và desktop
✅ **Smooth Transitions** - Animation fade khi chuyển QR
✅ **Error Handling** - Hiển thị placeholder khi ảnh QR lỗi

## 📁 Cấu trúc files

```
client/
├── public/
│   └── donate/
│       ├── mbbank.jpg      # QR MB Bank
│       ├── momo.jpg         # QR MoMo
│       ├── sppay.jpg        # QR ShopeePay
│       ├── techcombank.jpg  # QR Techcombank
│       ├── vcb.jpg          # QR Vietcombank
│       └── zalopay.jpg      # QR ZaloPay
└── src/
    └── components/
        └── donate/
            └── DonateView.vue
```

## 🎨 Color Scheme

Mỗi phương thức thanh toán có màu đặc trưng:

- **MB Bank**: `#0B4A9D` (Xanh đậm)
- **MoMo**: `#A50064` (Hồng đậm)
- **ShopeePay**: `#EE4D2D` (Cam)
- **Techcombank**: `#00AB4E` (Xanh lá)
- **Vietcombank**: `#007BC3` (Xanh dương)
- **ZaloPay**: `#0068FF` (Xanh blue)

## 🚀 Sử dụng

### Từ Header:

1. Click nút **"DONATE"** trên header
2. Trang Donate hiển thị với 6 phương thức thanh toán
3. Click vào phương thức muốn sử dụng
4. Mã QR hiển thị
5. Quét mã QR để thực hiện chuyển khoản
6. Click **"Quay về trang chủ"** để quay lại

### Component API:

```vue
<DonateView @back-to-home="handleBackToHome" />
```

**Events:**

- `back-to-home` - Emit khi user click nút quay về

## 📸 Layout

```
┌────────────────────────────────────────┐
│  ← Quay về trang chủ      izTrack     │
├────────────────────────────────────────┤
│                                        │
│           ỦNG HỘ                       │
│    Cảm ơn bạn đã muốn ủng hộ...       │
│                                        │
│  ┌────────┐  ┌────────┐  ┌────────┐  │
│  │   MB   │  │  MoMo  │  │   SP   │  │
│  │ MBBank │  │  MoMo  │  │ShopeePay│ │
│  └────────┘  └────────┘  └────────┘  │
│                                        │
│  ┌────────┐  ┌────────┐  ┌────────┐  │
│  │  TCB   │  │  VCB   │  │   ZP   │  │
│  │Techcom │  │Vietcom │  │ ZaloPay│  │
│  └────────┘  └────────┘  └────────┘  │
│                                        │
│  ┌──────────────────────────────────┐ │
│  │                                  │ │
│  │         QR CODE IMAGE            │ │
│  │                                  │ │
│  │  Ngân hàng: MB Bank              │ │
│  │  Vui lòng quét mã QR...          │ │
│  │                                  │ │
│  │  ❤️ Cảm ơn sự ủng hộ!            │ │
│  └──────────────────────────────────┘ │
│                                        │
│   © 2025 izTrack - Vietnam...         │
└────────────────────────────────────────┘
```

## 🔧 Customization

### Thêm phương thức thanh toán mới:

1. Thêm ảnh QR vào `/public/donate/`
2. Cập nhật `paymentMethods` array trong `DonateView.vue`:

```typescript
const paymentMethods: PaymentMethod[] = [
  // ... existing methods
  {
    id: 'newbank', // Tên file ảnh (không có .jpg)
    name: 'New Bank', // Tên hiển thị đầy đủ
    label: 'NB', // Label ngắn gọn
    color: '#FF0000', // Màu brand
  },
];
```

### Thay đổi layout grid:

```vue
<!-- Hiện tại: 2 cột mobile, 3 cột desktop -->
<div class="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8"></div>
```

## 🎯 Best Practices

1. **Ảnh QR Code**:
   - Format: JPG hoặc PNG
   - Kích thước đề xuất: 800x800px hoặc 1000x1000px
   - Nên có padding xung quanh QR code
   - Background trắng

2. **Naming Convention**:
   - Tên file: lowercase, không dấu
   - Ví dụ: `mbbank.jpg`, `momo.jpg`
   - ID trong code phải khớp với tên file

3. **Error Handling**:
   - Component tự động hiển thị placeholder nếu ảnh lỗi
   - Kiểm tra console để debug ảnh không load

## 🐛 Troubleshooting

### Ảnh QR không hiển thị:

1. Kiểm tra file tồn tại trong `/public/donate/`
2. Kiểm tra tên file khớp với `id` trong `paymentMethods`
3. Kiểm tra extension file (.jpg)
4. Reload page

### Layout bị vỡ:

1. Kiểm tra Tailwind CSS đã load
2. Kiểm tra custom CSS trong `<style scoped>`
3. Test responsive trên nhiều kích thước màn hình

## 📝 Notes

- Component này độc lập, không cần authentication
- QR codes được serve từ `/public` folder
- Tất cả styling sử dụng dark theme variables
- Animations sử dụng CSS transitions và keyframes
- Mobile-first responsive design
