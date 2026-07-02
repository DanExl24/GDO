import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

interface AuthUser {
  id: number;
  documento: string;
  nombre: string;
  apellido: string;
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<AuthUser | null>(null);
  const role = ref<'admin' | 'user' | null>(null);
  const isAuthenticated = computed(() => role.value !== null);

  function loginAsAdmin() {
    role.value = 'admin';
    user.value = null;

    // Persistir sesión
    localStorage.setItem('auth_role', 'admin');
    localStorage.removeItem('auth_user');
  }

  function loginAsUser(usuario: AuthUser) {
    role.value = 'user';
    user.value = usuario;

    localStorage.setItem('auth_role', 'user');
    localStorage.setItem('auth_user', JSON.stringify(usuario));
  }

  function logout() {
    role.value = null;
    user.value = null;

    localStorage.removeItem('auth_role');
    localStorage.removeItem('auth_user');
  }

  function restoreSession() {
    const savedRole = localStorage.getItem('auth_role');
    const savedUser = localStorage.getItem('auth_user');

    if (savedRole === 'admin') {
      role.value = 'admin';
    } else if (savedRole === 'user' && savedUser) {
      role.value = 'user';
      user.value = JSON.parse(savedUser);
    }
  }

  return {
    user,
    role,
    isAuthenticated,
    loginAsAdmin,
    loginAsUser,
    logout,
    restoreSession,
  };
});
