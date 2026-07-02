<template>
  <q-page class="q-pa-md" style="padding-top: 16px;">
    <!-- Page Title -->
    <div class="q-mb-md">
      <h2 class="text-h5 text-weight-bold q-mb-none" style="color: var(--color-primary);">
        Panel de Administrador
      </h2>
      <p class="text-body2 text-grey-6 q-mt-xs">
        Gestione los usuarios del sistema
      </p>
    </div>

    <!-- Stats Row -->
    <div class="row q-col-gutter-sm q-mb-md">
      <div class="col-6">
        <div class="glass-card q-pa-md text-center">
          <div class="text-h4 text-weight-bold" style="color: var(--color-primary);">
            {{ usuarios.length }}
          </div>
          <div class="text-caption text-grey-5">Usuarios</div>
        </div>
      </div>
      <div class="col-6">
        <div class="glass-card q-pa-md text-center">
          <div class="text-h4 text-weight-bold" style="color: var(--color-secondary);">
            {{ networkStore.pendingChanges }}
          </div>
          <div class="text-caption text-grey-5">Pendientes</div>
        </div>
      </div>
    </div>

    <!-- Search -->
    <q-input
      v-model="searchQuery"
      outlined
      dark
      dense
      placeholder="Buscar usuario..."
      class="q-mb-md"
      style="border-radius: 12px;"
    >
      <template v-slot:prepend>
        <q-icon name="search" />
      </template>
      <template v-slot:append v-if="searchQuery">
        <q-icon name="close" class="cursor-pointer" @click="searchQuery = ''" />
      </template>
    </q-input>

    <!-- Users List -->
    <div v-if="loading" class="text-center q-pa-xl">
      <q-spinner-dots size="40px" color="primary" />
      <p class="text-grey-5 q-mt-md">Cargando usuarios...</p>
    </div>

    <div v-else-if="filteredUsers.length === 0" class="text-center q-pa-xl">
      <q-icon name="people_outline" size="64px" color="grey-7" />
      <p class="text-grey-5 q-mt-md">
        {{ searchQuery ? 'Sin resultados' : 'No hay usuarios registrados' }}
      </p>
    </div>

    <transition-group name="list" tag="div" v-else>
      <div
        v-for="user in filteredUsers"
        :key="user.id"
        class="glass-card user-card"
        @click="selectUser(user)"
      >
        <div class="row items-center no-wrap">
          <q-avatar
            size="42px"
            color="primary"
            text-color="dark"
            class="q-mr-md"
            style="font-weight: 700;"
          >
            {{ user.nombre.charAt(0) }}{{ user.apellido.charAt(0) }}
          </q-avatar>
          <div class="col">
            <div class="user-card__name">{{ user.nombre }} {{ user.apellido }}</div>
            <div class="user-card__doc">
              <q-icon name="badge" size="12px" class="q-mr-xs" />
              {{ user.documento }}
            </div>
          </div>
          <div>
            <q-btn flat round dense icon="edit" color="primary" size="sm" @click.stop="editUser(user)" />
            <q-btn flat round dense icon="delete" color="negative" size="sm" @click.stop="confirmDelete(user)" />
            <q-btn flat round dense icon="history" color="grey-5" size="sm" @click.stop="viewHistory(user)" />
          </div>
        </div>
      </div>
    </transition-group>

    <!-- FAB: Create User -->
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn
        fab
        icon="person_add"
        color="primary"
        text-color="dark"
        class="fab-animated"
        @click="showCreateDialog = true"
      />
    </q-page-sticky>

    <!-- Create/Edit Dialog -->
    <q-dialog v-model="showCreateDialog" persistent>
      <q-card style="width: 340px; max-width: 95vw;" class="bg-dark">
        <q-card-section>
          <div class="text-h6 text-weight-bold">
            <q-icon :name="editingUser ? 'edit' : 'person_add'" color="primary" class="q-mr-sm" />
            {{ editingUser ? 'Editar Usuario' : 'Nuevo Usuario' }}
          </div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input
            v-model="form.documento"
            label="Documento"
            outlined
            dark
            dense
            maxlength="10"
            class="q-mb-sm"
            :disable="!!editingUser"
          >
            <template v-slot:prepend>
              <q-icon name="badge" />
            </template>
          </q-input>
          <q-input
            v-model="form.nombre"
            label="Nombre"
            outlined
            dark
            dense
            maxlength="20"
            class="q-mb-sm"
          >
            <template v-slot:prepend>
              <q-icon name="person" />
            </template>
          </q-input>
          <q-input
            v-model="form.apellido"
            label="Apellido"
            outlined
            dark
            dense
            maxlength="20"
            class="q-mb-sm"
          >
            <template v-slot:prepend>
              <q-icon name="person_outline" />
            </template>
          </q-input>
          <q-input
            v-model="form.telefono"
            label="Teléfono"
            outlined
            dark
            dense
            maxlength="20"
            class="q-mb-sm"
          >
            <template v-slot:prepend>
              <q-icon name="phone" />
            </template>
          </q-input>
          <q-input
            v-model="form.direccion"
            label="Dirección"
            outlined
            dark
            dense
            maxlength="100"
            class="q-mb-sm"
          >
            <template v-slot:prepend>
              <q-icon name="home" />
            </template>
          </q-input>
          <q-input
            v-model="form.password"
            label="Contraseña"
            outlined
            dark
            dense
            maxlength="20"
            type="password"
          >
            <template v-slot:prepend>
              <q-icon name="lock" />
            </template>
          </q-input>
        </q-card-section>

        <q-card-actions align="right" class="q-px-md q-pb-md">
          <q-btn flat label="Cancelar" color="grey-5" @click="closeDialog" />
          <q-btn
            unelevated
            :label="editingUser ? 'Actualizar' : 'Crear'"
            color="primary"
            text-color="dark"
            :loading="saving"
            @click="saveUser"
            style="border-radius: 8px; font-weight: 700;"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- User Info Dialog (Quick View) -->
    <q-dialog v-model="showUserInfo">
      <q-card style="width: 340px; max-width: 95vw;" class="bg-dark">
        <q-card-section>
          <div class="text-h6 text-weight-bold">
            <q-icon name="person" color="primary" class="q-mr-sm" />
            {{ selectedUser?.nombre }} {{ selectedUser?.apellido }}
          </div>
          <div class="text-caption text-grey-5">
            Doc: {{ selectedUser?.documento }}
          </div>
        </q-card-section>

        <q-separator dark />

        <q-card-section>
          <div class="text-subtitle2 text-grey-5 q-mb-sm">Datos personales actuales</div>
          <div v-if="selectedUserData.length === 0" class="text-grey-6 text-center q-pa-md">
            Sin datos registrados
          </div>
          <div v-else>
            <div
              v-for="dato in selectedUserData"
              :key="dato.campo"
              class="field-row"
            >
              <span class="field-row__label">{{ dato.campo }}</span>
              <span class="field-row__value">{{ dato.valor }}</span>
            </div>
          </div>
        </q-card-section>

        <q-card-actions align="right" class="q-px-md q-pb-md">
          <q-btn flat label="Cerrar" color="grey-5" v-close-popup />
          <q-btn
            flat
            label="Ver historial"
            color="primary"
            icon="history"
            @click="viewHistory(selectedUser!)"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';
