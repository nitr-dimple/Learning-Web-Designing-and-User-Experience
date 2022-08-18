import app from './api/app.js'

// Establishing connection on port 9000
const port = 9000;
app.listen(9000, () => {
    console.log(`Server running at port: ${port}.`);
});