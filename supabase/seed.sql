-- Local-only sample data taken from design/. Never applied to the remote project.
-- Placeholders such as [DIRECCIÓN SEDE SALITRE] are kept on purpose.
-- Images come from seed-images/ (uploaded by the CLI, see [storage.buckets.site-media] in config.toml).

insert into public.site_settings (
  business_name, business_subtitle, city, footer_description, copyright_text,
  logo_path, logo_alt, favicon_path, og_image_path, seo_title, seo_description,
  whatsapp_number, free_class_message, phone, email
) values (
  'Despertar',
  'Escuela de Taekwondo',
  'Bogotá',
  'Escuela de Taekwondo en Bogotá. Clases para niños, jóvenes, adultos y adulto mayor.',
  '© 2026 Despertar · Escuela de Taekwondo',
  'brand/Logo.png',
  'Escudo de Despertar, Escuela de Taekwondo',
  'brand/Logo.png',
  'hero/persona sin fondo.png',
  'Despertar · Escuela de Taekwondo',
  'Escuela de Taekwondo en Bogotá. Clases para niños desde los 5 años, jóvenes, adultos y adulto mayor en Salitre.',
  '+57 312 682 4257',
  'Hola Despertar, quiero agendar mi clase gratis de Taekwondo',
  '[TELÉFONO]',
  '[CORREO]@gmail.com'
);

insert into public.hero (
  eyebrow, title, title_highlight, subtitle, primary_cta_label,
  secondary_cta_label, badge_text, image_path, image_alt
) values (
  'Escuela de Taekwondo · Bogotá',
  'Despierta tu',
  'fuerza',
  'Clases para niños desde los 5 años, jóvenes, adultos y adulto mayor en nuestra sede de Salitre. Aquí hay una clase para ti.',
  'Reserva tu clase gratis →',
  'Conoce las sedes',
  'Primera clase sin costo',
  'hero/persona sin fondo.png',
  'Alumno de Despertar de espaldas con dobok y cinturón negro'
);

insert into public.stats (value, label, description, sort_order) values
  ('1', 'sede', 'Salitre · Bogotá', 1),
  ('5', 'años', 'Edad mínima para empezar', 2),
  ('5', 'clases', 'Niños, adultos, mayores, mixta y privada', 3),
  ('$0', 'prueba', 'Tu primera clase es gratis', 4);

insert into public.section_content (key, eyebrow, title, subtitle, body) values
  ('clases', 'Clases', 'Hay una clase para cada momento de tu vida',
    'Los grupos se organizan por horario y por energía, no por una edad exacta. ¿Tienes 13 o 14 años? Entrena con el grupo en el que te sientas mejor.',
    null),
  ('sedes', 'Sedes', 'Elige la sede más cerca de ti',
    'Fotos, ubicación, horarios y contacto de cada dojang en un solo lugar.',
    null),
  ('nosotros', 'Nosotros', 'En Despertar hay clase para todos',
    null,
    E'[HISTORIA DE LA ESCUELA: cómo nació Despertar, desde cuándo enseñan y por qué ese nombre.]\n\nCreemos que el Taekwondo se adapta a cada persona: al niño que sale del colegio con energía, al joven que quiere exigirse y al adulto mayor que busca moverse mejor. Entrenamos con los cinco principios del Taekwondo.'),
  ('clase_gratis', 'Clase gratis', 'Tu primera clase va por nuestra cuenta',
    'Déjanos tus datos y te escribimos por WhatsApp para confirmar el día y la hora.',
    E'Ropa deportiva cómoda\nUna botella de agua\nLlega 10 minutos antes\nNo necesitas experiencia ni uniforme'),
  ('testimonios', 'Testimonios', 'Lo que dicen nuestros estudiantes',
    'Textos de ejemplo · se conectará a reseñas de Google',
    null),
  ('faq', 'Preguntas frecuentes', 'Antes de venir',
    '¿Otra duda? Escríbenos y te respondemos.',
    null),
  ('contacto', null, 'Entrenemos juntos',
    'Escríbenos, elige tu sede y ven a tu primera clase gratis.',
    null);