import { useNetworkStore } from 'stores/network';
import api from 'src/services/api';
import { databaseService, type Usuario } from 'src/services/database';

const $q = useQuasar();
const router = useRouter();
const networkStore = useNetworkStore();

const usuarios = ref<Usuario[]>([]);
const loading = ref(true);
const searchQuery = ref('');
const showCreateDialog = ref(false);
const showUserInfo = ref(false);
const saving = ref(false);
const editingUser = ref<Usuario | null>(null);
const selectedUser = ref<Usuario | null>(null);
const selectedUserData = ref<{ campo: string; valor: string }[]>([]);

const form = ref({
  documento: '',
  nombre: '',
  apellido: '',
  telefono: '',
  direccion: '',
  password: '',
});

const filteredUsers = computed(() => {
  if (!searchQuery.value) return usuarios.value;
  const q = searchQuery.value.toLowerCase();
  return usuarios.value.filter(
    u =>
      u.nombre.toLowerCase().includes(q) ||
      u.apellido.toLowerCase().includes(q) ||
      u.documento.includes(q)
  );
});

onMounted(async () => {
  await loadUsers();
});

async function loadUsers() {
  loading.value = true;
  try {
    if (networkStore.isOnline) {
      const response = await api.get('/usuarios');
      usuarios.value = response.data;
      // Cache locally
      await databaseService.saveUsuarios(response.data);
    } else {
      // Load from local cache
      usuarios.value = await databaseService.getUsuarios();
    }
  } catch {
    // Fallback to local
    usuarios.value = await databaseService.getUsuarios();
  } finally {
    loading.value = false;
  }
}

