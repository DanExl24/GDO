import { boot } from 'quasar/wrappers';
import { databaseService } from 'src/services/database';

export default boot(async () => {
  try {
    await databaseService.initialize();
    console.log('✅ Base de datos local inicializada');
  } catch (error) {
    console.error('❌ Error inicializando base de datos local:', error);
  }
});
