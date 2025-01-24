const express = require('express');
const path = require('path');
 
const app = express();
const port = 3001;
 
// Middleware to serve static files from the "public" directory
app.use(express.static('public'));
 
// Route for the home page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html')); // Serve the index.html file explicitly
});
 
// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
 
 




// const express = require('express');
// const path = require('path')
// const app = express();
// const PORT = 3000;

// // Serve static files
// app.use(express.static(path.join(__dirname, 'public', 'index.html')));

// // Start the server
// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });

