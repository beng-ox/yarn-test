// vulnerable-yarn-app/index.js

const express = require('express'); // Web framework
const lodash = require('lodash'); // Utility library
const marked = require('marked'); // Markdown parser (contains vulnerabilities in older versions)
const cors = require('cors'); // CORS handling

const app = express();
app.use(cors());
app.use(express.json());

// Example endpoint that processes Markdown input (could be vulnerable to XSS if marked is outdated)
app.post('/render-markdown', (req, res) => {
    const { markdown } = req.body;
    if (!markdown) {
        return res.status(400).json({ error: 'Markdown content required' });
    }
    const html = marked(markdown); // Potential XSS vulnerability
    res.send({ html });
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
