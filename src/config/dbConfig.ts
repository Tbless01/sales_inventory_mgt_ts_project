import mysql from 'mysql2/promise';

const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '86248624',
  database: 'sales_inventory_db_ts', 
};

export const pool = mysql.createPool({
  host: dbConfig.host,
  user: dbConfig.user,
  password: dbConfig.password,
  database: dbConfig.database,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

async function createSalesTable() {
  let conn;
  try {
    conn = await pool.getConnection();
    await conn.query(`
      CREATE TABLE IF NOT EXISTS sales (
        id INT AUTO_INCREMENT PRIMARY KEY,
        productId INT NOT NULL,
        quantity INT NOT NULL,
        saleDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (productId) REFERENCES inventory(id)
      )
    `);
    console.log('Sales table created successfully');
  } catch (error) {
    console.error('Error creating sales table:', error);
  } finally {
    if (conn) conn.release();
  }
}

async function createInventoryTable() {
  let conn;
  try {
    conn = await pool.getConnection();
    await conn.query(`
      CREATE TABLE IF NOT EXISTS inventory (
        id INT AUTO_INCREMENT PRIMARY KEY,
        productName VARCHAR(255) NOT NULL,
        quantity INT NOT NULL,
        price DECIMAL(10, 2) NOT NULL
      )
    `);
    console.log('Inventory table created successfully');
  } catch (error) {
    console.error('Error creating inventory table:', error);
  } finally {
    if (conn) conn.release();
  }
}


async function createUserTable() {
    let conn;
    try {
      conn = await pool.getConnection();
      await conn.query(`
        CREATE TABLE IF NOT EXISTS user (
          id INT AUTO_INCREMENT PRIMARY KEY,
          username VARCHAR(255) NOT NULL,
          password VARCHAR(255) NOT NULL
        )
      `);
      console.log('User table created successfully');
    } catch (error) {
      console.error('Error creating user table:', error);
    } finally {
      if (conn) conn.release();
    }
  }

async function createTables() {
  try {
    await createInventoryTable();
    await createSalesTable();
    await createUserTable();
  } catch (error) {
    console.error('Error creating tables:', error);
  }
}

createTables();