insert into public.values_principles (name, name_ko, sort_order) values
  ('Cortesía', '예의', 1),
  ('Integridad', '염치', 2),
  ('Perseverancia', '인내', 3),
  ('Autocontrol', '극기', 4),
  ('Espíritu indomable', '백절불굴', 5);

insert into public.class_groups (slug, label, color_dot, color_soft, color_ink, sort_order) values
  ('mayor', 'Adulto mayor', '#3fa35f', '#e3efe6', '#1f6b39', 1),
  ('ninos', 'Niños', '#e8c21e', '#f7eec9', '#7a5c00', 2),
  ('adultos', 'Adultos (+15 años)', '#4a7fd4', '#e0e8f6', '#1d3d73', 3);

insert into public.class_types (slug, group_id, name, description, highlights)
select v.slug, g.id, v.name, v.description, v.highlights
from (values
  -- Adulto mayor
  ('equilibrio', 'mayor', 'Equilibrio', 'Posturas del Taekwondo sostenidas sobre uno y dos apoyos, desplazamientos lentos y cambios de peso controlados.', array['Prevención de caídas', 'Fuerza en piernas y tobillos', 'Mejor postura']),
  ('movilidad', 'mayor', 'Movilidad articular', 'Rutina suave para hombros, columna, cadera y rodillas. Cada articulación se trabaja a su ritmo, sin impacto.', array['Menos rigidez', 'Más rango de movimiento', 'Articulaciones activas']),
  ('respiracion', 'mayor', 'Respiración y chi kung', 'Movimientos lentos coordinados con la respiración profunda, inspirados en el chi kung y el Taekwondo tradicional.', array['Calma y menos estrés', 'Capacidad pulmonar', 'Concentración']),
  ('memoria', 'mayor', 'Coordinación y memoria', 'Secuencias cortas de bloqueos y golpes que se aprenden paso a paso para ejercitar la memoria y la coordinación mano–pie.', array['Memoria', 'Coordinación', 'Agilidad mental']),
  ('taichi', 'mayor', 'Tai chi marcial', 'Formas fluidas de tai chi combinadas con técnicas básicas de Taekwondo, en movimiento continuo y suave.', array['Fluidez', 'Fuerza suave', 'Equilibrio en movimiento']),
  -- Niños
  ('coordinacion', 'ninos', 'Coordinación', 'Circuitos con conos, escaleras y aros que enseñan a mover brazos y piernas en armonía antes de cada técnica.', array['Motricidad', 'Ritmo', 'Conciencia del cuerpo']),
  ('patadas-ninos', 'ninos', 'Técnica de patadas', 'Las patadas base del Taekwondo (ap chagi, dollyo chagi, yeop chagi) explicadas paso a paso y practicadas con paletas.', array['Técnica correcta', 'Equilibrio', 'Confianza']),
  ('reaccion', 'ninos', 'Juegos de reacción', 'Juegos marciales que entrenan reflejos, atención y velocidad de respuesta mientras los niños se divierten.', array['Reflejos', 'Atención', 'Trabajo en equipo']),
  ('poomsae-ninos', 'ninos', 'Poomsae infantil', 'Las primeras formas del Taekwondo: una secuencia de movimientos contra un oponente imaginario que se memoriza y se perfecciona.', array['Memoria', 'Disciplina', 'Preparación de cinturón']),
  ('valores', 'ninos', 'Disciplina y valores', 'Saludo, cortesía, respeto y autocontrol practicados dentro de la clase con dinámicas y pequeños retos.', array['Respeto', 'Autocontrol', 'Escucha']),
  ('agilidad', 'ninos', 'Agilidad y velocidad', 'Desplazamientos, saltos y cambios de dirección rápidos para que se muevan con soltura en el tapete.', array['Velocidad', 'Saltos', 'Cambios de dirección']),
  ('defensa-ninos', 'ninos', 'Defensa personal', 'Cómo poner límites, pedir ayuda y salir de agarres sencillos de forma segura, adaptado a su edad.', array['Seguridad', 'Poner límites', 'Salir de agarres']),
  ('flexibilidad-ninos', 'ninos', 'Flexibilidad', 'Estiramientos con juegos para ganar elasticidad y patear más alto sin lesionarse.', array['Elasticidad', 'Prevención de lesiones', 'Patadas altas']),
  -- Jóvenes y adultos
  ('combate', 'adultos', 'Combate (Kyorugi)', 'Combate deportivo con protecciones: distancia, guardia, ataques y contraataques. Sparring controlado y por niveles.', array['Táctica', 'Reacción', 'Resistencia']),
  ('poomsae', 'adultos', 'Poomsae', 'Las formas del Taekwondo: secuencias fijas de ataques y defensas contra oponentes imaginarios. Se trabaja precisión, potencia, equilibrio y respiración, y son requisito para cada cinturón.', array['Precisión', 'Potencia', 'Examen de cinturón']),
  ('acondicionamiento', 'adultos', 'Acondicionamiento físico', 'Entrenamiento por intervalos con trabajo de fuerza, core y cardio pensado para el Taekwondo. La clase más intensa.', array['Fuerza', 'Cardio', 'Quema calórica']),
  ('patadas-avanzadas', 'adultos', 'Patadas avanzadas', 'Patadas giratorias, con salto y combinaciones. Se trabajan por fases hasta lograr velocidad y control.', array['Giros y saltos', 'Combinaciones', 'Control']),
  ('hosinsul', 'adultos', 'Defensa personal (Hosinsul)', 'Técnicas para liberarse de agarres, controlar y salir de situaciones reales, practicadas con compañero.', array['Liberaciones', 'Control', 'Situaciones reales']),
  ('flexibilidad-potencia', 'adultos', 'Flexibilidad y potencia', 'Estiramiento profundo combinado con pliometría para patear más alto y más fuerte.', array['Elasticidad', 'Explosividad', 'Prevención de lesiones']),
  ('kyukpa', 'adultos', 'Rompimiento (Kyukpa)', 'Romper tablas con técnicas de mano y pie. Enseña precisión, enfoque y confianza en tu propia fuerza.', array['Precisión', 'Enfoque', 'Confianza'])
) as v (slug, group_slug, name, description, highlights)
join public.class_groups g on g.slug = v.group_slug;

