import dotenv from 'dotenv';

import app from './server/apiServer';

dotenv.config();

const port = process.env.PORT || 5000;
// eslint-disable-next-line no-console
const callback = () => console.log(`API Server on port ${port}!`);

app.listen(port, callback);
