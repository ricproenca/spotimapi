import app from './server.js';

app.listen(process.env.PORT || 5000, () => console.log('.. and the magic happens at port 5000!'));
