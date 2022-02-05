const app = require('./app');
const {PORT} = require('./config');
require('./db');

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});