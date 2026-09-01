<template>
  <div class="gradient-bg login-container">
    <!-- Animated background circles -->
    <div class="login-bg-circles">
      <div class="circle circle-1"></div>
      <div class="circle circle-2"></div>
      <div class="circle circle-3"></div>
    </div>

    <div class="glass-card login-card">
      <!-- Logo / Title -->
      <div class="q-mb-lg text-center">
        <q-icon name="cloud_sync" size="56px" color="primary" />
        <h1 class="login-title">OfflineOnline</h1>
        <p class="login-subtitle">Sistema de Gestión de Datos</p>
      </div>

      <!-- Toggle Admin / User -->
      <q-tabs
        v-model="loginType"
        dense
        class="q-mb-lg"
        active-color="primary"
        indicator-color="primary"
        align="center"
        narrow-indicator
        style="background: rgba(255,255,255,0.03); border-radius: 12px;"
      >
        <q-tab name="user" label="Usuario" icon="person" />
        <q-tab name="admin" label="Admin" icon="admin_panel_settings" />
      </q-tabs>

      <!-- User Login -->
      <div v-if="loginType === 'user'">
        <q-input
          v-model="documento"
          label="Documento de identidad"
          outlined
          dark
          dense
          type="text"
          maxlength="10"
          class="q-mb-md"
          :rules="[val => !!val || 'Ingrese su documento']"
          @keyup.enter="handleLogin"
        >
          <template v-slot:prepend>
            <q-icon name="badge" color="primary" />
          </template>
        </q-input>

        <q-input
          v-model="userPass"
          label="Contraseña"
          outlined
          dark
          dense
          :type="showUserPassword ? 'text' : 'password'"
          class="q-mb-md"
          @keyup.enter="handleLogin"
        >
          <template v-slot:prepend>
            <q-icon name="lock" color="primary" />
          </template>
          <template v-slot:append>
            <q-icon
              :name="showUserPassword ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="showUserPassword = !showUserPassword"
            />
          </template>
        </q-input>
      </div>

      <!-- Admin Login -->
      <div v-else>
        <q-input
          v-model="adminUser"
          label="Usuario administrador"
          outlined
          dark
          dense
          class="q-mb-sm"
          @keyup.enter="handleLogin"
        >
          <template v-slot:prepend>
            <q-icon name="person" color="primary" />
          </template>
        </q-input>
        <q-input
          v-model="adminPass"
          label="Contraseña"
          outlined
          dark
          dense
          :type="showPassword ? 'text' : 'password'"
          class="q-mb-md"
          @keyup.enter="handleLogin"
        >
          <template v-slot:prepend>
            <q-icon name="lock" color="primary" />
          </template>
          <template v-slot:append>
            <q-icon
              :name="showPassword ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="showPassword = !showPassword"
            />
          </template>
        </q-input>
      </div>

      <!-- Login Button -->
      <q-btn
        unelevated
        color="primary"
        text-color="dark"
        label="Ingresar"
        class="full-width q-py-sm"
        :loading="loading"
        style="border-radius: 12px; font-weight: 700; font-size: 15px;"
        @click="handleLogin"
      />

      <!-- Error message -->
      <transition name="sync-progress">
        <q-banner
          v-if="errorMsg"
          dense
          class="q-mt-md text-negative"
          style="background: rgba(244,67,54,0.1); border-radius: 8px; border: 1px solid rgba(244,67,54,0.2);"
        >
          <template v-slot:avatar>
            <q-icon name="error" color="negative" />
          </template>
          {{ errorMsg }}
        </q-banner>
      </transition>
    </div>

    <!-- Network Status Indicator & APK Download Link -->
    <div class="q-mt-lg text-center column items-center q-gutter-y-sm">
      <q-btn
        flat
        dense
        rounded
        color="positive"
        icon="android"
        label="Descargar App Android (.apk)"
        tag="a"
        href="/app-release.apk"
        download="OfflineOnline.apk"
        target="_blank"
        class="text-weight-bold shadow-1"
        style="background: rgba(76,175,80,0.18); font-size: 13px; padding: 4px 14px;"
      />

      <q-chip
        :color="isOnline ? 'positive' : 'negative'"
        text-color="white"
        :icon="isOnline ? 'wifi' : 'wifi_off'"
        :label="isOnline ? 'Conectado' : 'Sin conexión'"
        dense
        style="opacity: 0.7;"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from 'stores/auth';
