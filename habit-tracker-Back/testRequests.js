const axios = require('axios');

const baseUrl = 'http://localhost:3000/api'; // Assure-toi de mettre le bon port si tu as changé le port du serveur

async function createUser() {
  try {
    const response = await axios.post(`${baseUrl}/createUser`, {
      username: 'Ugo',
      email: 'Ugo@example.com',
      password: 'lesIDU'
    });

    console.log('Create User Response:', response.data);
  } catch (error) {
    console.error('Error creating user:', error.response.data || error.message);
  }
}

async function checkPassword() {
  try {
    const response = await axios.post(`${baseUrl}/checkPassword`, {
      username: 'Ugo',
      inputPassword: 'securePassword'
    });

    console.log('Check Password Response:', response.data);
  } catch (error) {
    console.error('Error checking password:', error.response.data || error.message);
  }
}

async function createHabit() {
  try {
    const response = await axios.post(`${baseUrl}/createHabit`, {
      nom: "marche",
      idOwner: "657b1982bcf90a81fd0f6708",
      description: "marcher 10 km par jour",
      fréquence: "quotidien"
    });

    console.log('Create Habit Response:', response.data);
  } catch (error) {
    console.error('Error creating habit:', error.response.data || error.message);
  }
}


// Exécuter les requêtes de test
// createUser();
// checkPassword();
createHabit();