-- Programs without a schedule yet are kept unpublished.
insert into public.programs (name, audience_label, description, time_label, group_id, color, image_path, image_alt, is_published, sort_order)
select v.name, v.audience_label, v.description, v.time_label, g.id, v.color, v.image_path, v.image_alt, v.is_published, v.sort_order
from (values
  ('Taekwondo niños', 'DESDE LOS 5 AÑOS', 'Llegan del colegio a entrenar coordinación, disciplina y confianza, con técnica real, juego y mucha paciencia.', 'Mié, vie, sáb y dom', 'ninos', null, 'programs/1790725638823.jpg', 'Clase de niños', true, 1),
  ('Jóvenes y adultos', 'DESDE LOS 15 AÑOS', 'Patadas, técnica, acondicionamiento y combate controlado para quienes quieren exigirse de verdad.', 'Mié, vie, sáb y dom', 'adultos', null, 'programs/1790725638823.jpg', 'Clase de adultos', true, 2),
  ('Adulto mayor', 'MOVILIDAD Y BIENESTAR', 'Taekwondo con tai chi y chi kung: trabajo articular, equilibrio y respiración, a tu ritmo.', '11:00 – 12:00', 'mayor', null, 'programs/1790725638823.jpg', 'Clase de la mañana', false, 3),
  ('Clase para todos los niveles', 'TODAS LAS EDADES', 'Niños, jóvenes y adultos entrenan juntos, cada uno a su nivel. Ideal para venir en familia.', '[DÍA] · [HORA]', null, '#141313', null, null, false, 4),
  ('Clases personalizadas', 'PRIVADAS', 'Uno a uno o en grupo pequeño, con un plan según tu objetivo: cinturón, competencia o salud.', 'Con cita previa', null, '#e2b266', null, null, false, 5)
) as v (name, audience_label, description, time_label, group_slug, color, image_path, image_alt, is_published, sort_order)
left join public.class_groups g on g.slug = v.group_slug;

