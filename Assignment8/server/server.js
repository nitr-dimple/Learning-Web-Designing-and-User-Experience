import app from './api/app.js'

// Establishing connection on port 9000
const port = 5000;
app.listen(port, () => {
    console.log(`Server running at port: ${port}.`);
});