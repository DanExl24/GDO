<template>
  <q-page class="q-pa-md" style="padding-top: 16px;">
    <!-- User Header -->
    <div class="glass-card q-pa-lg q-mb-md">
      <div class="row items-center no-wrap">
        <q-avatar
          size="56px"
          color="primary"
          text-color="dark"
          class="q-mr-md"
          style="font-weight: 700; font-size: 20px;"
        >
          {{ authStore.user?.nombre?.charAt(0) }}{{ authStore.user?.apellido?.charAt(0) }}
        </q-avatar>
        <div class="col">
          <div class="text-h6 text-weight-bold">
            {{ authStore.user?.nombre }} {{ authStore.user?.apellido }}
          </div>
          <div class="text-caption text-grey-5">
            <q-icon name="badge" size="12px" class="q-mr-xs" />
            {{ authStore.user?.documento }}
          </div>
        </div>
        <q-btn
          flat
          round
          icon="history"
          color="primary"
          @click="goToHistory"
        >
          <q-tooltip>Ver historial</q-tooltip>
        </q-btn>
      </div>
    </div>

    <!-- Pending Changes Alert -->
    <transition name="sync-progress">
      <q-banner
        v-if="networkStore.pendingChanges > 0"
        dense
        class="q-mb-md"
        style="background: rgba(255,152,0,0.1); border: 1px solid rgba(255,152,0,0.2); border-radius: 12px;"
      >
        <template v-slot:avatar>
          <q-icon name="pending" color="warning" />
        </template>
        <span class="text-warning text-weight-medium">
          {{ networkStore.pendingChanges }} cambio{{ networkStore.pendingChanges > 1 ? 's' : '' }} pendiente{{ networkStore.pendingChanges > 1 ? 's' : '' }} de sincronización
        </span>
      </q-banner>
    </transition>

    <!-- Personal Data Section -->
    <div class="q-mb-sm">
      <div class="text-subtitle1 text-weight-bold q-mb-xs" style="color: var(--color-primary);">
        Información Personal
      </div>
      <div class="text-caption text-grey-6">
        Toque un campo para editarlo
      </div>
    </div>

    <div v-if="loadingData" class="text-center q-pa-xl">
      <q-spinner-dots size="40px" color="primary" />
    </div>

    <div v-else class="glass-card q-mb-md" style="overflow: hidden;">
      <div
        v-for="field in availableFields"
        :key="field.key"
        class="field-row"
        @click="editField(field.key)"
      >
        <div>
          <div class="field-row__label">{{ field.label }}</div>
          <div class="field-row__value">
            {{ getFieldValue(field.key) || '—' }}
          </div>
        </div>
        <div class="row items-center no-wrap">
          <span
            v-if="isPending(field.key)"
            class="pending-badge q-mr-sm"
          >
            <q-icon name="schedule" size="10px" />
            pendiente
          </span>
          <q-icon name="chevron_right" color="grey-6" size="20px" />
        </div>
      </div>
    </div>

    <!-- Edit Field Dialog -->
    <q-dialog v-model="showEditDialog">
      <q-card style="width: 340px; max-width: 95vw;" class="bg-dark">
        <q-card-section>
          <div class="text-h6 text-weight-bold">
            <q-icon name="edit" color="primary" class="q-mr-sm" />
            Editar {{ editingFieldLabel }}
          </div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input
            v-model="editValue"
            :label="editingFieldLabel"
            outlined
            dark
            dense
            autofocus
            :maxlength="editingFieldKey === 'documento' ? 10 : 50"
            @keyup.enter="saveField"
          >
            <template v-slot:prepend>
              <q-icon :name="getFieldIcon(editingFieldKey)" color="primary" />
            </template>
          </q-input>

          <div v-if="!networkStore.isOnline" class="q-mt-sm">
            <q-chip
              dense
              color="warning"
              text-color="dark"
              icon="wifi_off"
              label="Se guardará localmente"
              size="sm"
            />
          </div>
        </q-card-section>

        <q-card-actions align="right" class="q-px-md q-pb-md">
          <q-btn flat label="Cancelar" color="grey-5" v-close-popup />
          <q-btn
            unelevated
            label="Guardar"
            color="primary"
            text-color="dark"
            :loading="savingField"
            @click="saveField"
            style="border-radius: 8px; font-weight: 700;"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';
