var connectionString;

// If app is running on Heroku, use the remote database (with SSL)
if(process.env.DATABASE_URL !== undefined) {
  connectionString = process.env.DATABASE_URL + "?ssl=true";
} else {
  // running locally, use local database instead
  connectionString = 'postgres://localhost:5432/pivot';
}

module.exports = connectionString;
