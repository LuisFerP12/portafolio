-- Crear la base de datos
CREATE DATABASE IF NOT EXISTS tech_portfolio;
USE tech_portfolio;

-- Tabla de categorías
CREATE TABLE categories (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    slug VARCHAR(50) NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabla de posts
CREATE TABLE posts (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    content TEXT NOT NULL,
    excerpt TEXT,
    image VARCHAR(255),
    reading_time INT NOT NULL,
    author VARCHAR(100) NOT NULL,
    category_id INT,
    is_featured BOOLEAN DEFAULT FALSE,
    is_highlighted BOOLEAN DEFAULT FALSE,
    status ENUM('draft', 'published', 'archived') DEFAULT 'draft',
    published_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
);

-- Insertar datos de ejemplo para categorías
INSERT INTO categories (name, slug, description) VALUES
('Desarrollo', 'development', 'Artículos sobre desarrollo web y software'),
('DevOps', 'devops', 'Artículos sobre DevOps y automatización'),
('Diseño', 'design', 'Artículos sobre diseño y UX/UI'),
('Carrera', 'career', 'Artículos sobre desarrollo profesional');

-- Insertar datos de ejemplo para posts
INSERT INTO posts (title, slug, content, excerpt, image, reading_time, author, category_id, is_featured, is_highlighted, status, published_at) VALUES
('Tendencias en Desarrollo Web para 2023', 'tendencias-desarrollo-web-2023', 
'<h2>Introducción</h2><p>El desarrollo web continúa evolucionando...</p>',
'Explorando las tecnologías y metodologías que están definiendo el desarrollo web moderno.',
'/placeholder.svg?height=400&width=600', 5, 'Tu Nombre', 1, TRUE, TRUE, 'published', '2023-05-15 00:00:00'),

('Optimización de Rendimiento en Aplicaciones React', 'optimizacion-rendimiento-react',
'<h2>Introducción</h2><p>El rendimiento es un aspecto crítico...</p>',
'Estrategias y técnicas para mejorar el rendimiento de tus aplicaciones React.',
'/placeholder.svg?height=400&width=600', 8, 'Tu Nombre', 1, TRUE, FALSE, 'published', '2023-04-03 00:00:00'),

('Introducción a la Arquitectura Serverless', 'introduccion-arquitectura-serverless',
'<h2>Introducción</h2><p>La arquitectura serverless está revolucionando...</p>',
'Descubre cómo la arquitectura serverless está cambiando el desarrollo de aplicaciones.',
'/placeholder.svg?height=400&width=600', 6, 'Tu Nombre', 2, TRUE, TRUE, 'published', '2023-03-20 00:00:00'),

('Principios de Diseño UX para Desarrolladores', 'principios-diseno-ux-desarrolladores',
'<h2>Introducción</h2><p>El diseño UX es fundamental...</p>',
'Aprende los principios básicos de UX que todo desarrollador debería conocer.',
'/placeholder.svg?height=400&width=600', 7, 'Tu Nombre', 3, FALSE, FALSE, 'published', '2023-02-15 00:00:00'),

('Implementando CI/CD en Proyectos de Pequeña Escala', 'implementando-cicd-proyectos-pequena-escala',
'<h2>Introducción</h2><p>La integración continua...</p>',
'Guía práctica para implementar CI/CD en proyectos pequeños.',
'/placeholder.svg?height=400&width=600', 6, 'Tu Nombre', 2, FALSE, FALSE, 'published', '2023-01-10 00:00:00'),

('El Impacto de la IA en el Desarrollo de Software', 'impacto-ia-desarrollo-software',
'<h2>Introducción</h2><p>La inteligencia artificial está transformando...</p>',
'Análisis del impacto de la IA en el desarrollo de software moderno.',
'/placeholder.svg?height=400&width=600', 8, 'Tu Nombre', 1, TRUE, TRUE, 'published', '2022-12-05 00:00:00'),

('Navegando tu Carrera como Desarrollador', 'navegando-carrera-desarrollador',
'<h2>Introducción</h2><p>El desarrollo profesional es un viaje continuo...</p>',
'Consejos y estrategias para avanzar en tu carrera como desarrollador.',
'/placeholder.svg?height=400&width=600', 5, 'Tu Nombre', 4, FALSE, FALSE, 'published', '2022-11-20 00:00:00'),

('Diseño Responsivo: Más Allá de Media Queries', 'diseno-responsivo-mas-alla-media-queries',
'<h2>Introducción</h2><p>El diseño responsivo moderno...</p>',
'Técnicas avanzadas de diseño responsivo para aplicaciones web modernas.',
'/placeholder.svg?height=400&width=600', 7, 'Tu Nombre', 3, FALSE, FALSE, 'published', '2022-10-15 00:00:00'); 