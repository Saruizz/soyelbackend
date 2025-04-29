# soyelbackend

Este proyecto forma parte del desarrollo del sistema de gestión para un parqueadero. Es el backend encargado de manejar la lógica del negocio, la conexión con la base de datos y la exposición de APIs para el frontend.

## Características

- Gestión de usuarios y roles.
- Registro y control de vehículos.
- Gestión de espacios de parqueo.
- Generación de reportes.
- APIs RESTful para la interacción con el frontend.

## Requisitos

- **Node.js** (v14 o superior)
- **npm** (v6 o superior)
- Base de datos **MySQL** o **PostgreSQL**

## Instalación

1. Clona este repositorio:

   ```bash
   git clone https://github.com/tuusuario/soyelbackend.git
   cd soyelbackend
   ```

2. Instala las dependencias:

   ```bash
   npm install
   ```

3. Configura las variables de entorno:
   Crea un archivo `.env` en la raíz del proyecto con los siguientes valores:

   ```env
   DB_HOST=localhost
   DB_PORT=3306
   DB_USER=tu_usuario
   DB_PASSWORD=tu_contraseña
   DB_NAME=nombre_base_datos
   JWT_SECRET=tu_secreto
   ```

4. Ejecuta las migraciones de la base de datos:
   ```bash
   npm run migrate
   ```

## Uso

1. Inicia el servidor:

   ```bash
   npm start
   ```

2. Accede a la API en `http://localhost:3000`.

## Scripts Disponibles

- `npm run build`: Genera los archivos de producción.
- `npm start`: Inicia el servidor en modo producción.
- `npm run dev`: Inicia el servidor en modo desarrollo.
- `npm run migrate`: Ejecuta las migraciones de la base de datos.
- `npm test`: Ejecuta las pruebas unitarias.

## Estructura del Proyecto

```
/src
  /controllers
  /models
  /routes
  /services
  /utils
```

## Contribuciones

¡Las contribuciones son bienvenidas! Por favor, abre un issue o envía un pull request.

## Licencia

Este proyecto está bajo la Licencia MIT.
