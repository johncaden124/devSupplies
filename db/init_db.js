const {
  client,
  // declare your model imports here
  // for example, User
} = require('./');

//--------------------------------------------------------------------
//                    Dropping Tables
async function dropTables() {
  console.log("Dropping All Tables...")
  // drop all tables, in the correct order
  try {
    console.log('Starting to drop tables');

    await client.query(`
      DROP TABLE IF EXISTS products;
      DROP TABLE IF EXISTS users;
      DROP TABLE IF EXISTS orders;
      DROP TABLE IF EXISTS order_products;
    `);

    console.log('Finished dropping tables')
  } catch (error) {
    console.error('Error dropping tables');
    throw error;
  }
}
//-------------------------------------------------------------------
//                    Building Tables
async function buildTables() {
    client.connect();

console.log("Starting to build tables...")
try {
    
  await client.query(`
  CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name NOT NULL,
    description NOT NULL,
    price NOT NULL,
    "imageURL" DEFAULT ,
    "inStock" NOT NULL DEFAULT false,
    category NOT NULL
  );
  CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    "firstName NOT NULL,
    "lastName" NOT NULL,
    email UNIQUE NOT NULL,
    "imageURL" DEFAULT,
    username UNIQUE NOT NULL,
    password UNIQUE NOT NULL,
    "isAdmin" NOT NULL DEFAULT false
  );
  CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    status DEFAULT 'created',
    "userId" INTEGER REFERENCES users(id),
    "datePlaced"
  );
  CREATE TABLE order_products (
    id SERIAL PRIMARY KEY,
    "productId" INTEGER REFERENCES products(id),
    "orderId" INTEGER REFERENCES orders(id),
    price NOT NULL,
    quantity NOT NULL DEFAULT 0
  );
  `)
} catch (error) {
  console.error('Error building tables')
  throw error;
}
}
//---------------------------------------------------------------------

async function populateInitialData() {
  try {
    // create useful starting data by leveraging your
    // Model.method() adapters to seed your db, for example:
    // const user1 = await User.createUser({ ...user info goes here... })
  } catch (error) {
    throw error;
  }
}

buildTables()
  .then(populateInitialData)
  .catch(console.error)
  .finally(() => client.end());

async function rebuildDB() {
  try {
    await dropTables()
      await buildTables()
      await populateInitialData()
    } catch (error) {
      console.log("Error during rebuildDB")
      throw error
    }
  }

  module.exports = {
    rebuildDB,
    dropTables,
    buildTables,
  }
//this is my first change -trae

