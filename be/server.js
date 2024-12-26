const express = require('express');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

// Get all farmers
app.get('/farmers', async (req, res) => {
  const farmers = await prisma.farmer.findMany();
  res.json(farmers);
});

// Create a farmer
app.post('/farmers', async (req, res) => {
  const { name, cropType, risk, coordinate, wallet, email } = req.body;
  const newFarmer = await prisma.farmer.create({
    data: { name, cropType, risk, coordinate, wallet, email },
  });
  res.json(newFarmer);
});

const PORT = 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
