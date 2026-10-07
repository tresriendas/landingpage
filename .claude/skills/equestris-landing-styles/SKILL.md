---
name: "equestris-landing-styles"
description: "Usar al diseñar o codear la landing page de Equestris (o cualquier página de marketing de Equestris/TresRiendas) para aplicar la paleta, tipografía, componentes y formas del frontend Angular."
---

# Sistema visual de Equestris para la landing

Fuente de verdad: el frontend Angular en `TresRiendas/app/Frontend` (`src/styles.scss`, `app.component.scss`, `features/home/*`). Si el usuario tiene esa carpeta conectada y algo de acá parece desactualizado, releer esos archivos y priorizarlos.

Carácter de la marca: elegante, ecuestre, tradicional-premium. Azul náutico (marino profundo) + dorado + crema. Titulares serif clásicos, texto sans geométrico. Mucho aire, fotos ecuestres a sangre con overlay marino, detalles finos en dorado (líneas de 1px, subrayados, filetes). Nada de colores saturados, gradientes de colores, ni esquinas muy redondeadas en bloques grandes.

## 1. Tokens (copiar tal cual en `:root`)

```css
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=Montserrat:wght@400;500;600;700&display=swap');

:root {
  --navy: #0e1c2f;      /* AZUL NÁUTICO: color de marca. Fondo header/footer/hero, texto de titulares, theme-color */
  --navy-2: #16294a;
  --navy-3: #1f3558;    /* hover de botón primario, links secundarios */
  --forest: #13233b;    /* alias histórico del color principal: es azul náutico, no verde */
  --ink: #16202e;       /* texto base */
  --muted: #6b7382;     /* texto secundario */
  --sand: #f3ece0;      /* fondo de secciones alternas */
  --cream: #faf6ef;     /* fondo de página */
  --gold: #c9a15b;      /* acento principal */
  --gold-2: #b88d45;    /* dorado más oscuro: links sobre fondo claro, eyebrows en modales */
  --gold-soft: #f4e9d4;
  --tint: #f1ebe0;      /* fondo de elementos seleccionados / hover suave */
  --line: #e6dfd2;      /* bordes y divisores */
  --white: #fff;
  --success: #5f8d68;
  --danger: #b75f52;
  --font-serif: 'Cormorant Garamond', Georgia, serif;
  --font-sans: 'Montserrat', system-ui, sans-serif;
  --radius: 14px;
  --shadow: 0 12px 34px rgba(14, 28, 47, .08);
}
```

Reglas de color:
- **El color de marca es el azul náutico `#0e1c2f` (`--navy`).** Debe aparecer en header, footer, hero, bandas oscuras, botón primario, titulares y en `<meta name="theme-color" content="#0e1c2f">`. Equestris no usa verde como color de marca: si aparece algún verde heredado (p. ej. `#17352a`), reemplazarlo por `--navy`.
- Página sobre `--cream`; secciones alternas en `--sand`; bandas oscuras en `--navy`.
- Dorado solo como acento: eyebrows, `<em>` destacado del título, íconos, subrayados, CTA principal, bordes finos. Nunca como fondo de grandes superficies.
- Sobre azul náutico, el texto blanco usa opacidades: títulos `#fff`, cuerpo `rgba(255,255,255,.85)`, secundarios `.7`, notas `.55`, copyright `.45`.
- Bordes dorados translúcidos sobre azul: `rgba(201,161,91,.18–.45)`. Divisores blancos: `rgba(255,255,255,.1–.35)`.
- Overlays de fotos siempre en azul náutico `rgba(14,28,47, …)`, nunca negro puro.
- Estados: usar solo `--success` y `--danger` (no rojos sueltos como `#c0392b`).

## 2. Tipografía

- Base: `font-family: var(--font-sans); color: var(--ink); -webkit-font-smoothing: antialiased;`
- `h1, h2`: `var(--font-serif)`, peso 600, color `--navy`, `letter-spacing: -.005em`.
  - `h1`: `clamp(38px, 5vw, 62px)`, `line-height: 1.02`. En el hero: `clamp(44px, 6vw, 76px)`, `line-height: .98`, blanco.
  - `h2`: 36px, `line-height: 1.1` (en bloques de sección `clamp(32px, 3vw, 40px)`).
  - `h3` de cards: serif 600, 20–24px, `--navy`.
- Palabra destacada en titulares: `<em>` sin itálica, color `--gold` (`em { font-style: normal; color: var(--gold); }`).
- Eyebrow (sobre cada título de sección): `font-size: 11px; font-weight: 700; letter-spacing: .22em; text-transform: uppercase; color: var(--gold);` (sobre fondo claro dentro de modales se usa `--gold-2`).
- Etiquetas tipo/categoría: uppercase, 9–10px, peso 700–800, `letter-spacing: .1–.14em`, dorado.
- Cuerpo: 15–16px, `line-height: 1.6`, `--muted` sobre claro. Navegación y botones: 13px.
- Números/cifras destacadas y citas: serif (cifras 46px peso 600, citas 22–26px `line-height: 1.2`).
- Marca: `♞` en dorado (38px) + `EQUESTRIS` en serif 600, 27px, `letter-spacing: .08em`, blanco sobre azul náutico.

