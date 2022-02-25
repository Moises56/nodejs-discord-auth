const app = require('./app');
const {PORT} = require('./config');
require('./db');

// app.listen( app.get('port'))
// console.log('Server on Port',  app.get('port'));


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});