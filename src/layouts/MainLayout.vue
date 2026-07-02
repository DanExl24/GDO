<template>
  <q-layout view="hHh lpR fFf">
    <!-- Network Status Banner -->
    <NetworkBanner />

    <!-- Header -->
    <q-header
      class="bg-dark"
      style="margin-top: 32px; border-bottom: 1px solid rgba(255,255,255,0.06);"
    >
      <q-toolbar>
        <q-toolbar-title class="text-weight-bold" style="font-size: 18px;">
          <q-icon name="storage" class="q-mr-sm" color="primary" />
          OfflineOnline
        </q-toolbar-title>

        <q-chip
          v-if="authStore.role === 'admin'"
          dense
          color="primary"
          text-color="dark"
          icon="admin_panel_settings"
          label="Admin"
          class="text-weight-bold"
          style="font-size: 11px;"
        />
        <q-chip
          v-else-if="authStore.user"
          dense
          outline
          color="primary"
          :label="authStore.user.nombre"
          icon="person"
          style="font-size: 11px;"
        />

        <q-btn
          flat
          round
          dense
          icon="sync"
          color="primary"
          :loading="networkStore.isSyncing"
          @click="manualSync"
          class="q-ml-sm"
        >
          <q-tooltip>Sincronizar ahora</q-tooltip>
        </q-btn>

        <q-btn
          flat
          round
          dense
          icon="logout"
          color="grey-5"
          @click="handleLogout"
          class="q-ml-xs"
        >
          <q-tooltip>Cerrar sesión</q-tooltip>
        </q-btn>
      </q-toolbar>
    </q-header>

    <!-- Page Content -->
    <q-page-container>
      <transition
        enter-active-class="animated fadeIn"
        leave-active-class="animated fadeOut"
        mode="out-in"
        :duration="200"
      >
        <router-view />
      </transition>
    </q-page-container>

    <!-- Footer Info -->
    <q-footer
      class="bg-dark text-center q-pa-xs"
      style="border-top: 1px solid rgba(255,255,255,0.06); font-size: 11px;"
    >
      <span class="text-grey-6">
        <template v-if="networkStore.lastSyncDate">
          Última sincronización: {{ formatDate(networkStore.lastSyncDate) }}
        </template>
        <template v-else>
          Sin sincronización previa
        </template>
      </span>
    </q-footer>

    <!-- Sync Progress Dialog -->
    <q-dialog v-model="showSyncModal" persistent>
      <q-card class="bg-dark text-white q-pa-md" style="min-width: 350px; max-width: 500px; border-radius: 16px; border: 1px solid rgba(255,255,255,0.08);">
        <q-card-section class="row items-center justify-between q-pb-none">
          <div class="text-h6 text-weight-bold row items-center">
            <q-spinner-gears v-if="syncStatus === 'syncing' || syncStatus === 'checking'" color="primary" size="28px" class="q-mr-sm" />
            <q-icon v-else-if="syncStatus === 'completed'" name="check_circle" color="positive" size="28px" class="q-mr-sm" />
            <q-icon v-else-if="syncStatus === 'error'" name="error" color="negative" size="28px" class="q-mr-sm" />
            Sincronización
          </div>
          <q-btn v-if="syncStatus === 'completed' || syncStatus === 'error'" flat round dense icon="close" v-close-popup />
        </q-card-section>

        <q-card-section class="text-center q-py-lg" v-if="syncStatus === 'syncing' || syncStatus === 'checking'">
          <q-spinner-dots color="primary" size="40px" />
          <div class="text-subtitle2 q-mt-md text-grey-4">
            {{ syncStatus === 'checking' ? 'Verificando estado de la red...' : 'Sincronizando datos con la nube...' }}
          </div>
        </q-card-section>

        <q-card-section class="text-center q-py-lg" v-else-if="syncStatus === 'completed'">
          <div class="text-h2 q-my-sm">🎉</div>
          <div class="text-subtitle1 text-weight-bold text-positive">¡Todo al día!</div>
          <div class="text-caption text-grey-5 q-mt-xs">Todos los datos locales han sido sincronizados.</div>
        </q-card-section>

        <q-card-section class="text-center q-py-lg" v-else-if="syncStatus === 'error'">
          <div class="text-h2 q-my-sm">📡</div>
          <div class="text-subtitle1 text-weight-bold text-negative">Servidor no disponible</div>
          <div class="text-caption text-grey-5 q-mt-xs">No se pudo establecer conexión con la nube de Render.</div>
        </q-card-section>

        <!-- Logs Container -->
        <q-card-section class="q-pt-none">
          <div class="text-caption text-grey-4 text-weight-bold q-mb-xs">Registro de eventos:</div>
          <div
            id="sync-logs-container"
            style="height: 150px; overflow-y: auto; background: rgba(0,0,0,0.3); border-radius: 8px; border: 1px solid rgba(255,255,255,0.05); padding: 8px; font-family: monospace; font-size: 11px;"
          >
            <div v-for="(log, idx) in syncLogs" :key="idx" class="q-py-xs" :class="log.includes('❌') ? 'text-negative' : log.includes('✅') ? 'text-positive' : log.includes('🟢') ? 'text-secondary' : 'text-grey-4'">
              {{ log }}
            </div>
          </div>
        </q-card-section>

        <q-card-actions align="right" class="q-pt-none">
          <q-btn
            :disabled="syncStatus === 'syncing' || syncStatus === 'checking'"
            flat
            label="Cerrar"
            color="primary"
            v-close-popup
            style="border-radius: 8px;"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-layout>