## 3. Layout

- Contenedor: `width: min(1240px, 92vw); margin: 0 auto;` (páginas internas usan `min(1180px, 90vw)`).
- Grillas con `gap: 18px` (`.grid-3`, `.grid-4`); bajan a 2 columnas < 900px y a 1 < 580px.
- Cabecera de sección: flex `space-between`, `align-items: end`, margen `45px 0 20px`; eyebrow + h2 a la izquierda, botón secundario "Ver todos" a la derecha. En mobile se apila.
- Ritmo vertical de secciones: 60–80px de padding.
- `html { scroll-behavior: smooth; scroll-padding-top: 90px; }` por el header fijo. La app oculta la scrollbar de la página.
- Breakpoints usados: 1100, 960, 900, 800, 580/560px.

## 4. Componentes

### Botones
```css
.btn { border: 1px solid transparent; border-radius: 8px; padding: 12px 22px; font-size: 13px; font-weight: 600; letter-spacing: .02em; text-decoration: none; display: inline-flex; align-items: center; justify-content: center; gap: 10px; transition: background .2s, color .2s, border-color .2s, transform .2s; }
.btn:hover { transform: translateY(-1px); }
.btn-primary { background: var(--navy); color: #fff; }            .btn-primary:hover { background: var(--navy-3); }
.btn-secondary { background: transparent; color: var(--navy); border-color: var(--navy); }  .btn-secondary:hover { background: var(--navy); color: #fff; }
.btn-gold { background: var(--gold); color: var(--navy); }          .btn-gold:hover { background: #d6b06c; }
.btn-outline-light { background: transparent; color: #fff; border-color: rgba(255,255,255,.75); }  .btn-outline-light:hover { background: #fff; color: var(--navy); }
```
- CTA principal = `.btn-gold` + ícono flecha a la derecha. Sobre fotos/azul, el secundario es `.btn-outline-light`. Sobre fondo claro, `.btn-secondary`.
- En el hero los botones crecen: `padding: 14px 28px; font-size: 14px`.
- Links de texto tipo "Ver evento →": 11–12px, peso 700, color `--gold-2`, sin subrayado.

### Cards
```css
.card { background: #fff; border: 1px solid var(--line); border-radius: var(--radius); box-shadow: var(--shadow); }
```
- Hover de cards clicables: `transform: translateY(-4px)` (+ sombra `0 18px 40px rgba(14,28,47,.14)`), transición .25s.
- Card de evento: imagen 205–210px `object-fit: cover`; badge de fecha arriba-izquierda (fondo `--navy`, texto `--gold`, 11px peso 700, `letter-spacing: .06em`, radio 8px, ej. "12 SEP"); cuerpo `padding: 20px` con tipo (eyebrow chico), h3 serif, ubicación con ícono pin en `--muted` 12px, y pie con `border-top: 1px solid var(--line)`.
- Card de categoría: imagen cuadrada (`aspect-ratio: 1`), radio 10px, label con ícono azul náutico + texto 11.5px peso 500.

### Chips / pills
```css
.chip { border: 1px solid var(--line); background: #fff; border-radius: 999px; padding: 8px 14px; font-size: 12px; font-weight: 600; color: var(--muted); }
.chip.active { background: var(--navy); color: #fff; border-color: var(--navy); }
```
Selector de idioma: pill con borde `rgba(255,255,255,.2)`, botones 11px peso 600, activo en dorado con texto azul náutico.

### Inputs
- Borde `1px solid var(--line)`, radio 10–11px, alto 52px en formularios destacados.
- Focus: `border-color: var(--gold); box-shadow: 0 0 0 3px rgba(201,161,91,.18); outline: 0;`
- Labels: 11px uppercase peso 800 `--muted` `letter-spacing: .06em` (o 13px peso 700 `--ink` en modales).

### Radios
- Botones y badges 8px · inputs 10–11px · cards `--radius` 14px · modales 18px · pills 999px · avatar 50%.

### Íconos
Línea estilo Feather/Lucide: `viewBox 0 0 24 24`, `fill="none"`, `stroke="currentColor"`, `stroke-width="1.6"`, `stroke-linecap/linejoin="round"`, tamaño `1em` heredando color. Set existente: users, user, calendar, store, cap, megaphone, heart, trophy, home, bag, wrench, landmark, tag, search, arrow-right, chevron-down, message, map-pin, menu, close. Para íconos nuevos mantener el mismo trazo. Nada de emojis como íconos de UI.

