# Authentication Components

Thư mục này chứa các components liên quan đến authentication.

## Components

### AuthView.vue

Component chính cho trang authentication, có thể toggle giữa login và register.

**Usage:**

```vue
<AuthView @auth-success="handleAuthSuccess" />
```

**Events:**

- `auth-success` - Được emit khi đăng nhập/đăng ký thành công

---

### LoginForm.vue

Form đăng nhập với email và password.

**Usage:**

```vue
<LoginForm @login-success="handleLoginSuccess" @switch-to-register="showRegister" />
```

**Events:**

- `login-success` - Được emit khi đăng nhập thành công
- `switch-to-register` - Được emit khi user click "Đăng ký ngay"

---

### RegisterForm.vue

Form đăng ký tài khoản mới với tên hiển thị, email, password và xác nhận password.

**Usage:**

```vue
<RegisterForm @register-success="handleRegisterSuccess" @switch-to-login="showLogin" />
```

**Events:**

- `register-success` - Được emit khi đăng ký thành công
- `switch-to-login` - Được emit khi user click "Đăng nhập ngay"

---

## Sử dụng với useAuth composable

```typescript
import { useAuth } from '@/composables/useAuth';

const { isAuthenticated, currentUser, getUserDisplayName, login, register, logout } = useAuth();
```

## Validation

- Email: Phải đúng format email
- Password: Tối thiểu 6 ký tự
- Confirm Password: Phải khớp với password
- Display Name: Required khi đăng ký

## Error Handling

Tất cả error messages đều bằng tiếng Việt và được xử lý từ Firebase error codes.
