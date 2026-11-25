# 🛠️ FIXME: API de Biblioteca (NestJS + Prisma + PostgreSQL)

> ⚠️ **Este proyecto está roto a propósito.**
> Tu misión es encontrar los errores, arreglarlos y documentarlos.

Es una API REST para gestionar la biblioteca de un instituto: autores, categorías, libros, socios y préstamos.
El código tiene **más de 25 errores** escondidos, de cuatro tipos:

| Tipo | ¿Cómo lo notas? |
| --- | --- |
| ✏️ **Mal escrito (typo)** | El editor (VS Code) lo subraya en **rojo**. |
| 🧱 **Sintaxis** | El editor marca rojo y el código ni siquiera se puede compilar. |
| 💻 **Terminal / ejecución** | Aparece en la terminal al correr `prisma`, al arrancar Nest, al llamar a un endpoint o al correr los tests. |
| 🧠 **Lógica** | El código compila y arranca, pero **hace algo distinto** a lo que dicen las reglas de negocio de este README. |

---

## 📦 Stack

- **NestJS 12** (ESM: los imports relativos terminan en `.js`)
- **Prisma 7** con `@prisma/adapter-pg`
- **PostgreSQL**
- **class-validator** / **class-transformer** para validar los DTOs
- **Swagger** en `http://localhost:3000/api`
- **Vitest** para los tests

---

## 🚀 Puesta en marcha

```bash
# 1. Clona tu copia del repo y entra a la carpeta
git clone <url-del-repo>
cd fixme-biblioteca-nest

# 2. Instala dependencias
npm install

# 3. Crea tu archivo .env a partir del ejemplo y pon tu usuario/contraseña de PostgreSQL
cp .env.example .env

# 4. Genera el cliente de Prisma  (👀 aquí aparecerán los primeros errores)
npx prisma generate

# 5. Crea las tablas en tu base de datos
npx prisma migrate dev --name init

# 6. Levanta el servidor en modo desarrollo
npm run start:dev

# 7. Corre los tests unitarios
npm test
```

Cuando el servidor arranque, abre **http://localhost:3000/api** para probar los endpoints con Swagger
(o usa Postman / Thunder Client).

> 💡 **Consejo:** arregla en este orden → 1) `schema.prisma` hasta que `prisma generate` funcione,
> 2) errores rojos del editor y de compilación, 3) errores al arrancar Nest, 4) tests, 5) lógica probando los endpoints.

---

## 🗄️ Modelo de datos (5 tablas)

| Tabla | Campos | Notas |
| --- | --- | --- |
| `autores` | `id`, `nombre` (texto), `nacionalidad` (texto, opcional), `createdAt` | Un autor tiene muchos libros. |
| `categorias` | `id`, `nombre` (texto, **único**) | Una categoría tiene muchos libros. |
| `libros` | `id`, `titulo`, `isbn` (**único**), `anioPublicacion` (entero), `stock` (entero, por defecto 1), `createdAt`, `autorId`, `categoriaId` | Pertenece a un autor y a una categoría. `stock` = ejemplares disponibles. |
| `socios` | `id`, `nombre`, `email` (**único**), `activo` (booleano, por defecto `true`), `createdAt` | Un socio tiene muchos préstamos. |
| `prestamos` | `id`, `fechaPrestamo` (por defecto ahora), `fechaLimite`, `fechaDevolucion` (opcional), `libroId`, `socioId` | Relaciona un libro con un socio. Si `fechaDevolucion` es `null`, el préstamo está **activo**. |

---

## 📏 Reglas de negocio (así DEBE funcionar la API)

### Autores — `/autores`
- `POST`, `GET`, `GET /:id`, `PATCH /:id`, `DELETE /:id`.
- `GET /autores` devuelve los autores ordenados por nombre (A→Z).
- `GET /autores/:id` devuelve el autor **con sus libros**. Si no existe → **404**.

### Categorías — `/categorias`
- CRUD completo.
- No pueden existir dos categorías con el mismo nombre → **409**.
- `GET /categorias` las ordena por nombre e incluye cuántos libros tiene cada una.

### Libros — `/libros`
- CRUD completo.
- Al crear un libro se valida que **el autor exista** y que **la categoría exista** (si no → **404**), y que el ISBN no esté repetido (→ **409**).
- `anioPublicacion` debe ser un entero entre 1450 y 2100; `stock` un entero ≥ 0.
- `GET /libros` lista **todos** los libros. Opcionalmente acepta `?categoriaId=2` para filtrar por categoría.
- `GET /libros/:id` incluye el autor y la categoría. Si no existe → **404**.

### Socios — `/socios`
- CRUD completo. El email es único (→ **409**).
- `DELETE /socios/:id` es un **borrado lógico**: pone `activo = false`, no borra la fila.
- `GET /socios` lista **solo los socios activos**.
- `GET /socios/:id` incluye sus préstamos activos.

### Préstamos — `/prestamos`
- `POST /prestamos` con `{ libroId, socioId, dias? }` (`dias` entre 1 y 30, por defecto **14**):
  - El socio debe existir y estar activo → si no, **404**.
  - El libro debe existir → si no, **404**.
  - El libro debe tener **al menos 1 ejemplar** en stock → si no, **400**.
  - Un socio puede tener **como máximo 3 préstamos activos** → el 4º da **400**.
  - `fechaLimite` = hoy **+** `dias`.
  - Al prestar, el `stock` del libro **baja en 1**.
- `GET /prestamos` lista todos, del más reciente al más antiguo.
- `GET /prestamos/vencidos` lista los préstamos **no devueltos** cuya `fechaLimite` **ya pasó**.
- `GET /prestamos/:id` devuelve el préstamo con el campo calculado `vencido` (true/false). Si no existe → **404**.
- `PATCH /prestamos/:id/devolver`:
  - Si ya fue devuelto → **400**.
  - Marca `fechaDevolucion` con la fecha actual y el `stock` del libro **sube en 1**.

---

## ✅ ¿Cuándo está terminado?

- [ ] `npx prisma generate` y `npx prisma migrate dev` funcionan sin errores.
- [ ] VS Code no muestra nada en rojo dentro de `src/`.
- [ ] `npm run build` compila sin errores.
- [ ] `npm run start:dev` arranca y se ven **todas** las rutas mapeadas en la terminal.
- [ ] `npm test` pasa al 100 %.
- [ ] Todos los endpoints cumplen las reglas de negocio de arriba.
- [ ] Llenaste el archivo **`ERRORES_ENCONTRADOS.md`**.

> ❗ No cambies las reglas de negocio ni los tests para "hacer que pasen": el error siempre está en el código, no en la especificación.

---

## 📝 Entrega

1. Arregla el código y haz commits pequeños (idealmente uno por error o por grupo de errores).
2. Completa `ERRORES_ENCONTRADOS.md` con **todos** los errores que encontraste: archivo, línea, tipo, cómo lo detectaste y cómo lo solucionaste.
3. Sube tu repositorio y comparte el enlace.
