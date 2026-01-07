// import mysql, { Pool } from "mysql2/promise";

// type DbName = "courses" | "jobs";

// type ConnectionCache = {
//   [key in DbName]?: Pool;
// };

// let cached: ConnectionCache = (global as any).mysql || {};
// if (!(global as any).mysql) {
//   (global as any).mysql = cached;
// }

// export function connectMySQL(name: DbName): Pool {
//   let host, user, password, database;

//   if (name === "courses") {
//     host = process.env.MYSQL_COURSES_HOST;
//     user = process.env.MYSQL_COURSES_USER;
//     password = process.env.MYSQL_COURSES_PASSWORD;
//     database = process.env.MYSQL_COURSES_DATABASE;
//   } else if (name === "jobs") {
//     host = process.env.MYSQL_JOBS_HOST;
//     user = process.env.MYSQL_JOBS_USER;
//     password = process.env.MYSQL_JOBS_PASSWORD;
//     database = process.env.MYSQL_JOBS_DATABASE;
//   }

//   console.log(`Connecting to MySQL database: ${name} at ${host}`);
//   if (!host || !user || !password || !database) {
//     throw new Error(`⚠️ Missing MySQL config for ${name}`);
//   }

//   if (!cached[name]) {
//     cached[name] = mysql.createPool({
//       host,
//       user,
//       password,
//       database,
//       port: Number(process.env.MYSQL_COURSES_PORT) || 19039,

//       //  REQUIRED FOR AIVEN
//       ssl: {
//         rejectUnauthorized: false,
//       },

//       waitForConnections: true,
//       connectionLimit: 5,
//       queueLimit: 0,

//       //  THESE TWO LINES FIX EVERYTHING
//       timezone: "local",
//       dateStrings: true,
//     });
//   }

//   return cached[name]!;
// }
import mysql from "mysql2/promise";

type DbName = "courses" | "jobs";

function getConfig(name: DbName) {
  if (name === "courses") {
    return {
      host: process.env.MYSQL_COURSES_HOST!,
      port: Number(process.env.MYSQL_COURSES_PORT),
      user: process.env.MYSQL_COURSES_USER!,
      password: process.env.MYSQL_COURSES_PASSWORD!,
      database: process.env.MYSQL_COURSES_DATABASE!,
    };
  }

  return {
    host: process.env.MYSQL_JOBS_HOST!,
    port: Number(process.env.MYSQL_JOBS_PORT),
    user: process.env.MYSQL_JOBS_USER!,
    password: process.env.MYSQL_JOBS_PASSWORD!,
    database: process.env.MYSQL_JOBS_DATABASE!,
  };
}

/**
 * Looks like a pool, but is serverless-safe
 */
export function connectMySQL(name: DbName) {
  return {
    async query(sql: string, values?: any[]) {
      const conn = await mysql.createConnection({
        ...getConfig(name),
        ssl: { rejectUnauthorized: false },
      });

      try {
        const [rows] = await conn.query(sql, values);
        return [rows];
      } finally {
        await conn.end();
      }
    },
  };
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
      postedDate DATE,
      platform VARCHAR(100),
      companyLogo VARCHAR(500),
      applicationUrl VARCHAR(500),
      featured BOOLEAN DEFAULT FALSE,
      urgent BOOLEAN DEFAULT FALSE,
      tags JSON,
      status VARCHAR(50) DEFAULT 'draft',
      visibility VARCHAR(50) DEFAULT 'public',
      publishDate DATETIME,
      qualifications JSON,
      niceToHave JSON,
      companyInfo JSON,
      applicationProcess JSON,
      similarJobs JSON,
      views INT DEFAULT 0,
      applications INT DEFAULT 0,
      lastUpdated DATE,
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
      description TEXT,
      content LONGTEXT,
      excerpt TEXT,
      platform VARCHAR(100),
      instructor JSON,
      category VARCHAR(100),
      difficulty VARCHAR(100),
      duration VARCHAR(100),
      courseUrl VARCHAR(500),
      certificate TINYINT(1) DEFAULT 0,
      language VARCHAR(100) DEFAULT 'English'
      price DECIMAL(10,2) DEFAULT 0,
      originalPrice DECIMAL(10,2) DEFAULT 0,
      rating DECIMAL(3,2) DEFAULT 0,
      students INT DEFAULT 0,
      image VARCHAR(500),
      isPopular BOOLEAN DEFAULT FALSE,
      isNew BOOLEAN DEFAULT FALSE,
      isTrending BOOLEAN DEFAULT FALSE,
      tags JSON,
      requirements JSON,
      outcomes JSON,
      expiryDate DATETIME NULL,
      status VARCHAR(50) DEFAULT 'draft',
      visibility VARCHAR(50) DEFAULT 'public',
      publishDate DATETIME NULL,
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `);
}
