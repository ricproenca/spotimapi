import app from './server/apiServer';

app.listen(process.env.PORT || 5000, () => console.log('.. and the magic happens at port 5000!'));
