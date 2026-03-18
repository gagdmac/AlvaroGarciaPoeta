/**
 * Build script: Reads all individual sonnet JSON files in sonnets/
 * and compiles them into sonnets/index.json for the frontend.
 *
 * Run: node scripts/build-index.js
 */

const fs = require('fs');
const path = require('path');

const SONNETS_DIR = path.join(__dirname, '..', 'sonnets');
const INDEX_FILE = path.join(SONNETS_DIR, 'index.json');

// Read all .json files except index.json
const files = fs.readdirSync(SONNETS_DIR)
  .filter(f => f.endsWith('.json') && f !== 'index.json')
  .sort();

const sonnets = files.map(file => {
  const content = fs.readFileSync(path.join(SONNETS_DIR, file), 'utf8');
  return JSON.parse(content);
});

// Sort newest first
sonnets.sort((a, b) => b.date.localeCompare(a.date));

fs.writeFileSync(INDEX_FILE, JSON.stringify(sonnets, null, 2));

console.log(`Built index.json with ${sonnets.length} sonnets.`);
