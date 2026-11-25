# Errores encontrados

**Nombre:**
**Fecha:**

> Tipos válidos: `Typo` (editor en rojo) · `Sintaxis` · `Terminal` (prisma / arranque / endpoint / tests) · `Lógica`

| # | Archivo | Línea | Tipo | ¿Qué estaba mal? | ¿Cómo lo detectaste? | ¿Cómo lo solucionaste? |
| --- | --- | --- | --- | --- | --- | --- |
| 0 | `src/ejemplo/ejemplo.service.ts` | 10 | Typo | _(fila de ejemplo, bórrala) se llamaba `this.prisma.usuaro` en vez de `this.prisma.usuario`_ | _VS Code lo marcó en rojo: "Property 'usuaro' does not exist"_ | _corregí el nombre del modelo_ |

| # | Archivo | Línea | Tipo | ¿Qué estaba mal? | ¿Cómo lo detectaste? | ¿Cómo lo solucionaste? |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | `prisma/schema.prisma` | 12 | Terminal | `nombre Strng` | Al ejecutar Prisma en terminal sale `12 \| nombre Strng` | reparamos la palabra `String` |
| 2 | `prisma/schema.prisma` | 63 | Terminal | `[ID])` | Al ejecutar Prisma en terminal sale error de referencia en `Socio` | El campo de relación se encuentra en mayúscula, se pone en minúscula (`[id]`) |
| 3 | `prisma.service.ts` | 6 | Typo | `PrismaClient` (faltaba la `t`) | Visual lo pone en rojo | Puse la `t` |
| 4 | `prisma.config.ts` | 11 | Typo | `url: process.env...` (palabra `URL` mal escrita) | Visual lo pone en rojo | Organicé la palabra `URL` |
| 5 | `prestamo.service.ts` | 27 y 33 | Sintaxis | Al no tener un `await` en la consulta previa, fallaba la referencia en el `if` | Tenía un rojo en el `if` de la línea 33 | Incluí el `await` |
| 6 | `prestamo.service.ts` | 33 | Lógica | En el `if` solo tenía `<` (`< 0`) en vez de `<=` | Por lógica de negocio | Se cambia `<` por `<=` |
| 7 | `libro.controller.ts` | 33 | Sintaxis | El `id` tenía tipo de dato incorrecto | Al correr el servidor, la terminal lo señala | Se aplica `ParseIntPipe`, para garantizar que siempre retorne un valor entero numérico |
| 8 | `libro.service.ts` | 37 | Sintaxis | Estaba llamando al modelo en plural | Al correr el servidor, la terminal lo señala | Se elimina la `s` para que llame el modelo correcto |

<!-- Agrega todas las filas que necesites -->

## Reflexión final

1. ¿Qué tipo de error te costó más encontrar y por qué?
2. ¿Qué herramienta te ayudó más (editor, terminal, Swagger/Postman, tests)?
3. ¿Qué harías para evitar este tipo de errores en tus propios proyectos?
