# Modelo de datos

Propuesta de modelo de datos (Supabase / PostgreSQL + Storage) derivada de `design/`. Sin código todavía: solo tablas, columnas, tipos y relaciones.

## 1. Criterio

El sitio es una plantilla vendible. Todo lo que cambia de un cliente a otro va en la base de datos; solo el texto genérico de interfaz queda en el código.

- **(a) Dato del negocio → base de datos:** sedes, horarios, programas, instructores, testimonios, FAQ, contacto, redes, textos principales (titular, subtítulos de sección, historia), cifras destacadas, colores de las categorías de clase y **todas las imágenes**.
- **(b) Texto genérico de interfaz → código:** etiquetas de botones, formularios y navegación (ver sección 6).

Convenciones de las tablas:

- Todas: `id uuid` PK y `created_at timestamptz`.
- Todas las tablas de contenido (todas excepto `free_class_requests`): `updated_at timestamptz`, que se actualiza en cada modificación de la fila. Por brevedad no se repite en cada tabla de la sección 3.
- `sort_order int` donde el orden importa.
- `is_published boolean` (por defecto `true`) en las tablas donde el cliente quiera ocultar una fila sin borrarla: `locations`, `programs`, `instructors`, `stats`, `class_types`, `location_images`, `testimonials` y `faqs`. Una fila no publicada no se muestra en el sitio, pero conserva sus datos y relaciones.
- Las restricciones a nivel de base de datos están en la sección 4.

## 2. Imágenes (Supabase Storage)

Las imágenes son datos del negocio. Se suben a Supabase Storage y la base de datos guarda **solo la ruta del archivo** (`*_path`, relativa al bucket) y un texto alternativo (`*_alt`). La URL pública se arma en el código a partir de la ruta; nunca se guarda en la base.

Bucket público `site-media`, con carpetas:

| Carpeta | Contenido |
|---|---|
| `brand/` | logo, favicon, imagen para redes (og) |
| `hero/` | imagen principal del inicio |
| `programs/` | foto de cada clase/programa |
| `locations/<slug-sede>/` | foto principal y miniaturas de cada sede |
| `instructors/` | foto de cada instructor |

Inventario de imágenes del diseño y dónde se guarda cada una:

| Imagen en el diseño | Tabla.columna |
|---|---|
| Escudo/logo (header, hero, footer, horarios) | `site_settings.logo_path` / `logo_alt` |
| Alumno de espaldas con dobok (hero) | `hero.image_path` / `image_alt` |
| Foto de cada tarjeta de clase (niños, adultos, mañana, etc.) | `programs.image_path` / `image_alt` |
| Foto principal de la sede ("Salón de entrenamiento") | `locations.main_image_path` / `main_image_alt` |
| Miniaturas de la sede (fachada, clase de niños, clase de adultos / adulto mayor) | `location_images.path` / `alt` |
| Foto del instructor | `instructors.photo_path` / `photo_alt` |
| Favicon e imagen al compartir el sitio (no están en el diseño, pero son datos del cliente) | `site_settings.favicon_path`, `site_settings.og_image_path` |

### ¿Hace falta una tabla de galería?

**No por ahora.** El diseño no tiene una sección de galería. Las fotos de cada sede ya viven en `location_images` (varias por sede, ordenables) y las de las clases en `programs.image_*`. Una tabla `gallery_images` (`path`, `alt`, `caption`, `sort_order`) solo se justifica si una versión futura de la plantilla añade una sección de galería; se agregaría en ese momento.

## 3. Tablas

### 3.1 Identidad y contenido general

**`site_settings`** — una sola fila, garantizada por la base de datos (ver sección 4). Alimenta header, footer, botón "Clase gratis" y metadatos.

