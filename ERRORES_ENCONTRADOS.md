# Errores encontrados

**Nombre:**
**Fecha:**

> Tipos válidos: `Typo` (editor en rojo) · `Sintaxis` · `Terminal` (prisma / arranque / endpoint / tests) · `Lógica`

| # | Archivo | Línea | Tipo | ¿Qué estaba mal? | ¿Cómo lo detectaste? | ¿Cómo lo solucionaste? |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | `prisma/schema.prisma` | 12 | Terminal | `nombre Strng` | Al ejecutar Prisma en terminal sale `12 \| nombre Strng` | reparamos la palabra `String` |
| 2 | `prisma/schema.prisma` | 63 | Terminal | `[ID])` | Al ejecutar Prisma en terminal sale error de referencia en `Socio` | El campo de relación se encuentra en mayúscula, se pone en minúscula (`[id]`) |
| 3 | `src/autor/dto/create-autor.dto.ts` | 11 | Typo | Validador @IsOptional aparece como @IsOptinal | Linea roja en el editor al no encontrar el import de @IsOptinal | Agregamos la O faltante |
| 4 | `prisma.service.ts` | 6 | Typo | `PrismaClient` (faltaba la `t`) | Visual lo pone en rojo | Puse la `t` |
| 5 | `prisma.config.ts` | 11 | Typo | `url: process.env...` (palabra `URL` mal escrita) | Visual lo pone en rojo | Organicé la palabra `URL` |
| 6 | `src/autor/autor.controller.ts` | 24 | Typo | Validador @Gett con doble t | Al revisar los controladores de autor | Quité la t al final |
| 7 | `src/main.ts` | 15 | Sintaxis | Falta un `(` antes del ; | Linea roja del VSC | Agregué `(` faltante |
| 8 | `src/socio/socio.controller.ts` | 27 | Sintaxis | Faltaba un `}` para cerrar el endpoint `@Get()` | Multiples lineas de error a partir de la linea 28 | Agregué una `}` junto con identación |
| 9 | `src/categoria/categoria.service.ts` | 27 | Sintaxis | Falta una , al final de la linea 26_ | Linea roja del VSC | Agregué la , faltante al final de la linea 26 |
| 10 | `prestamo.service.ts` | 27 y 33 | Sintaxis | Al no tener un `await` en la consulta previa, fallaba la referencia en el `if` | Tenía un rojo en el `if` de la línea 33 | Incluí el `await` |
| 11 | `prestamo.service.ts` | 33 | Lógica | En el `if` solo tenía `<` (`< 0`) en vez de `<=` | Por lógica de negocio | Se cambia `<` por `<=` |
| 12 | `libro.controller.ts` | 33 | Sintaxis | El `id` tenía tipo de dato incorrecto | Al correr el servidor, la terminal lo señala | Se aplica `ParseIntPipe`, para garantizar que siempre retorne un valor entero numérico |
| 13 | `libro.service.ts` | 37 | Sintaxis | Estaba llamando al modelo en plural | Al correr el servidor, la terminal lo señala | Se elimina la `s` para que llame el modelo correcto |
| 14 | `src/socio/socio.module.ts` | 3 | Typo | directorio incompleto al importar (tipo de archivo no se especifica) | Linea roja en editor VSC | Aguegué .js al final del directorio |
| 15 | `src/categoria/categoria.module.ts` | 3, 6 | Logica | No se importa y no se hace uso de el provider_| Al comparar otros modulos con este | Importé el modulo y lo agregué al provider proveniente de categoria.service.ts |
| 16 | `src/socio/dto/create-socio.dto.ts` | 2 | Logica | IsEmail no pertenece a 'class-transformer' | Linea roja en VSC | Puse IsEmail en el import de la linea 3, para 'class-validator' |
| 17 | `src/prisma/prisma.module.ts` | 4 | Terminal | No se importa el `@Global()` para el PrismaService en los modulos | Error en la terminal | Agregamos `@Global()` |
| 18 | `src/autor/autor.service.ts` | 23 | Logica | fallo en `if(autor)` | Al ejecutar endpoint `@Get(':id')` | Agregué el `!` en el if `if(!autor) {` |

<!-- Agrega todas las filas que necesites -->

## Reflexión final

1. ¿Qué tipo de error te costó más encontrar y por qué?
2. ¿Qué herramienta te ayudó más (editor, terminal, Swagger/Postman, tests)?
3. ¿Qué harías para evitar este tipo de errores en tus propios proyectos?
