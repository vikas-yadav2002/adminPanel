/**
 * @typedef {Object} Client
 * @property {string} id
 * @property {string} client_id
 * @property {string} name
 * @property {string} client_type
 * @property {string} city
 * @property {string} state
 * @property {string} contact_person
 * @property {string} phone
 * @property {string} email
 */
  import { query } from '../config/db.js';
/**
 * @param {Client} client
 * @returns {boolean}
 */
function isValidClient(client) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^\d{10}$/;

  if (isNaN(Number(client.id))) return false;
  if (typeof client.client_id !== 'string' || client.client_id.trim() === '') return false;
  if (typeof client.name !== 'string' || client.name.trim() === '') return false;
  if (typeof client.client_type !== 'string' || client.client_type.trim() === '') return false;
  if (typeof client.city !== 'string' || client.city.trim() === '') return false;
  if (typeof client.state !== 'string' || client.state.trim() === '') return false;
  if (typeof client.contact_person !== 'string' || client.contact_person.trim() === '') return false;
  if (typeof client.phone !== 'string' || !phoneRegex.test(client.phone)) return false;
  if (typeof client.email !== 'string' || !emailRegex.test(client.email)) return false;

  return true;
}


/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
const ClientImport = async (req, res) => {
  const { clients } = req.body;

  if (!Array.isArray(clients)) {
    return res.status(400).json({ error: 'Invalid format. Expected "clients" array.' });
  }

  const invalidRows = [];

  clients.forEach((client, index) => {
    if (!isValidClient(client)) {
      console.log(`Invalid client at row ${index + 1}:`, client);
      invalidRows.push({ row: index + 1, client });
    }
  });

  // Delay utility
  function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Add a 5-second delay
  await delay(5000);

  // If there are invalid rows, return 422
  if (invalidRows.length > 0) {
    return res.status(422).json({
      message: 'Some rows are invalid.',
      invalidRows,
    });
  }

  // Build the SQL string
  const sql = `
    INSERT INTO clients 
      (id, client_id, name, client_type, city, state, contact_person, phone, email)
    VALUES 
      ${clients.map(client => 
        `('${client.id}', '${client.client_id}', '${client.name}', '${client.client_type}', '${client.city}', '${client.state}', '${client.contact_person}', '${client.phone}', '${client.email}')`
      ).join(",\n      ")};
  `;

  console.log("Generated SQL:", sql); // Log only for debugging, remove in production

  // Not executing the query for now
  return res.status(200).json({
    message: 'All clients are valid.',
    sql,         // returning SQL for verification only
    data: clients,
  });
};


export { ClientImport };
