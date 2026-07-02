<template>
  <q-page class="q-pa-md" style="padding-top: 16px;">
    <!-- Header -->
    <div class="row items-center q-mb-md">
      <q-btn
        flat
        round
        icon="arrow_back"
        color="primary"
        class="q-mr-sm"
        @click="goBack"
      />
      <div>
        <h2 class="text-h5 text-weight-bold q-mb-none" style="color: var(--color-primary);">
          Historial de Cambios
        </h2>
        <p class="text-body2 text-grey-6 q-mt-xs">
          {{ userName }}
        </p>
      </div>
    </div>

    <!-- Filter by field -->
    <q-select
      v-model="selectedField"
      :options="fieldOptions"
      label="Filtrar por campo"
      outlined
      dark
      dense
      emit-value
      map-options
      class="q-mb-md"
      style="border-radius: 12px;"
      @update:model-value="loadHistory"
    >
      <template v-slot:prepend>
        <q-icon name="filter_list" />
      </template>
    </q-select>

    <!-- History Timeline -->
    <div v-if="loading" class="text-center q-pa-xl">
      <q-spinner-dots size="40px" color="primary" />
    </div>

    <div v-else-if="history.length === 0" class="text-center q-pa-xl">
      <q-icon name="history_toggle_off" size="64px" color="grey-7" />
      <p class="text-grey-5 q-mt-md">No hay cambios registrados</p>
    </div>

    <div v-else>
      <div
        v-for="(item, index) in history"
        :key="item.id"
        class="history-item q-mb-md"
        :class="{ 'history-item--old': !item.es_actual }"
      >
        <div class="row justify-between items-center">
          <div class="history-item__version">
            Versión {{ item.version }}
            <q-chip
              dense
              :color="item.es_actual ? 'primary' : 'grey-8'"
              :text-color="item.es_actual ? 'dark' : 'white'"
              :label="getRankLabel(item)"
              class="text-weight-bold q-ml-sm"
              size="xs"
            />
          </div>
          <div>
            <q-chip
              dense
              :color="item.origen === 'ONLINE' ? 'secondary' : 'warning'"
              text-color="dark"
              :icon="item.origen === 'ONLINE' ? 'cloud' : 'wifi_off'"
              :label="item.origen"
              size="xs"
              class="text-weight-bold"
            />
          </div>
        </div>
        <div class="history-item__value">
          <span class="text-grey-5 text-weight-medium text-caption block text-uppercase">
            {{ getFieldLabel(item.campo) }}
          </span>
          {{ item.valor }}
        </div>
        
        <!-- Información de Reutilización (RN-06) -->
        <div v-if="item.veces_reutilizado && Number(item.veces_reutilizado) > 0" class="q-my-xs text-caption text-primary row items-center">
          <q-icon name="replay" size="14px" class="q-mr-xs" />
          <span>Reutilizado <strong>{{ item.veces_reutilizado }} veces</strong></span>
          <span v-if="item.fecha_ultima_activacion" class="text-grey-5 q-ml-xs">
            (Última activación: {{ formatDate(item.fecha_ultima_activacion) }})
          </span>
        </div>

        <div class="history-item__date row items-center justify-between text-grey-6 text-caption">
          <span>
            <q-icon name="event" size="12px" class="q-mr-xs" />
            Creado: {{ formatDate(item.fecha_creacion) }}
          </span>
          <span v-if="item.fecha_sincronizacion">
            <q-icon name="sync" size="12px" class="q-mr-xs" />
            Sinc: {{ formatDate(item.fecha_sincronizacion) }}
          </span>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useNetworkStore } from 'stores/network';
import api from 'src/services/api';
import { databaseService, type HistorialUsuario } from 'src/services/database';

const route = useRoute();
const router = useRouter();
const networkStore = useNetworkStore();

const userId = Number(route.params.id);
const userName = ref('Cargando usuario...');
const history = ref<HistorialUsuario[]>([]);
const loading = ref(true);
const selectedField = ref<string>('todos');

const fieldOptions = [
  { label: 'Todos los campos', value: 'todos' },
  { label: 'Nombre', value: 'nombre' },
  { label: 'Apellido', value: 'apellido' },
  { label: 'Documento', value: 'documento' },
  { label: 'Teléfono', value: 'telefono' },
  { label: 'Dirección', value: 'direccion' },
  { label: 'Contraseña', value: 'password' },
];

onMounted(async () => {
  await loadUserInfo();
  await loadHistory();
});

async function loadUserInfo() {
  try {
    if (networkStore.isOnline) {
      const response = await api.get(`/usuarios/${userId}`);
      userName.value = `${response.data.nombre} ${response.data.apellido} (${response.data.documento})`;
    } else {
      const users = await databaseService.getUsuarios();
      const user = users.find(u => u.id === userId);
      if (user) {
        userName.value = `${user.nombre} ${user.apellido} (${user.documento})`;
      } else {
        userName.value = `Usuario #${userId}`;
      }
    }
  } catch {
    userName.value = `Usuario #${userId}`;
  }
}

async function loadHistory() {
  loading.value = true;
  const campoFilter = selectedField.value === 'todos' ? undefined : selectedField.value;

  try {
    if (networkStore.isOnline) {
      const response = await api.get(`/usuarios/${userId}/historial`, {
        params: { campo: campoFilter },
      });
      history.value = response.data;
    } else {
      const localHistory = await databaseService.getHistorialLocal(userId);
      if (campoFilter) {
        history.value = localHistory.filter(h => h.campo === campoFilter);
      } else {
        history.value = localHistory;
      }
    }
  } catch {
    const localHistory = await databaseService.getHistorialLocal(userId);
    if (campoFilter) {
      history.value = localHistory.filter(h => h.campo === campoFilter);
    } else {
      history.value = localHistory;
    }
  } finally {
    loading.value = false;
  }
}

function getFieldLabel(key: string): string {
  const opt = fieldOptions.find(o => o.value === key);
  return opt ? opt.label : key;
}

function getRankLabel(item: HistorialUsuario): string {
  // Filtrar todos los registros del historial que tengan el mismo campo
  const fieldItems = history.value
    .filter(h => h.campo === item.campo)
    .sort((a, b) => {
      // 1. El registro vigente (es_actual) siempre va primero
      const aActual = String(a.es_actual) === 'true' || a.es_actual === true || (a as any).es_actual === 1;
      const bActual = String(b.es_actual) === 'true' || b.es_actual === true || (b as any).es_actual === 1;
      if (aActual && !bActual) return -1;
      if (!aActual && bActual) return 1;

      // 2. Si ninguno es el vigente, ordenar de mayor a menor versión
      return b.version - a.version;
    });

  const index = fieldItems.findIndex(h => h.id === item.id);
  if (index === 0) return 'PRINCIPAL';
  if (index === 1) return 'SECUNDARIO';
  if (index === 2) return 'TERCIARIO';
  if (index === 3) return 'CUATERNARIO';
  if (index === 4) return 'QUINTO';
  if (index === 5) return 'SEXTO';
  if (index === 6) return 'SÉPTIMO';
  return `HISTÓRICO (${index + 1}°)`;
}

function goBack() {
  router.back();
}

function formatDate(iso: string): string {
  if (!iso) return '—';
  const d = new Date(iso);
  return d.toLocaleString('es-CO', {
    hour: '2-digit',
    minute: '2-digit',
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}
</script>