### Modales
Backdrop `rgba(14,28,47,.7)` + `backdrop-filter: blur(8px)`; card blanca radio 18px, sombra `0 28px 80px rgba(14,28,47,.35)`; entrada con `translateY(12px) scale(.98)` → normal en .25s. El modal de registro tiene un panel lateral azul náutico con foto + overlay y el `♞` dorado gigante.

## 5. Estructura de landing (patrón de la home)

1. **Header fijo** 78px (68px < 960px): fondo `rgba(14,28,47,.97)` + `backdrop-filter: blur(14px)`, borde inferior `rgba(201,161,91,.18)`. Marca a la izquierda, nav centrada (13px, blanco .86; hover/activo con subrayado dorado de 1px que entra con `scaleX`, activo en dorado), acciones a la derecha: idioma ES/EN, "Ingresar" (`btn-outline-light`) y "Registrarse" (`btn-gold`). Mobile: hamburguesa y menú desplegable azul náutico.
2. **Hero**: foto ecuestre a sangre (`background-position: 70% 30%`), alto `min(640px, calc(100vh - 78px))`, overlay `linear-gradient(90deg, rgba(14,28,47,.94) 0%, rgba(14,28,47,.78) 34%, rgba(14,28,47,.18) 62%, rgba(14,28,47,.45) 100%), linear-gradient(0deg, rgba(14,28,47,.55), transparent 35%)`. Copy a la izquierda (máx. 560px): eyebrow, h1 en 3 líneas con la última en dorado, subtítulo, CTA dorado + secundario outline. A la derecha, cita serif enmarcada por un filete dorado superior y derecho, con una regla dorada de 44×2px. En < 800px se oculta la cita y el overlay pasa a `90deg .92 → .6`.
3. **Banda de pilares** (fondo azul náutico, borde superior dorado tenue): 6 columnas con ícono dorado 32px + título 13px y bajada 12px, separadas por líneas verticales `rgba(255,255,255,.14)`. 3 cols < 1100px, 2 cols < 580px.
4. **Ecosistema** (fondo `--sand`, padding 60px): columna de copy de 390px + grilla de 6 cards de categoría.
5. **Destacados** (fondo crema): cabecera de sección + `grid-3` de cards de evento.
6. **Banda de cifras**: foto con overlay `linear-gradient(90deg, rgba(14,28,47,.82), rgba(14,28,47,.55))`, cifras en serif 46px separadas por líneas verticales, y una "join card" azul náutico translúcida (radio 12px, borde dorado tenue) con frase serif + CTA dorado. Se apoya directo sobre el footer.
7. **Footer** azul náutico con `border-top: 3px solid var(--gold)`: marca + tagline a la izquierda, links 13px a la derecha (hover dorado), línea de copyright `© 2026 Equestris`.

Fotos: ecuestres reales, tonos cálidos/naturales (Unsplash en el prototipo: hero `photo-1594768816441-1dd241ffaa67`, cifras `photo-1506260408121-e353d10b87c7`, comunidad `photo-1553284965-83fd3e82fa5a`). Siempre con overlay azul náutico si hay texto encima.

## 6. Voz y copy

- Español rioplatense neutro con tuteo ("Únete ahora", "Conoce más", "Descubre. Participa. Conecta. Crece."); la app también tiene inglés, así que no hardcodear textos si se trabaja dentro del proyecto Angular (usar el pipe `translate` y agregar claves en `core/i18n/es.ts` y `en.ts`).
- Tagline: "El mundo ecuestre conectado". Hero: "La comunidad ecuestre de **Sudamérica**". Cita: "Más que un deporte, una forma de vida."
- Verbos de los pilares: Conecta, Descubre, Encuentra, Forma y entrena, Publica, Vive.

## 7. Cómo aplicarlo

- Si la landing vive dentro del proyecto Angular: componentes standalone, reutilizar las clases globales (`.btn*`, `.card`, `.chip`, `.eyebrow`, `.grid-*`, `.section-head`) y `<eq-icon>`; estilos de la página en su `.scss` usando solo variables `var(--…)`.
- Si es un HTML/proyecto aparte: copiar los tokens de la sección 1 y las clases de la sección 4 tal cual, para que la landing y la app se vean idénticas.
- Nunca introducir colores hex nuevos sin justificarlo; derivarlos de los tokens (o con opacidad de azul náutico/dorado/blanco).
- Antes de entregar, revisar: que el azul náutico sea el color dominante de marca (incluido `theme-color`), contraste del texto sobre fotos, que cada sección tenga eyebrow + título serif, comportamiento en 375px sin scroll horizontal, y que los hovers sean sutiles (−1px en botones, −4px en cards).