-- A new location is just another row here (plus its images and schedule slots); no code changes.
insert into public.locations (
  slug, name, short_name, neighborhood_label, address, phone,
  whatsapp_message, maps_url, map_embed_url, main_image_path, main_image_alt, sort_order
) values
  ('salitre', 'Sede Salitre', 'Salitre', 'Salitre · Bogotá', 'Cra. 69d #24-15',
    '+57 316 403 2573',
    'Hola Despertar Sede Salitre, quiero información',
    'https://maps.app.goo.gl/e3NbRUVcv13tTANM7',
    'https://maps.google.com/maps?q=Academia+Taekwondo+Club+Despertar,+Cra.+69d+%2324-15,+Bogot%C3%A1&z=16&output=embed',
    'locations/salitre/Foto nuestra.jpg', 'Salón de entrenamiento de la Sede Salitre', 1);

-- Only one photo per location in seed-images/: the thumbnails reuse it.
insert into public.location_images (location_id, path, alt, sort_order)
select l.id, 'locations/' || l.slug || '/Foto nuestra.jpg', v.alt || ' · ' || l.name, v.sort_order
from public.locations l
cross join (values ('Fachada', 1), ('Clase de niños', 2), ('Clase de adultos', 3)) as v (alt, sort_order);

insert into public.schedule_slots (location_id, class_type_id, weekday, start_time, end_time)
select l.id, c.id, v.weekday, v.start_time::time, v.end_time::time
from (values
  -- Niños
  ('salitre', 'patadas-ninos', 3, '17:00', '18:30'),
  ('salitre', 'poomsae-ninos', 5, '17:00', '18:30'),
  ('salitre', 'coordinacion', 6, '08:00', '10:00'),
  ('salitre', 'reaccion', 7, '08:30', '10:30'),
  -- Adultos (+15 años)
  ('salitre', 'acondicionamiento', 3, '18:30', '20:00'),
  ('salitre', 'poomsae', 5, '18:30', '20:00'),
  ('salitre', 'combate', 6, '08:00', '10:30'),
  ('salitre', 'patadas-avanzadas', 7, '08:30', '10:30')
) as v (location_slug, class_type_slug, weekday, start_time, end_time)
join public.locations l on l.slug = v.location_slug
join public.class_types c on c.slug = v.class_type_slug;

insert into public.instructors (name, rank, bio, photo_path, photo_alt, sort_order) values
  ('[NOMBRE DEL INSTRUCTOR]', '[GRADO] Dan',
    '[TRAYECTORIA: años enseñando, logros, certificaciones y estilo de enseñanza.]',
    'instructors/persona sin fondo.png', 'Foto del instructor', 1);

insert into public.testimonials (quote, author_name, author_meta, rating, source, sort_order) values
  ('Mi hijo llegaba tímido y hoy saluda a todos con confianza. Los profes tienen muchísima paciencia con los pequeños.',
    '[Nombre] · ejemplo', 'Mamá de alumno · Niños · Salitre', 5, 'manual', 1),
  ('Buscaba algo más exigente que el gimnasio. Salgo agotado de cada clase y con ganas de volver al día siguiente.',
    '[Nombre] · ejemplo', 'Jóvenes y adultos · Salitre', 5, 'manual', 2),
  ('Recuperé movilidad en rodillas y hombros. Las clases de la mañana me devolvieron la energía.',
    '[Nombre] · ejemplo', 'Adulto mayor · Salitre', 5, 'manual', 3);

insert into public.faqs (question, answer, sort_order) values
  ('¿Desde qué edad pueden entrenar los niños?',
    'Desde los 5 años. No hay edad máxima: tenemos clases para jóvenes, adultos y adulto mayor.', 1),
  ('¿Necesito experiencia o uniforme para la clase gratis?',
    'No. Ven con ropa deportiva cómoda y agua. Si decides continuar, te orientamos sobre el dobok (uniforme).', 2),
  ('¿Cuánto cuesta la mensualidad?',
    'Escríbenos por WhatsApp y te enviamos los planes según la clase y la sede que elijas.', 3),
  ('Mi hijo tiene 13 años, ¿con qué grupo entrena?',
    'Con el que se sienta mejor. Algunos adolescentes prefieren el grupo de niños y otros el de jóvenes y adultos; lo definimos juntos en la clase de prueba.', 4);

insert into public.social_links (platform, url, sort_order) values
  ('instagram', 'https://instagram.com/', 1),
  ('facebook', 'https://facebook.com/', 2),
  ('tiktok', 'https://tiktok.com/', 3),
  ('youtube', 'https://youtube.com/', 4);
