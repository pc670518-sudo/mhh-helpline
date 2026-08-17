const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(express.json());
app.use(cors());

app.use(express.static(path.join(__dirname, 'public')));

let agentsList = [
    { id: '2003', name: 'Nikhil', company: 'MHH Helpline', username: 'nikhil2003', password: 'password123', status: 'Busy' },
    { id: '2004', name: 'Aman', company: 'MHH Helpline', username: 'aman2004', password: 'password123', status: 'Busy' },
    { id: '2005', name: 'Farman', company: 'MHH Helpline', username: 'farman2005', password: 'password123', status: 'On Call' },
    { id: '2006', name: 'Kajal', company: 'MHH Helpline', username: 'kajal2006', password: 'password123', status: 'Available' }
];

app.get('/api/agents', (req, res) => {
    res.json(agentsList);
});

app.post('/api/agents', (req, res) => {
    const { id, name, company, username, password } = req.body;
    
    if(agentsList.some(a => a.id === id)) {
        return res.status(400).json({ success: false, message: 'Agent ID already exists!' });
    }

    const newAgent = { id, name, company, username, password, status: 'Login' };
    agentsList.push(newAgent);
    res.json({ success: true, message: 'Agent created successfully!', agent: newAgent });
});

app.delete('/api/agents/:id', (req, res) => {
    const agentId = req.params.id;
    agentsList = agentsList.filter(a => a.id !== agentId);
    res.json({ success: true, message: 'Agent deleted successfully!' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running live on http://localhost:${PORT}`);
});
