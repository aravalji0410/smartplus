const db = require("./config/db");

async function init() {
  try {
    // create tables if they don't exist
    await db.query(`
      CREATE TABLE IF NOT EXISTS \`Users\` (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    await db.query(`
      CREATE TABLE IF NOT EXISTS \`groups\` (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        created_by INT,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (created_by) REFERENCES \`Users\`(id) ON DELETE SET NULL
      )
    `);

    await db.query(`
      CREATE TABLE IF NOT EXISTS \`group_members\` (
        id INT AUTO_INCREMENT PRIMARY KEY,
        group_id INT,
        user_id INT,
        FOREIGN KEY (group_id) REFERENCES \`groups\`(id) ON DELETE CASCADE,
        FOREIGN KEY (user_id) REFERENCES \`Users\`(id) ON DELETE CASCADE
      )
    `);

    await db.query(`
      CREATE TABLE IF NOT EXISTS \`expenses\` (
        expenseId INT AUTO_INCREMENT PRIMARY KEY,
        groupId INT,
        paidBy INT,
        amount FLOAT NOT NULL,
        splitType VARCHAR(50),
        category VARCHAR(100),
        date DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (groupId) REFERENCES \`groups\`(id) ON DELETE CASCADE,
        FOREIGN KEY (paidBy) REFERENCES \`Users\`(id) ON DELETE SET NULL
      )
    `);

    // seed data - hash passwords before inserting
    const bcrypt = require('bcrypt');
    const hash1 = await bcrypt.hash('password1', 10);
    const hash2 = await bcrypt.hash('password2', 10);

    await db.query(`
      INSERT INTO \`Users\` (name, email, password) VALUES
        ('Alice', 'alice@example.com', '${hash1}'),
        ('Bob', 'bob@example.com', '${hash2}')
      ON DUPLICATE KEY UPDATE password=VALUES(password), name=VALUES(name)
    `);

    await db.query(`
      INSERT INTO \`groups\` (name, created_by) VALUES
        ('Trip to Bali', 1),
        ('Office Party', 2)
      ON DUPLICATE KEY UPDATE name=VALUES(name)
    `);

    await db.query(`
      INSERT INTO \`group_members\` (group_id, user_id) VALUES
        (1, 1), (1, 2), (2, 2)
      ON DUPLICATE KEY UPDATE group_id=group_id
    `);

    await db.query(`
      INSERT INTO \`expenses\` (groupId, paidBy, amount, splitType, category) VALUES
        (1, 1, 500, 'equal', 'booking'),
        (1, 2, 200, 'percent', 'meals')
      ON DUPLICATE KEY UPDATE amount=VALUES(amount)
    `);

    console.log("Tables created and seed data inserted.");
    process.exit(0);
  } catch (err) {
    console.error("Seeding failed:", err);
    process.exit(1);
  }
}

init();
