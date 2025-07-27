const express = require('express');
const path = require('path');

const app = express();
app.use(express.static('public'));
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Fake base distances in millions of miles (roughly approximate)
const celestialBodies = {
  Sun: 93,
  Mercury: 48,
  Venus: 67,
  Earth: 0,
  Mars: 142,
  Ceres: 257,
  Jupiter: 484,
  Saturn: 888,
  Uranus: 1784,
  Neptune: 2793,
  Pluto: 3670,
  'Oort Cloud': 50000
};

function simulateDistances(zip) {
  const zipNum = parseInt(zip, 10) % 10000; // Ensure variation
  const distances = {};

  for (const [body, base] of Object.entries(celestialBodies)) {
    const variation = ((zipNum * base) % 10000) / 100; // 0–100 miles
    const miles = (base * 1_000_000) + variation;
    const km = miles * 1.60934;
    const au = miles / 92957130;

    distances[body] = {
      miles: Math.round(miles),
      km: Math.round(km),
      au: au.toFixed(6)
    };
  }

  return distances;
}

app.post('/zip', (req, res) => {
  const { zip } = req.body;
  if (!/^\d{5}$/.test(zip)) {
    return res.status(400).json({ error: 'Invalid ZIP code' });
  }

  const distances = simulateDistances(zip);
  res.json({ distances });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