import api from 'src/services/api';
import { databaseService } from 'src/services/database';

const router = useRouter();
const authStore = useAuthStore();

const loginType = ref<'user' | 'admin'>('user');
const documento = ref('');
const userPass = ref('');
const showUserPassword = ref(false);
const adminUser = ref('');
const adminPass = ref('');
const showPassword = ref(false);
const loading = ref(false);
const errorMsg = ref('');
const isOnline = ref(navigator.onLine);

onMounted(() => {
  window.addEventListener('online', () => (isOnline.value = true));
  window.addEventListener('offline', () => (isOnline.value = false));

  // Si ya hay sesión, redirigir
  if (authStore.isAuthenticated) {
    router.push(authStore.role === 'admin' ? '/admin' : '/user');
  }
});

async function handleLogin() {
  errorMsg.value = '';
  loading.value = true;

  try {
    if (loginType.value === 'admin') {
      if (!adminUser.value || !adminPass.value) {
        errorMsg.value = 'Complete todos los campos';
        return;
      }

      try {
        const response = await api.post('/auth/login', {
          tipo: 'admin',
          documento: adminUser.value,
          password: adminPass.value,
        });

        if (response.data.success) {
          authStore.loginAsAdmin();
          router.push('/admin');
        }
      } catch (err: unknown) {
        const axiosErr = err as { response?: { status: number } };
        if (axiosErr.response?.status === 401) {
          errorMsg.value = 'Credenciales incorrectas';
        } else {
          // Intentar offline si no hay conexión
          if (adminUser.value === 'admin' && adminPass.value === 'admin123') {
            authStore.loginAsAdmin();
            router.push('/admin');
          } else {
            errorMsg.value = 'Sin conexión. Use credenciales offline.';
          }
        }
      }
    } else {
      if (!documento.value || !userPass.value) {
        errorMsg.value = 'Ingrese documento y contraseña';
        return;
      }

      try {
        const response = await api.post('/auth/login', {
          tipo: 'user',
          documento: documento.value,
          password: userPass.value,
        });

        if (response.data.success) {
          authStore.loginAsUser(response.data.usuario);
          router.push('/user');
        }
      } catch (err: unknown) {
        const axiosErr = err as { response?: { status: number; data?: { error?: string } } };
        if (axiosErr.response?.status === 401 || axiosErr.response?.status === 404) {
          errorMsg.value = axiosErr.response.data?.error || 'Credenciales incorrectas';
        } else {
          // Intentar login offline (si no hay red)
          const localUser = await databaseService.getUsuarioByDocumento(documento.value);
          if (localUser) {
            // Validar contraseña localmente si tiene una
            if (!localUser.password || localUser.password.trim() === '' || localUser.password === userPass.value) {
              authStore.loginAsUser(localUser);
              router.push('/user');
              return;
            } else {
              errorMsg.value = 'Contraseña incorrecta (modo offline)';
              return;
            }
          }
          errorMsg.value = 'Error de conexión. Intente más tarde.';
        }
      }
    }
  } finally {
    loading.value = false;
  }
}
</script>

<style scoped>
.login-bg-circles {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  pointer-events: none;
  z-index: 0;
}

.circle {
  position: absolute;
  border-radius: 50%;
  opacity: 0.08;
}

.circle-1 {
  width: 300px;
  height: 300px;
  background: var(--color-primary);
  top: -80px;
  right: -60px;
  animation: float 8s ease-in-out infinite;
}

.circle-2 {
  width: 200px;
  height: 200px;
  background: var(--color-secondary);
  bottom: 20%;
  left: -40px;
  animation: float 6s ease-in-out infinite reverse;
}

.circle-3 {
  width: 150px;
  height: 150px;
  background: var(--color-accent);
  bottom: -30px;
  right: 20%;
  animation: float 10s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0px) scale(1); }
  50% { transform: translateY(-30px) scale(1.05); }
}

.login-container {
  position: relative;
  z-index: 1;
}
</style>
