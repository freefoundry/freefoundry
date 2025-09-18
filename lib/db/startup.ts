// CREATE DATABASE IF NOT EXISTS freefoundry_jobs CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
// CREATE DATABASE IF NOT EXISTS freefoundry_courses CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

// USE freefoundry_jobs;

// CREATE TABLE IF NOT EXISTS jobs (
//   id INT AUTO_INCREMENT PRIMARY KEY,
//   slug VARCHAR(255) UNIQUE NOT NULL,
//   title VARCHAR(255) NOT NULL,
//   company VARCHAR(255),
//   location VARCHAR(255),
//   type VARCHAR(100),
//   workMode VARCHAR(100),
//   experience VARCHAR(100),
//   salary VARCHAR(100),
//   salaryType VARCHAR(50),
//   description TEXT,
//   fullDescription LONGTEXT,
//   excerpt TEXT,
//   requirements JSON,
//   benefits JSON,
//   responsibilities JSON,
//   platform VARCHAR(100),
//   companyLogo VARCHAR(500),
//   applicationUrl VARCHAR(500),
//   featured BOOLEAN DEFAULT FALSE,
//   urgent BOOLEAN DEFAULT FALSE,
//   tags JSON,
//   status VARCHAR(50) DEFAULT 'draft',
//   visibility VARCHAR(50) DEFAULT 'public',
//   publishDate DATETIME,
//   createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//   updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
// );


// USE freefoundry_courses;

// CREATE TABLE IF NOT EXISTS courses (
//   id INT AUTO_INCREMENT PRIMARY KEY,
//   slug VARCHAR(255) UNIQUE NOT NULL,
//   title VARCHAR(255) NOT NULL,
//   instructor VARCHAR(255),
//   description TEXT,
//   content LONGTEXT,
//   category VARCHAR(100),
//   difficulty VARCHAR(100),
//   duration VARCHAR(100),
//   price DECIMAL(10,2),
//   originalPrice DECIMAL(10,2),
//   tags JSON,
//   requirements JSON,
//   outcomes JSON,
//   status VARCHAR(50) DEFAULT 'draft',
//   visibility VARCHAR(50) DEFAULT 'public',
//   publishDate DATETIME,
//   createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//   updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
// );
