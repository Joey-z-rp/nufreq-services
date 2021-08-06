process.env['NODE_CONFIG_DIR'] = __dirname + '/configs';

import 'dotenv/config';
import App from '@/app';
import NumRoute from '@routes/num.route';
import validateEnv from '@utils/validateEnv';

validateEnv();

const app = new App([new NumRoute()]);

app.listen();
