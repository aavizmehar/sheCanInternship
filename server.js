const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const { readInterns, addIntern, updateIntern, deleteIntern } = require('./database');

app.use(express.json());
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// Serve leaderboard.html
app.get('/leaderboard.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'leaderboard.html'));
});

// Serve leaderboard.json
app.get('/api/leaderboard', (req, res) => {
  res.sendFile(path.join(__dirname, 'leaderboard.json'));
});

// GET all interns
app.get('/api/interns', async (req, res) => {
  try {
    const interns = await readInterns();
    res.json(interns);
  } catch (error) {
    console.error('Error fetching interns:', error);
    res.status(500).send('Internal Server Error');
  }
});

// GET single intern by ID
app.get('/api/interns/:id', async (req, res) => {
  try {
    const interns = await readInterns();
    const intern = interns.find(i => i.id === parseInt(req.params.id));
    if (intern) {
      res.json(intern);
    } else {
      res.status(404).send('Intern not found');
    }
  } catch (error) {
    console.error('Error fetching intern:', error);
    res.status(500).send('Internal Server Error');
  }
});

// POST a new intern
app.post('/api/interns', async (req, res) => {
  try {
    const { name, email, college, department } = req.body;
    if (!name || !email || !college || !department) {
      return res.status(400).send('Missing required intern fields');
    }
    const interns = await readInterns();
    const newId = interns.length > 0 ? Math.max(...interns.map(i => i.id)) + 1 : 1;
    const newIntern = { id: newId, name, email, college, department };
    await addIntern(newIntern);
    res.status(201).json(newIntern);
  } catch (error) {
    console.error('Error adding intern:', error);
    res.status(500).send('Internal Server Error');
  }
});

// PUT update an intern by ID
app.put('/api/interns/:id', async (req, res) => {
  try {
    const internId = parseInt(req.params.id);
    const { name, email, college, department } = req.body;
    if (!name || !email || !college || !department) {
      return res.status(400).send('Missing required intern fields for update');
    }
    const updated = await updateIntern(internId, { name, email, college, department });
    if (updated) {
      res.json(updated);
    } else {
      res.status(404).send('Intern not found');
    }
  } catch (error) {
    console.error('Error updating intern:', error);
    res.status(500).send('Internal Server Error');
  }
});

// DELETE an intern by ID
app.delete('/api/interns/:id', async (req, res) => {
  try {
    const internId = parseInt(req.params.id);
    const deleted = await deleteIntern(internId);
    if (deleted) {
      res.status(204).send(); // No Content
    } else {
      res.status(404).send('Intern not found');
    }
  } catch (error) {
    console.error('Error deleting intern:', error);
    res.status(500).send('Internal Server Error');
  }
});

// GET dashboard metrics
app.get('/api/dashboard/stats', async (req, res) => {
  try {
    const interns = await readInterns();
    const totalInterns = interns.length;
    const departments = {};
    interns.forEach(intern => {
      departments[intern.department] = (departments[intern.department] || 0) + 1;
    });

    res.json({
      totalInterns,
      departments,
    });
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    res.status(500).send('Internal Server Error');
  }
});

// GET dummy data for dashboard user info
app.get('/api/dashboard/user-info', (req, res) => {
  res.json({
    userName: "Dummy User",
    referralCode: "DUMMY123",
    amountRaised: 12345.67
  });
});

app.get('/donations', (req, res) => {
    res.json({ totalDonations: 5000 });
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
