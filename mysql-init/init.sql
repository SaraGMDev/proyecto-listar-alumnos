-- Crear base de datos con charset utf8mb4 y collation utf8mb4_unicode_ci
CREATE DATABASE IF NOT EXISTS bd_registro_alumnos
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE bd_registro_alumnos;

-- Crear tabla alumnos con charset utf8mb4
CREATE TABLE IF NOT EXISTS alumnos (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nombre VARCHAR(255) NOT NULL,
  curso VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  genero VARCHAR(50),
  idioma VARCHAR(255)
) CHARACTER SET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


