import { ref, computed } from 'vue';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  updateProfile,
  type User,
} from 'firebase/auth';
import { auth } from '@/services/firebase';

const currentUser = ref<User | null>(null);
const loading = ref(true);
const error = ref<string | null>(null);

// Initialize auth state listener
onAuthStateChanged(auth, (user) => {
  currentUser.value = user;
  loading.value = false;
});

export function useAuth() {
  const isAuthenticated = computed(() => !!currentUser.value);

  /**
   * Register a new user with email and password
   */
  const register = async (email: string, password: string, displayName?: string) => {
    error.value = null;
    loading.value = true;

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      // Update display name if provided
      if (displayName && userCredential.user) {
        await updateProfile(userCredential.user, { displayName });
      }

      currentUser.value = userCredential.user;
      return { success: true, user: userCredential.user };
    } catch (err: unknown) {
      const code = isFirebaseError(err) ? err.code : 'unknown';
      const errorMessage = getFirebaseErrorMessage(code);
      error.value = errorMessage;
      return { success: false, error: errorMessage };
    } finally {
      loading.value = false;
    }
  };

  /**
   * Sign in with email and password
   */
  const login = async (email: string, password: string) => {
    error.value = null;
    loading.value = true;

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      currentUser.value = userCredential.user;
      return { success: true, user: userCredential.user };
    } catch (err: unknown) {
      const code = isFirebaseError(err) ? err.code : 'unknown';
      const errorMessage = getFirebaseErrorMessage(code);
      error.value = errorMessage;
      return { success: false, error: errorMessage };
    } finally {
      loading.value = false;
    }
  };

  /**
   * Sign out current user
   */
  const logout = async () => {
    error.value = null;
    loading.value = true;

    try {
      await signOut(auth);
      currentUser.value = null;
      return { success: true };
    } catch (err: unknown) {
      const code = isFirebaseError(err) ? err.code : 'unknown';
      const errorMessage = getFirebaseErrorMessage(code);
      error.value = errorMessage;
      return { success: false, error: errorMessage };
    } finally {
      loading.value = false;
    }
  };

  /**
   * Sign in with Google popup
   */
  const loginWithGoogle = async () => {
    error.value = null;
    loading.value = true;

    try {
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      currentUser.value = userCredential.user;
      return { success: true, user: userCredential.user };
    } catch (err: unknown) {
      const code = isFirebaseError(err) ? err.code : 'unknown';
      const errorMessage = getFirebaseErrorMessage(code);
      error.value = errorMessage;
      return { success: false, error: errorMessage };
    } finally {
      loading.value = false;
    }
  };

  /**
   * Get current user's ID token
   */
  const getIdToken = async (): Promise<string | null> => {
    if (!currentUser.value) return null;
    try {
      return await currentUser.value.getIdToken();
    } catch (err) {
      console.error('Error getting ID token:', err);
      return null;
    }
  };

  /**
   * Get user display name or email
   */
  const getUserDisplayName = computed(() => {
    if (!currentUser.value) return '';
    return currentUser.value.displayName || currentUser.value.email || 'User';
  });

  return {
    // State
    currentUser,
    loading,
    error,
    isAuthenticated,
    getUserDisplayName,

    // Methods
    register,
    login,
    loginWithGoogle,
    logout,
    getIdToken,
  };
}

/**
 * Convert Firebase error codes to user-friendly messages
 */
function getFirebaseErrorMessage(code: string): string {
  const errorMessages: Record<string, string> = {
    'auth/email-already-in-use': 'Email đã được sử dụng',
    'auth/invalid-email': 'Email không hợp lệ',
    'auth/operation-not-allowed': 'Thao tác không được phép',
    'auth/weak-password': 'Mật khẩu quá yếu (tối thiểu 6 ký tự)',
    'auth/user-disabled': 'Tài khoản đã bị vô hiệu hóa',
    'auth/user-not-found': 'Không tìm thấy tài khoản',
    'auth/wrong-password': 'Mật khẩu không đúng',
    'auth/invalid-credential': 'Thông tin đăng nhập không hợp lệ',
    'auth/too-many-requests': 'Quá nhiều yêu cầu. Vui lòng thử lại sau',
    'auth/network-request-failed': 'Lỗi kết nối mạng',
  };

  return errorMessages[code] || 'Đã xảy ra lỗi. Vui lòng thử lại';
}

interface FirebaseError {
  code: string;
}

function isFirebaseError(err: unknown): err is FirebaseError {
  return typeof err === 'object' && err !== null && 'code' in err;
}