import { useAuthStore } from 'stores/auth';
import { useNetworkStore } from 'stores/network';
import api from 'src/services/api';
import { databaseService } from 'src/services/database';
import { getSocket } from 'src/services/socket';

const $q = useQuasar();
const router = useRouter();
const authStore = useAuthStore();
const networkStore = useNetworkStore();

const loadingData = ref(true);
const showEditDialog = ref(false);
const savingField = ref(false);
const editingFieldKey = ref('');
const editingFieldLabel = ref('');
const editValue = ref('');
const pendingFields = ref<string[]>([]);

// Datos actuales del usuario
const userData = ref<Record<string, string>>({});

const availableFields = [
  { key: 'nombre', label: 'Nombre', icon: 'person' },
  { key: 'apellido', label: 'Apellido', icon: 'person_outline' },
  { key: 'documento', label: 'Documento', icon: 'badge' },
  { key: 'telefono', label: 'Teléfono', icon: 'phone' },
  { key: 'direccion', label: 'Dirección', icon: 'home' },
  { key: 'password', label: 'Contraseña', icon: 'lock' },
];

async function handleDataUpdated() {
  if (networkStore.isOnline && authStore.user && !savingField.value) {
    await loadUserData();
  }
}

onMounted(async () => {
  await loadUserData();

  const socket = getSocket();
  if (socket) {
    socket.on('data-updated', handleDataUpdated);
  }
});

onUnmounted(() => {
  const socket = getSocket();
  if (socket) {
    socket.off('data-updated', handleDataUpdated);
  }
});

watch(() => networkStore.pendingChanges, async (newVal, oldVal) => {
  // Refrescar los campos que están pendientes localmente
  const pendientes = await databaseService.getCambiosPendientes();
  pendingFields.value = pendientes
    .filter(p => p.usuario_id === authStore.user!.id)
    .map(p => p.campo);

  // Si hubo cambios y se limpiaron (sincronización exitosa), recargar los datos actualizados
  if (oldVal !== undefined && oldVal > 0 && newVal === 0) {
    await loadUserData();
  }
});

