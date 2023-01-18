const express = require('express');
const fs = require('fs');
const app = express();

app.use(express.json());

app.post('/store_data', (req, res) => {
  // Read the current data from the json file
  fs.readFile('application.json', 'utf8', (err, data) => {
    if (err) {
      return res.send('Error reading file');
    }
    // Parse the current data
    let applications = JSON.parse(data);
    // Add the new data
    applications.push(req.body);
    // Write the updated data to the json file
    fs.writeFile('application.json', JSON.stringify(applications), 'utf8', (err) => {
      if (err) {
        return res.send('Error writing to file');
      }
      res.send('Application received');
    });
  });
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});