</template>

<script setup lang="ts">
import { ref, watch, nextTick } from 'vue';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';
import { useAuthStore } from 'stores/auth';
import { useNetworkStore } from 'stores/network';
import { useNetwork } from 'src/composables/useNetwork';
import { databaseService } from 'src/services/database';
import { syncService } from 'src/services/sync';
import api from 'src/services/api';
import NetworkBanner from 'src/components/NetworkBanner.vue';

const router = useRouter();
const authStore = useAuthStore();
const networkStore = useNetworkStore();
const $q = useQuasar();
const { checkStatus } = useNetwork();

const showSyncModal = ref(false);
const syncStatus = ref<'idle' | 'checking' | 'syncing' | 'completed' | 'error'>('idle');
const syncLogs = ref<string[]>([]);


// Detectar reconexión y proponer sincronización automática de cambios offline
watch(
  () => networkStore.isOnline,
  (isOnline) => {
    if (isOnline && networkStore.pendingChanges > 0) {
      $q.dialog({
        title: '¡De vuelta en línea! 📡',
        message: `Se ha detectado conexión a internet y tienes ${networkStore.pendingChanges} cambio(s) guardado(s) localmente. ¿Deseas sincronizarlos con la nube de Render ahora?`,
        dark: true,
        cancel: {
          label: 'Más tarde',
          color: 'grey-5',
          flat: true
        },
        ok: {
          label: 'Sincronizar ahora',
          color: 'primary'
        },
        persistent: true
      }).onOk(() => {
        manualSync();
      });
    }
  }
);

watch(syncLogs, () => {
  nextTick(() => {
    const el = document.getElementById('sync-logs-container');
    if (el) el.scrollTop = el.scrollHeight;
  });
}, { deep: true });

function handleLogout() {
  authStore.logout();
  router.push('/login');
}

async function manualSync() {
  showSyncModal.value = true;
  syncStatus.value = 'checking';
  syncLogs.value = ['🔄 Verificando conexión con el servidor y la base de datos de Render...'];

  try {
    // 1. Probar salud del servidor y conexión con Postgres en Render
    const healthRes = await api.get('/health');
    if (healthRes.data.status !== 'ok') {
      throw new Error('El servidor reporta problemas en la salud del servicio');
    }

    networkStore.setOnline(true);
    syncLogs.value.push('🟢 Servidor y Base de Datos en línea. Conexión de red activa.');

    // 2. Obtener cambios locales pendientes
    syncLogs.value.push('🔍 Consultando cambios locales pendientes...');
    const pendientes = await databaseService.getCambiosPendientes();

    if (pendientes.length === 0) {
      syncLogs.value.push('ℹ️ No se encontraron cambios pendientes locales por enviar.');
      syncLogs.value.push('⬇️ Descargando actualizaciones del servidor...');
      syncStatus.value = 'syncing';
      await syncService.pullFromServer();
      syncLogs.value.push('✅ Base de datos local actualizada con éxito.');
      syncStatus.value = 'completed';
      networkStore.updatePendingCount(0);
      networkStore.setSyncCompleted('Sincronizado');
      return;
    }

    // 3. Sincronizar cambios uno a uno en tiempo real para visualización
    syncStatus.value = 'syncing';
    syncLogs.value.push(`📤 Encontrados ${pendientes.length} cambios locales por sincronizar.`);
    
    // Llamar al endpoint de sync
    const response = await api.post('/sync', {
      cambios: pendientes.map(p => ({
        usuario_id: p.usuario_id,
        campo: p.campo,
        valor: p.valor,
        fecha_creacion: p.fecha_creacion,
      })),
    });

    const results = response.data.results || [];
    let exitosos = 0;
    
    for (const res of results) {
      const p = pendientes.find(pen => pen.usuario_id === res.usuario_id && pen.campo === res.campo);
      const valorStr = p ? p.valor : '';
      const labelCampo = res.campo.toUpperCase();

      if (res.success) {
        exitosos++;
        syncLogs.value.push(`✅ Sincronizado '${labelCampo}': '${valorStr}' -> Versión ${res.version} creada en la nube.`);
      } else {
        syncLogs.value.push(`❌ Falló la sincronización de '${labelCampo}': '${valorStr}'.`);
      }
    }

    // Marcar como sincronizados localmente
    await databaseService.marcarSincronizados();
    networkStore.updatePendingCount(0);

    // 4. Descargar cambios actualizados
    syncLogs.value.push('⬇️ Descargando y consolidando datos desde la nube...');
    await syncService.pullFromServer();
    syncLogs.value.push('✅ Datos consolidados en la base de datos local.');

    syncStatus.value = 'completed';
    syncLogs.value.push(`🎉 ¡Sincronización finalizada con éxito! ${exitosos}/${pendientes.length} cambios consolidados.`);
    networkStore.setSyncCompleted(`Sincronizados ${exitosos} cambios`);
  } catch (error) {
    console.error('Error durante la sincronización manual:', error);
    networkStore.setOnline(false);
    syncStatus.value = 'error';
    syncLogs.value.push('❌ Error de conexión: El servidor local o la base de datos de Render no están disponibles.');
    syncLogs.value.push('⚠️ Se conservaron los cambios localmente en la caché. Se reintentará luego.');
  }
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleString('es-CO', {
    hour: '2-digit',
    minute: '2-digit',
    day: '2-digit',
    month: 'short',
  });
}
</script>
