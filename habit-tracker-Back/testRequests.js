const axios = require('axios');

const baseUrl = 'http://localhost:3000/api'; // Assure-toi de mettre le bon port si tu as changé le port du serveur

async function createUser() {
  try {
    const response = await axios.post(`${baseUrl}/createUser`, {
      username: 'John',
      email: 'john@example.com',
      password: '1234'
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
    const user="John"
    const response = await axios.post(`${baseUrl}/createHabit/${user}`, {
      habitName: "marche",
      username:user,
      description: "marcher 10 km par jour",
      frequency: "quotidien"
    });

    console.log('Create Habit Response:', response.data);
  } catch (error) {
    console.error('Error creating habit:', error.response.data || error.message);
  }
}

async function deleteHabit() {
  const habitIdToDelete = '65846ecfd8e6d18b0a8e2aab';

  try {
    const response = await axios.delete(`http://localhost:3000/api/deleteHabit/${habitIdToDelete}`);

    if (response.status === 200) {
      console.log('Habitude supprimée avec succès:', response.data.message);
    } else {
      console.error('Échec de la suppression de l\'habitude:', response.data.error);
    }
  } catch (error) {
    console.error('Erreur lors de la suppression de l\'habitude:', error.message);
  }
} 

async function getHabits() {
  const user = "John";
  try {
    const response = await axios.get(`http://localhost:3000/api/getHabits/${user}`);

    if (response.status === 200) {
      console.log('Liste des habitudes:', response.data);
    } else {
      console.error('Échec de l\'affichage des habitudes:', response.data.error);
    }
  } catch (error) {
    console.error('Erreur lors de l\'affichage des habitudes:', error.message);
  }
}

async function addDateToHistory() {
  const habitId = '658b0e06f49941fd414398f6';
  const date = '2023-01-10';

  try {
    const response = await axios.post(`http://localhost:3000/api/addDateToHistory/${habitId}`, { date });

    if (response.status === 200) {
      console.log('Date ajoutée à l\'historique avec succès:', response.data.message);
    } else {
      console.error('Échec de l\'ajout de la date à l\'historique:', response.data.error);
    }
  } catch (error) {
    console.error('Erreur lors de l\'ajout de la date à l\'historique:', error.message);
  }
}



// Exécuter les requêtes de test
// createUser();// deleteHabit();
// checkPassword();
// createHabit();
// getHabits();
addDateToHistory();
