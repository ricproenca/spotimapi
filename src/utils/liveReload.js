import livereload from 'livereload';

const liveReloadServer = livereload.createServer();

liveReloadServer.server.once('connection', () => {
  setTimeout(() => {
    liveReloadServer.refresh('/');
  }, 100);
});
