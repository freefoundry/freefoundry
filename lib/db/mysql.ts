import mysql, { Pool } from "mysql2/promise";

type DbName = "courses" | "jobs";

type ConnectionCache = {
  [key in DbName]?: Pool;
};

let cached: ConnectionCache = (global as any).mysql || {};
if (!(global as any).mysql) {
  (global as any).mysql = cached;
}

export function connectMySQL(name: DbName): Pool {
  let host, user, password, database;

  if (name === "courses") {
    host = process.env.MYSQL_COURSES_HOST;
    user = process.env.MYSQL_COURSES_USER;
    password = process.env.MYSQL_COURSES_PASSWORD;
    database = process.env.MYSQL_COURSES_DATABASE; // freefoundry_courses
  } else if (name === "jobs") {
    host = process.env.MYSQL_JOBS_HOST;
    user = process.env.MYSQL_JOBS_USER;
    password = process.env.MYSQL_JOBS_PASSWORD;
    database = process.env.MYSQL_JOBS_DATABASE; // freefoundry_jobs
  }

  if (!host || !user || !password || !database) {
    throw new Error(`⚠️ Missing MySQL config for ${name}`);
  }

  if (!cached[name]) {
    cached[name] = mysql.createPool({
      host,
      user,
      password,
      database,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });
  }

  return cached[name]!;
}

export async function initTables() {
  const jobsDb = connectMySQL("jobs");
  await jobsDb.query(`
    CREATE TABLE IF NOT EXISTS jobs (
      id INT AUTO_INCREMENT PRIMARY KEY,
      slug VARCHAR(255) UNIQUE NOT NULL,
      title VARCHAR(255) NOT NULL,
      company VARCHAR(255),
      location VARCHAR(255),
      type VARCHAR(100),
      workMode VARCHAR(100),
      experience VARCHAR(100),
      salary VARCHAR(100),
      salaryType VARCHAR(50),
      description TEXT,
      fullDescription LONGTEXT,
      excerpt TEXT,
      requirements JSON,
      benefits JSON,
      responsibilities JSON,
      platform VARCHAR(100),
      companyLogo VARCHAR(500),
      applicationUrl VARCHAR(500),
      featured BOOLEAN DEFAULT FALSE,
      urgent BOOLEAN DEFAULT FALSE,
      tags JSON,
      status VARCHAR(50) DEFAULT 'draft',
      visibility VARCHAR(50) DEFAULT 'public',
      publishDate DATETIME,
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `);

  const coursesDb = connectMySQL("courses");
  await coursesDb.query(`
    CREATE TABLE IF NOT EXISTS courses (
      id INT AUTO_INCREMENT PRIMARY KEY,
      slug VARCHAR(255) UNIQUE NOT NULL,
      title VARCHAR(255) NOT NULL,
      instructor VARCHAR(255),
      description TEXT,
      content LONGTEXT,
      category VARCHAR(100),
      difficulty VARCHAR(100),
      duration VARCHAR(100),
      price DECIMAL(10,2),
      originalPrice DECIMAL(10,2),
      tags JSON,
      requirements JSON,
      outcomes JSON,
      status VARCHAR(50) DEFAULT 'draft',
      visibility VARCHAR(50) DEFAULT 'public',
      publishDate DATETIME,
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `);
}