async function selectUser(user: Usuario) {
  selectedUser.value = user;
  selectedUserData.value = [];
  showUserInfo.value = true;

  try {
    if (networkStore.isOnline) {
      const response = await api.get(`/usuarios/${user.id}`);
      selectedUserData.value = response.data.datos || [];
    } else {
      const datos = await databaseService.getDatosActuales(user.id);
      selectedUserData.value = datos.map(d => ({ campo: d.campo, valor: d.valor }));
    }
  } catch {
    const datos = await databaseService.getDatosActuales(user.id);
    selectedUserData.value = datos.map(d => ({ campo: d.campo, valor: d.valor }));
  }
}

function editUser(user: Usuario) {
  editingUser.value = user;
  form.value = {
    documento: user.documento,
    nombre: user.nombre,
    apellido: user.apellido,
    telefono: user.telefono || '',
    direccion: user.direccion || '',
    password: user.password || '',
  };
  showCreateDialog.value = true;
}

async function saveUser() {
  if (!form.value.documento || !form.value.nombre || !form.value.apellido) {
    $q.notify({ type: 'warning', message: 'Complete todos los campos' });
    return;
  }

  saving.value = true;
  try {
    if (editingUser.value) {
      // Update
      await api.put(`/usuarios/${editingUser.value.id}`, form.value);
      $q.notify({ type: 'positive', message: 'Usuario actualizado' });
    } else {
      // Create
      await api.post('/usuarios', form.value);
      $q.notify({ type: 'positive', message: 'Usuario creado exitosamente' });
    }

    closeDialog();
    await loadUsers();
  } catch (err: unknown) {
    const axiosErr = err as { response?: { data?: { error?: string } } };
    $q.notify({
      type: 'negative',
      message: axiosErr.response?.data?.error || 'Error al guardar usuario',
    });
  } finally {
    saving.value = false;
  }
}

function confirmDelete(user: Usuario) {
  $q.dialog({
    title: 'Eliminar usuario',
    message: `¿Está seguro de eliminar a ${user.nombre} ${user.apellido}?`,
    cancel: { flat: true, color: 'grey-5' },
    ok: { color: 'negative', label: 'Eliminar', unelevated: true },
    dark: true,
    persistent: true,
  }).onOk(async () => {
    try {
      await api.delete(`/usuarios/${user.id}`);
      $q.notify({ type: 'positive', message: 'Usuario eliminado' });
      await loadUsers();
    } catch {
      $q.notify({ type: 'negative', message: 'Error al eliminar usuario' });
    }
  });
}

function viewHistory(user: Usuario) {
  showUserInfo.value = false;
  router.push(`/history/${user.id}`);
}

function closeDialog() {
  showCreateDialog.value = false;
  editingUser.value = null;
  form.value = {
    documento: '',
    nombre: '',
    apellido: '',
    telefono: '',
    direccion: '',
    password: '',
  };
}
</script>

<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