| Columna | Tipo | Nota |
|---|---|---|
| business_name | text | "Despertar" |
| business_subtitle | text | "Escuela de Taekwondo" |
| city | text | "Bogotá" |
| footer_description | text | "Escuela de Taekwondo en Bogotá. Clases para niños, jóvenes…" |
| copyright_text | text | "© 2026 Despertar · Escuela de Taekwondo" |
| logo_path, logo_alt | text | ver sección 2 |
| favicon_path | text | |
| og_image_path | text | |
| seo_title, seo_description | text | |
| whatsapp_number | text | número con indicativo de país, p. ej. "+57 300 000 0000"; el enlace usa solo los dígitos |
| free_class_message | text | mensaje prellenado de WhatsApp para "Clase gratis" |
| phone | text, null | "Tel." del footer |
| email | text, null | correo del footer |

**`hero`** — una sola fila, garantizada por la base de datos (ver sección 4). Sección de inicio.

| Columna | Tipo | Nota |
|---|---|---|
| eyebrow | text | "Escuela de Taekwondo · Bogotá" |
| title | text | "Despierta tu" |
| title_highlight | text | "fuerza" (palabra resaltada) |
| subtitle | text | párrafo bajo el titular |
| primary_cta_label | text | "Reserva tu clase gratis →" |
| secondary_cta_label | text | "Conoce las sedes" |
| badge_text | text | "Primera clase sin costo" |
| image_path, image_alt | text | |

**`stats`** — cifras destacadas bajo el hero (2 sedes, 5 años, 5 clases, $0 prueba).

| Columna | Tipo | Nota |
|---|---|---|
| value | text | "2", "5", "$0" |
| label | text | "sedes", "años", "clases", "prueba" |
| description | text | "Salitre y Modelia", "Edad mínima para empezar"… |
| is_published | boolean | |
| sort_order | int | |

**`section_content`** — títulos y textos de cada sección. Una fila por sección.

| Columna | Tipo | Nota |
|---|---|---|
| key | text unique | `clases`, `sedes`, `nosotros`, `testimonios`, `faq`, `clase_gratis`, `contacto` |
| eyebrow | text, null | |
| title | text | "Hay una clase para cada momento de tu vida" |
| subtitle | text, null | |
| body | text, null | historia de la escuela (Nosotros), texto de apoyo |

**`values_principles`** — los cinco principios del Taekwondo (Nosotros).

| Columna | Tipo | Nota |
|---|---|---|
| name | text | "Cortesía" |
| name_ko | text | "예의" |
| sort_order | int | |

### 3.2 Clases y horarios

**`class_groups`** — las tres categorías de público que colorean la grilla (Adulto mayor, Niños, Jóvenes y adultos).

| Columna | Tipo | Nota |
|---|---|---|
| slug | text unique | `mayor`, `ninos`, `adultos` |
| label | text | "Jóvenes y adultos" |
| color_dot, color_soft, color_ink | text | colores hex de leyenda, fondo y texto |
| sort_order | int | |

**`class_types`** — tipos de clase que aparecen en el panel "Qué se trabaja" (20 en el diseño: Equilibrio, Combate, Poomsae, etc.).

| Columna | Tipo | Nota |
|---|---|---|
| slug | text unique | |
| group_id | uuid FK → class_groups | |
| name | text | "Combate (Kyorugi)" |
| description | text | |
| highlights | text[] | los 3 puntos ("Táctica", "Reacción", "Resistencia") |
| is_published | boolean | |

**`programs`** — tarjetas de la sección "Clases" del inicio (5 en el diseño: niños, jóvenes y adultos, adulto mayor, todos los niveles, personalizadas).

| Columna | Tipo | Nota |
|---|---|---|
| name | text | "Taekwondo niños" |
| audience_label | text | "DESDE LOS 5 AÑOS" |
| description | text | |
| time_label | text | "15:00 – 17:00", "Con cita previa" |
| group_id | uuid FK → class_groups, null | define el color del punto; null si no pertenece a un grupo (privadas, mixta) |
| color | text, null | color propio cuando no hay grupo |
| image_path, image_alt | text, null | |
| is_published | boolean | |
| sort_order | int | |