async function loadUserData() {
  if (!authStore.user) return;
  loadingData.value = true;

  try {
    if (networkStore.isOnline) {
      const response = await api.get(`/usuarios/${authStore.user.id}`);
      const user = response.data;
      
      userData.value = {
        nombre: user.nombre || '',
        apellido: user.apellido || '',
        documento: user.documento || '',
        telefono: user.telefono || '',
        direccion: user.direccion || '',
        password: user.password || '',
      };

      // Mantener authStore sincronizado con los datos más recientes del servidor
      // para que la tarjeta del encabezado siempre muestre el nombre/apellido actualizado
      authStore.updateProfileFields({
        nombre: user.nombre || '',
        apellido: user.apellido || '',
      });
      
      const datos = response.data.datos || [];
      for (const d of datos) {
        // Fallback en caso de que existan datos históricos dinámicos
        if (userData.value[d.campo] === undefined) {
          userData.value[d.campo] = d.valor;
        }
      }

      // Cargar historial completo para popular la caché local (necesario para la validación de duplicados RN-05)
      try {
        const histResponse = await api.get(`/usuarios/${authStore.user.id}/historial`);
        const fullHistory = histResponse.data || [];
        await databaseService.syncLocalHistoryWithServer(
          authStore.user.id,
          fullHistory.map((h: any) => ({
            id: h.id,
            usuario_id: h.usuario_id,
            campo: h.campo,
            valor: h.valor,
            version: h.version,
            es_actual: h.es_actual,
            origen: h.origen,
            fecha_creacion: h.fecha_creacion,
            fecha_ultima_activacion: h.fecha_ultima_activacion,
            veces_reutilizado: h.veces_reutilizado
          }))
        );
      } catch (histError) {
        console.error('Error cargando historial para caché local:', histError);
      }
    } else {
      // Load from local
      userData.value = {};
      const localUsers = await databaseService.getUsuarios();
      const localUser = localUsers.find(u => u.id === authStore.user!.id);
      if (localUser) {
        userData.value = {
          nombre: localUser.nombre || '',
          apellido: localUser.apellido || '',
          documento: localUser.documento || '',
          telefono: localUser.telefono || '',
          direccion: localUser.direccion || '',
          password: localUser.password || '',
        };
      }

      const datos = await databaseService.getDatosActuales(authStore.user.id);
      for (const d of datos) {
        if (userData.value[d.campo] === undefined) {
          userData.value[d.campo] = d.valor;
        }
      }

      // Sobrescribir con cambios pendientes locales (offline) para mostrar el valor más reciente en pantalla
      const pendientes = await databaseService.getCambiosPendientes();
      const userPendientes = pendientes.filter(p => p.usuario_id === authStore.user!.id);
      for (const p of userPendientes) {
        userData.value[p.campo] = p.valor;
      }
    }

    // Check pending changes
    const pendientes = await databaseService.getCambiosPendientes();
    pendingFields.value = pendientes
      .filter(p => p.usuario_id === authStore.user!.id)
      .map(p => p.campo);
    networkStore.updatePendingCount(pendientes.length);
  } catch (error) {
    // Fallback to local
    networkStore.setOnline(false);
    userData.value = {};
    const localUsers = await databaseService.getUsuarios();
    const localUser = localUsers.find(u => u.id === authStore.user!.id);
    if (localUser) {
      userData.value = {
        nombre: localUser.nombre || '',
        apellido: localUser.apellido || '',
        documento: localUser.documento || '',
        telefono: localUser.telefono || '',
        direccion: localUser.direccion || '',
        password: localUser.password || '',
      };
    }

    const datos = await databaseService.getDatosActuales(authStore.user!.id);
    for (const d of datos) {
      if (userData.value[d.campo] === undefined) {
        userData.value[d.campo] = d.valor;
      }
    }
    // Mantener sincronizado el nombre y apellido en el authStore
    if (userData.value.nombre || userData.value.apellido) {
      authStore.updateProfileFields({
        nombre: userData.value.nombre || '',
        apellido: userData.value.apellido || '',
      });
    }
  } finally {
    loadingData.value = false;
  }
}

function getFieldValue(key: string): string {
  return userData.value[key] || '';
}

function getFieldIcon(key: string): string {
  const field = availableFields.find(f => f.key === key);
  return field?.icon || 'edit';
}

function isPending(key: string): boolean {
  return pendingFields.value.includes(key);
}

function editField(key: string) {
  const field = availableFields.find(f => f.key === key);
  if (!field) return;

  editingFieldKey.value = key;
  editingFieldLabel.value = field.label;
  editValue.value = getFieldValue(key);
  showEditDialog.value = true;
}

async function saveField() {
  if (!editValue.value.trim()) {
    $q.notify({ type: 'warning', message: 'El campo no puede estar vacío' });
    return;
  }
  if (!authStore.user) return;

  try {
    // RN-05: Reutilización de valores históricos
    const localHistory = await databaseService.getHistorialLocal(authStore.user.id);
    const duplicate = localHistory.find(
      h => h.campo === editingFieldKey.value && 
           h.valor.trim().toLowerCase() === editValue.value.trim().toLowerCase()
    );

    // Verificar si es exactamente igual al valor actual mostrado en pantalla para evitar redundancias
    const currentValue = (userData.value[editingFieldKey.value] || '').trim();
    if (editValue.value.trim() === currentValue) {
      showEditDialog.value = false;
      return;
    }

    if (duplicate) {
      if (duplicate.es_actual) {
        // Es el valor actual, no hacer nada
        showEditDialog.value = false;
        return;
      }

      // Solicitar confirmación para reutilizar (RN-05)
      $q.dialog({
        title: 'Reutilizar Valor Histórico',
        dark: true,
        message: `El valor "${editValue.value.trim()}" ya fue utilizado anteriormente como la Versión ${duplicate.version}. ¿Desea reactivar esta versión manteniendo su número original en lugar de crear una nueva versión?`,
        cancel: {
          label: 'Cancelar',
          color: 'grey-5',
          flat: true
        },
        ok: {
          label: 'Reutilizar',
          color: 'primary'
        },
        persistent: true
      }).onOk(async () => {
        await ejecutarGuardado();
      });
    } else {
      // Proceder con el guardado normal
      await ejecutarGuardado();
    }
  } catch (err) {
    console.error('Error pre-guardado:', err);
    $q.notify({ type: 'negative', message: 'Error al verificar el historial' });
  }
}

