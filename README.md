Altairis Backoffice - Gestión de Hoteles y Clientes
Este proyecto es una solución integral para la gestión de plazas hoteleras, desarrollada bajo estándares de Clean Architecture y contenedores para garantizar una implementación rápida y estable.

🚀 Tecnologías Principales
Backend: .NET 8 utilizando WebAPI y SQL Server.

Frontend: Next.js con Tailwind CSS para una interfaz moderna y responsiva.

Infraestructura: Docker y Docker Compose para orquestación de servicios.

🛠️ Cómo Ejecutar el Proyecto
Para levantar todo el entorno (Base de Datos + API + Web) de forma automática, asegúrese de tener Docker instalado y ejecute el siguiente comando en la raíz del proyecto:

Bash
docker compose up --build
Puertos de Acceso:
Frontend: http://localhost:3000

API Backend: http://localhost:8080

📋 Funcionalidades Implementadas
Gestión de Hoteles: CRUD completo para la administración de establecimientos.

Gestión de Clientes: Registro y listado de usuarios del sistema.

Persistencia de Datos: Configuración automatizada de SQL Server mediante contenedores.
