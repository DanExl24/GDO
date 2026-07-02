import { boot } from 'quasar/wrappers';
import { useAuthStore } from 'stores/auth';

export default boot(() => {
  // Restore session on boot
  const authStore = useAuthStore();
  authStore.restoreSession();
});