async function ejecutarGuardado() {
  if (!authStore.user) return;
  savingField.value = true;

  try {
    if (networkStore.isOnline) {
      // Guardar directamente en el servidor
      await api.post(`/usuarios/${authStore.user.id}/datos`, {
        campo: editingFieldKey.value,
        valor: editValue.value.trim(),
      });

      // Actualizar columna local para consistencia inmediata
      await databaseService.updateUsuarioColumnaLocal(
        authStore.user.id,
        editingFieldKey.value,
        editValue.value.trim()
      );

      // Cargar los datos y el nuevo historial completo oficial desde el servidor
      await loadUserData();

      $q.notify({
        type: 'positive',
        message: `${editingFieldLabel.value} actualizado`,
        icon: 'cloud_done',
      });
    } else {
      // Guardar localmente (offline) — solo registrará el cambio pendiente sin inventar versiones
      await databaseService.updateDatoLocal(
        authStore.user.id,
        editingFieldKey.value,
        editValue.value.trim()
      );

      $q.notify({
        type: 'info',
        message: `${editingFieldLabel.value} guardado localmente`,
        caption: 'Se sincronizará al reconectar',
        icon: 'wifi_off',
      });
    }

    // Update UI
    userData.value[editingFieldKey.value] = editValue.value.trim();
    showEditDialog.value = false;

    // Mantener sincronizado el nombre y apellido en el authStore al instante
    if (editingFieldKey.value === 'nombre' || editingFieldKey.value === 'apellido') {
      authStore.updateProfileFields({
        nombre: userData.value.nombre || '',
        apellido: userData.value.apellido || '',
      });
    }

    // Refresh pending count
    const pendientes = await databaseService.getCambiosPendientes();
    pendingFields.value = pendientes
      .filter(p => p.usuario_id === authStore.user!.id)
      .map(p => p.campo);
    networkStore.updatePendingCount(pendientes.length);
  } catch (error) {
    console.error('Error guardando campo:', error);
    
    // Si la API falla por caída del servidor, caída de base de datos (500) o desconexión,
    // hacer fallback automático guardando localmente el cambio y forzar modo offline
    const axiosErr = error as { response?: { status?: number } };
    const isNetworkOrServerError = !axiosErr.response || (axiosErr.response.status && axiosErr.response.status >= 500);

    if (isNetworkOrServerError) {
      try {
        await databaseService.updateDatoLocal(
          authStore.user.id,
          editingFieldKey.value,
          editValue.value.trim()
        );

        networkStore.setOnline(false);

        $q.notify({
          type: 'warning',
          message: 'Servidor no disponible. Guardado localmente.',
          caption: 'Se sincronizará automáticamente al restablecer conexión',
          icon: 'wifi_off',
          timeout: 4000,
        });

        userData.value[editingFieldKey.value] = editValue.value.trim();
        showEditDialog.value = false;

        // Mantener sincronizado el nombre y apellido en el authStore al instante en fallback
        if (editingFieldKey.value === 'nombre' || editingFieldKey.value === 'apellido') {
          authStore.updateProfileFields({
            nombre: userData.value.nombre || '',
            apellido: userData.value.apellido || '',
          });
        }

        const pendientes = await databaseService.getCambiosPendientes();
        pendingFields.value = pendientes
          .filter(p => p.usuario_id === authStore.user!.id)
          .map(p => p.campo);
        networkStore.updatePendingCount(pendientes.length);
        return;
      } catch (localErr) {
        console.error('Error en fallback local:', localErr);
      }
    }

    $q.notify({
      type: 'negative',
      message: 'Error al guardar. Verifique su conexión.',
    });
  } finally {
    savingField.value = false;
  }
}

function goToHistory() {
  if (!authStore.user) return;
  router.push(`/history/${authStore.user.id}`);
}
</script>