**`schedule_slots`** — una fila por clase en la semana de una sede. Alimenta la grilla de Horarios y la lista "Horarios · {sede}" del inicio (esta se obtiene agrupando franjas; no se guarda aparte).

| Columna | Tipo | Nota |
|---|---|---|
| location_id | uuid FK → locations | |
| class_type_id | uuid FK → class_types | |
| weekday | smallint | 1 = lunes … 7 = domingo |
| start_time, end_time | time | |

Los horarios del inicio ("Lunes a viernes", "Sábado y domingo") salen de agrupar días con la misma franja; las abreviaturas de día (Lun, Mar…) son texto de interfaz.

### 3.3 Sedes

**`locations`**

| Columna | Tipo | Nota |
|---|---|---|
| slug | text unique | `salitre`, `modelia` |
| name | text | "Sede Salitre" |
| short_name | text | "Salitre" |
| neighborhood_label | text | "Salitre · Bogotá" (pestañas) |
| address | text | |
| reference | text, null | punto de referencia |
| phone | text, null | WhatsApp de la sede, mismo formato que `whatsapp_number` |
| whatsapp_message | text, null | mensaje prellenado de la sede |
| maps_url | text | enlace "Cómo llegar" |
| map_embed_url | text, null | mapa integrado |
| main_image_path, main_image_alt | text | |
| is_published | boolean | una sede no publicada se oculta del sitio, y también sus horarios y miniaturas |
| sort_order | int | |

**`location_images`** — miniaturas de cada sede.

| Columna | Tipo | Nota |
|---|---|---|
| location_id | uuid FK → locations | |
| path, alt | text | |
| is_published | boolean | |
| sort_order | int | |

### 3.4 Personas y opiniones

**`instructors`** — bloque "Instructor" en Nosotros.

| Columna | Tipo | Nota |
|---|---|---|
| name | text | |
| rank | text | grado, p. ej. "3er Dan" |
| bio | text | trayectoria, logros, certificaciones |
| photo_path, photo_alt | text | |
| is_published | boolean | |
| sort_order | int | |

**`testimonials`**

| Columna | Tipo | Nota |
|---|---|---|
| quote | text | |
| author_name | text | |
| author_meta | text | "Mamá de alumno · Niños · Salitre" |
| rating | smallint | 1–5 (estrellas) |
| source | text | `manual` o `google` (el diseño indica que se conectará a reseñas de Google) |
| is_published | boolean | |
| sort_order | int | |

**`faqs`**

| Columna | Tipo | Nota |
|---|---|---|
| question, answer | text | |
| is_published | boolean | |
| sort_order | int | |

### 3.5 Contacto y captación

**`social_links`** — "Síguenos" del footer.

| Columna | Tipo | Nota |
|---|---|---|
| platform | text | `instagram`, `facebook`, `tiktok`, `youtube` |
| url | text | |
| sort_order | int | |

**`free_class_requests`** — datos que *entran* desde el formulario "Clase gratis" (no es contenido del sitio). Se guarda y se avisa por Resend.

| Columna | Tipo | Nota |
|---|---|---|
| full_name | text | |
| whatsapp | text | |
| audience | text | para mí / mi hijo o hija / adulto mayor / varias personas |
| location_id | uuid FK → locations | |
| class_group_id | uuid FK → class_groups, null | "Clase de interés" |
| status | text | `new`, `contacted`, `done` |

Las opciones de "¿Para quién es la clase?" son fijas y viven en el código como valores del campo `audience`; las de sede y clase salen de `locations` y `class_groups`/`programs`.

## 4. Relaciones y restricciones

### Relaciones

```
class_groups 1 ── N class_types ── N schedule_slots N ── 1 locations
class_groups 1 ── N programs                              locations 1 ── N location_images
class_groups 1 ── N free_class_requests N ── 1 locations
```

Tablas sin relaciones (contenido suelto): `site_settings`, `hero`, `stats`, `section_content`, `values_principles`, `instructors`, `testimonials`, `faqs`, `social_links`.

### Restricciones a nivel de base de datos

