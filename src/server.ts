import express from 'express';

const app = express();
const root = require('path').join(__dirname, '..', 'client', 'build');

app.use(express.static(root));

app.get("*", (req, res) => { res.sendFile('index.html', { root }); })

const port = process.env.PORT || 4004;
app.listen(port, () => {
	console.log(`✅ Running on http://localhost:${port}`);
});
