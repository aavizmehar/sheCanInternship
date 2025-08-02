const fs = require('fs').promises;
const path = require('path');

const internsFilePath = path.join(__dirname, 'interns.json');

// Function to read all interns from the JSON file
async function readInterns() {
  try {
    const data = await fs.readFile(internsFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    if (error.code === 'ENOENT') {
      // If the file doesn't exist, return an empty array
      return [];
    }
    throw error;
  }
}

// Function to write interns to the JSON file
async function writeInterns(interns) {
  await fs.writeFile(internsFilePath, JSON.stringify(interns, null, 2));
}

// Function to add a new intern
async function addIntern(intern) {
  const interns = await readInterns();
  interns.push(intern);
  await writeInterns(interns);
}

// Function to update an existing intern
async function updateIntern(internId, updatedIntern) {
  let interns = await readInterns();
  const internIndex = interns.findIndex(i => i.id === internId);
  if (internIndex !== -1) {
    interns[internIndex] = { ...interns[internIndex], ...updatedIntern };
    await writeInterns(interns);
    return interns[internIndex];
  }
  return null;
}

// Function to delete an intern
async function deleteIntern(internId) {
  let interns = await readInterns();
  const initialLength = interns.length;
  interns = interns.filter(i => i.id !== internId);
  if (interns.length < initialLength) {
    await writeInterns(interns);
    return true;
  }
  return false;
}

module.exports = {
  readInterns,
  addIntern,
  updateIntern,
  deleteIntern
};