Se definen en la base (no solo en el código) para que ningún dato inválido entre, venga de donde venga.

| Tabla | Restricción | Regla |
|---|---|---|
| `site_settings` | Fila única | Solo puede existir una fila. Se logra con una columna `singleton boolean` (por defecto `true`) con CHECK que exige `true` y restricción UNIQUE: una segunda fila viola la unicidad. |
| `hero` | Fila única | Igual que `site_settings`. |
| `schedule_slots` | CHECK | `weekday` entre 1 y 7. |
| `schedule_slots` | CHECK | `end_time > start_time`. |
| `testimonials` | CHECK | `rating` entre 1 y 5. |
| `free_class_requests` | CHECK | `status` solo `new`, `contacted` o `done` (por defecto `new`). |

## 5. Qué sección del diseño alimenta cada tabla

| Sección del diseño | Tablas |
|---|---|
| Header y navegación | `site_settings` (logo, nombre); menú en código |
| Hero | `hero`, `site_settings` (mensaje WhatsApp) |
| Cifras | `stats` |
| Clases | `section_content` (`clases`), `programs`, `class_groups` |
| Sedes (pestañas, foto, dirección, mapa, horarios resumidos) | `section_content` (`sedes`), `locations`, `location_images`, `schedule_slots`, `class_types`, `class_groups` |
| Nosotros (historia, cinco principios, instructor) | `section_content` (`nosotros`), `values_principles`, `instructors` |
| Clase gratis (formulario) | `section_content` (`clase_gratis`), `free_class_requests`, `locations`, `class_groups` |
| Testimonios | `section_content` (`testimonios`), `testimonials` |
| Preguntas frecuentes | `section_content` (`faq`), `faqs` |
| Contacto y footer | `section_content` (`contacto`), `site_settings`, `locations`, `social_links` |
| Página Horarios (grilla semanal y panel "Qué se trabaja") | `locations`, `schedule_slots`, `class_types`, `class_groups` |

## 6. Se queda en el código (texto genérico de interfaz)

- Botones y enlaces genéricos: "Ver horarios por sede →", "Cómo llegar →", "Escribir a la sede", "Ver horario completo →", "← Volver a sedes", "Pregunta →", "Probar esta clase gratis →", "Agendar mi clase gratis →", "Ver en Google →".
- Formulario: etiquetas ("Nombre completo", "WhatsApp", "¿Para quién es la clase?", "Sede", "Clase de interés"), placeholders, opciones de audiencia, "Sin costo y sin compromiso." (si el cliente quiere cambiarlo, pasa a `section_content`).
- Encabezados fijos de la página Horarios: "Horarios", "Tu semana en {sede}", "Qué se trabaja", "También esta semana…".
- Abreviaturas y nombres de días (Lun…Dom, Lunes…Domingo).
- Ítems del menú (Clases, Sedes, Nosotros, Testimonios, Contacto) y anclas.
- Decoración coreana de plantilla (도장, 태권도, 수련, 제자…): es parte del tema visual, no del negocio. Si otro cliente no la quiere, se quita en el código.
- Mensajes de error y estados de carga.

## 7. Notas

- El diseño contiene marcadores sin contenido real (`[DIRECCIÓN SEDE …]`, `[NÚMERO …]`, `[TELÉFONO]`, `[CORREO]`, `[HISTORIA DE LA ESCUELA]`, `[NOMBRE DEL INSTRUCTOR]`, `[RESPUESTA…]`): corresponden a columnas de las tablas anteriores y son los datos que el cliente debe completar.
- En el diseño, ambas sedes comparten el mismo resumen de horarios en el inicio, pero la grilla de Horarios difiere por sede; por eso `schedule_slots` es por sede.
- Seguridad (RLS), a definir al crear las tablas: lectura pública del contenido publicado; escritura solo para usuarios autenticados; `free_class_requests` con insert público y lectura solo para administradores.
- Todos los datos del diseño son de ejemplo; el seed inicial puede reutilizarlos para el cliente "Despertar".
