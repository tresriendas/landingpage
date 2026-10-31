---
name: equestris-landing-styles
description: Usar al diseñar o codear la landing page de Equestris (o cualquier página de marketing de Equestris/TresRiendas) para aplicar la paleta, tipografía, componentes y formas del frontend Angular.
---

# Sistema visual de Equestris para la landing

Fuentes de verdad, en este orden:
1. **La landing** (`TresRiendas/LandingPage`, Angular 19): `src/styles/_tokens.scss`, `_typography.scss`, `_mixins.scss`, `src/styles.scss` y los componentes de `src/app/layout` y `src/app/sections`. Es la implementación vigente de este sistema; si algo de este documento difiere del código, manda el código.
2. **La plataforma** (`TresRiendas/app/Frontend`, Angular 20): `src/styles.scss`, `app.component.scss`, `features/home/*`. Referencia para piezas que la landing todavía no tiene (chips, selector de idioma, cards de categoría, etc.).

Si alguna de esas carpetas está conectada y algo de acá parece desactualizado, releer esos archivos y priorizarlos.

Carácter de la marca: elegante, ecuestre, tradicional-premium. Azul náutico (marino profundo) + dorado + crema. Titulares serif clásicos, texto sans geométrico. Mucho aire, detalles finos en dorado (filetes de 1–3px, subrayados, bordes de acento). Nada de colores saturados, gradientes de colores, ni esquinas muy redondeadas en bloques grandes.

## 1. Tokens (`src/styles/_tokens.scss`)

```scss
:root {
  /* Azul náutico: color de marca (header, footer, hero, bandas oscuras, titulares). */
  --navy: #0e1c2f;
  --navy-2: #16294a;
  --navy-3: #1f3558;   /* hover de botón primario */
  --ink: #16202e;      /* texto base */
  --muted: #6b7382;    /* texto secundario */
  --sand: #f3ece0;     /* fondo de secciones alternas */
  --cream: #faf6ef;    /* fondo de página */
  --gold: #c9a15b;     /* acento principal */
  --gold-2: #b88d45;   /* dorado oscuro: eyebrows en modales, íconos sobre claro, hovers de links */
  --gold-soft: #f4e9d4;
  --tint: #f1ebe0;     /* fondo de seleccionados / hover suave */
  --line: #e6dfd2;     /* bordes y divisores */
  --white: #fff;
  --success: #5f8d68;
  --danger: #b75f52;

  --font-serif: 'Cormorant Garamond', Georgia, serif;
  --font-sans: 'Montserrat', system-ui, sans-serif;

  --radius: 14px;        /* cards, carrusel */
  --radius-btn: 8px;     /* botones, badges, icon-btn */
  --radius-input: 10px;
  --radius-modal: 18px;
  --radius-pill: 999px;

  --shadow: 0 12px 34px rgba(14, 28, 47, 0.08);
  --shadow-hover: 0 18px 40px rgba(14, 28, 47, 0.14);

  --space-1: 4px;  --space-2: 8px;  --space-3: 16px; --space-4: 24px;
  --space-5: 40px; --space-6: 64px; --space-7: 96px;

  --header-height: 150px;   /* 84px por debajo de 960px */
}
@media (max-width: 960px) { :root { --header-height: 84px; } }
```

- Usar siempre los tokens de radio, sombra y espaciado en lugar de valores sueltos.
- `--forest` existe solo en la plataforma como alias histórico de azul; en la landing no se usa.
- Fuentes cargadas en `index.html` (preconnect + Google Fonts): Cormorant Garamond 500/600/700 y Montserrat 400/500/600/700.

Reglas de color:
- **El color de marca es el azul náutico `#0e1c2f` (`--navy`).** Aparece en header, footer, hero, botón primario, titulares, badges de fecha y en `<meta name="theme-color" content="#0e1c2f">`. Equestris no usa verde como color de marca: si aparece algún verde heredado (p. ej. `#17352a`), reemplazarlo por `--navy`.
- Página sobre `--cream`; secciones alternas en `--sand`. El hero es azul náutico.
- Dorado solo como acento: eyebrows, palabra destacada del título, íconos, subrayados, CTA principal, bordes de acento. Nunca como fondo de grandes superficies.
- Sobre azul náutico, el texto blanco usa opacidades: títulos `#fff`, cuerpo `rgba(255,255,255,.85)`, nav `.86`, secundarios `.7`, tagline/notas `.55`, copyright `.45`.
- Bordes dorados translúcidos sobre azul: `rgba(201,161,91,.18–.45)`. Divisores blancos: `rgba(255,255,255,.1–.35)`.
- Overlays de fotos siempre en azul náutico `rgba(14,28,47, …)`, nunca negro puro (excepción: sombra proyectada del carrusel, `rgba(0,0,0,.35)`).
- Estados: solo `--success` y `--danger` (fondo de error en bloque: `rgba(183,95,82,.08)`).

## 2. Base global (`src/styles.scss`)

- `body`: fondo `--cream`, color `--ink`, `--font-sans`, antialiased, `overflow-x: hidden`.
- `h1, h2, h3, p { margin: 0 }`; los espaciados se dan desde cada componente.
- `em { font-style: normal; color: var(--gold); }` → palabra destacada en titulares.
- `:focus-visible { outline: 2px solid var(--gold); outline-offset: 2px; }`
- `html { scroll-behavior: smooth; scroll-padding-top: calc(var(--header-height) + 12px); }`
- `img { display: block; max-width: 100%; }`, `button { font: inherit; }`, `a { color: inherit; }`.

## 3. Tipografía (`src/styles/_typography.scss`)

| Mixin | Uso | Valores |
|---|---|---|
| `kicker-label` | Eyebrow sobre cada título | sans 11px, 700, `letter-spacing .22em`, uppercase, `--gold` (en modales `--gold-2`) |
| `heading-hero` | Base de todo titular | serif 600, `line-height 1.1`, `letter-spacing -.005em`, `--navy`, margin 0 |
| `section-title` | h2 de sección | `heading-hero` + `clamp(32px, 3vw, 40px)` |
| `stat-number` | Cifras | serif 600, 46px, `line-height 1`, blanco |
| `body-text` | Párrafos | sans 15px, `--muted`, `line-height 1.6` |

- Título del hero: `heading-hero`, blanco, `clamp(44px, 6vw, 76px)`, `line-height .98`; la segunda parte va en un `<span>` en bloque y dorado.
- Títulos de cards: `heading-hero` 20–22px, `line-height 1.15`.
- Título de modal: `heading-hero` 30px.
- Bloques de sección: título `margin-top: 12px; max-width: 26ch`; bajada `margin-top: var(--space-3); max-width: 56ch`.
- Labels de formulario: 11px, 800, uppercase, `letter-spacing .06em`, `--muted`.
- Marca: `EQUESTRIS` en serif 600, `letter-spacing .08em`, blanco (32px en header, 22px < 580px; 27px uppercase en footer).

## 4. Mixins de layout y componentes (`src/styles/_mixins.scss`)

```scss
@mixin container { width: min(1240px, 92vw); margin-inline: auto; }
```

### Botones — `@include btn($variant)`
Base: inline-flex, `gap 10px`, `padding 12px 22px`, borde 1px transparente, `--radius-btn`, sans 13px 600, `letter-spacing .02em`, `white-space: nowrap`; hover `translateY(-1px)`, active vuelve a 0, disabled `opacity .6`; svg interno `1.1em`.

| Variante | Estilo | Hover |
|---|---|---|
| `primary` | fondo `--navy`, texto blanco | `--navy-3` |
| `secondary` | transparente, texto y borde `--navy` (sobre claro) | fondo navy, texto blanco |
| `gold` | fondo `--gold`, texto `--navy` (CTA principal) | `#d6b06c` |
| `outline-light` | transparente, texto blanco, borde `rgba(255,255,255,.75)` (sobre navy/fotos) | fondo blanco, texto navy |

- En el hero y en el submit del popup los botones crecen: `padding 14px 28px; font-size 14px`.
- CTA principal = `gold` + flecha a la derecha. Sobre navy el secundario es `outline-light`; sobre claro, `secondary`.
- En mobile (< 580px) los botones del hero se apilan a ancho completo.

### Cards
- `@include card` → fondo blanco, borde `1px solid var(--line)`, `--radius`, `--shadow`.
- `@include card-hover` → hover `translateY(-4px)` + `--shadow-hover`, transición .25s.
- **Borde de acento dorado de 2px** para diferenciar tipos de card: superior (`border-top`) en cards de comunidad, izquierdo (`border-left`) en ítems de servicios.
- **Ícono como marca de agua**: SVG del rubro en la esquina inferior derecha, color `--navy`, `opacity .09–.1`, `rotate(-8deg)`, desbordando la card (`right/bottom` negativos, card con `overflow: hidden`); en hover sube a `.16` con `scale(1.04)`. El texto va con `position: relative; z-index: 1`.

### Otros mixins
- `section-head` → columna en mobile; desde 800px fila con `align-items: flex-end; justify-content: space-between` (eyebrow + título a la izquierda, botón a la derecha).
- `icon-badge($size: 48px, $variant: dark)` → cuadrado con `--radius-btn`; `dark`: fondo navy + ícono dorado; `light`: fondo `--tint` + ícono navy; svg al 50%.

### Botones de ícono (header)
40×40px, `--radius-btn`, hover `translateY(-1px)`.
- `outline`: transparente, borde `rgba(255,255,255,.35)`, ícono blanco → hover borde e ícono dorados.
- `gold`: fondo `--gold`, ícono navy → hover `#d6b06c`.
- Toggle de menú: 44×44px, borde `rgba(255,255,255,.2)`.

### Inputs
Alto 48px (52px en formularios de la plataforma), `padding 0 14px`, `--radius-input`, borde `--line`, fondo blanco, sans 14px; placeholder `rgba(107,115,130,.7)`; focus `border-color: var(--gold); box-shadow: 0 0 0 3px rgba(201,161,91,.18); outline: 0`. Errores en `--danger` 12px.

### Íconos
SVG de línea estilo Feather/Lucide inline: `viewBox 0 0 24 24`, `fill="none"`, `stroke="currentColor"`, `stroke-width="1.6"`, extremos y uniones redondeados, heredan el color. Para las marcas de agua de rubro se admiten íconos rellenos (`fill="currentColor"`) porque se ven a baja opacidad. Nada de emojis como íconos de UI.

### Radios
Botones, badges e icon-btn 8px · inputs 10px · cards y carrusel 14px · modales 18px · pills y dots 999px · flechas del carrusel y redes sociales 50% · caja del logo 20%.

## 5. Estructura de la landing

Orden en `app.component.html`: **Header → Hero (con barra de cifras) → Comunidad → Servicios → Eventos → Footer**, más el popup de registro. Secciones con `padding-block: 80px` y anclas `#top`, `#comunidad`, `#servicios`, `#eventos`. La nav tiene tres links: Comunidad, Servicios, Eventos.

1. **Header** (`position: sticky; top: 0; z-index: 40`): fondo `rgba(14,28,47,.97)` + `backdrop-filter: blur(14px)`, **borde inferior `3px solid var(--gold)`** y sombra `0 10px 30px rgba(14,28,47,.45)`. Alto `--header-height` (150px; 84px < 960px).
   - Marca: **logo `images/logo.png`** dentro de una caja crema de 100×100px (62px < 580px), `border-radius: 20%`, borde `1px solid rgba(201,161,91,.45)`, `overflow: hidden`. Como el logo trae el wordmark, se encuadra solo la cabeza del caballo: `object-fit: contain; transform: scale(1.8); transform-origin: 50% 26%`. Al lado, `EQUESTRIS` en serif 32px y debajo el tagline "El mundo ecuestre conectado" (10px, 600, uppercase, `letter-spacing .14em`, blanco `.55`).
   - Nav de escritorio (≥ 900px): links 13px 500, blanco `.86`, `gap 36px`; en hover pasan a blanco y aparece un subrayado dorado de 1px que crece desde la izquierda (`scaleX`, origen `left`, .25s).
   - Acciones: buscar (icon-btn outline), perfil (icon-btn gold) y hamburguesa (solo < 900px). Menú mobile: fondo navy, borde superior dorado tenue, links 14px con divisores `rgba(255,255,255,.1)` y hover dorado.
2. **Hero** (`#top`): fondo navy sólido con un brillo dorado sutil, `radial-gradient(circle at 85% 20%, rgba(201,161,91,.08), transparent 45%), var(--navy)`. Grilla de 1 columna; desde 960px `1fr 1.05fr`, `gap var(--space-6)`, `padding-block 80px`.
   - Copy (máx. 560px, `gap 22px`): eyebrow "Comunidad · Servicios · Eventos", h1 "Todo el mundo ecuestre, **en un solo lugar.**" (segunda línea dorada), bajada 16px blanco `.85` máx. 46ch, CTA gold "Explorar eventos →" + `outline-light` "Conocer la comunidad".
   - Media: **carrusel de fotos** (alto `clamp(240px, 38vw, 480px)`, `--radius`, sombra `0 28px 80px rgba(0,0,0,.35)`, overlay inferior `linear-gradient(0deg, rgba(14,28,47,.55), transparent 35%)`, slide con `transform` de .5s, autoplay que se pausa en hover). Flechas de 42px redondas con vidrio navy (`rgba(14,28,47,.6)` + blur 6px) y borde dorado `.45` → hover fondo dorado e ícono navy. Dots de 8px blancos `.55`; el activo se estira a 24px en dorado. Sobre la esquina superior derecha, un **filete dorado** (borde superior y derecho de 1px `rgba(201,161,91,.45)`, 45%×45%, desplazado −12px, esquina redondeada `calc(var(--radius) + 8px)`); se oculta < 580px.
   - **Barra de cifras** al pie del hero: borde superior `rgba(201,161,91,.18)`, fondo `rgba(255,255,255,.02)`, 3 columnas con `padding-block 28px` separadas por líneas `rgba(255,255,255,.14)`. Valor `stat-number` en **dorado** (34px < 580px); label 11px 700 uppercase `.22em` blanco `.7` (9px y `.14em` en mobile).
3. **Comunidad** (`#comunidad`, fondo `--sand`): eyebrow + h2 "Únase a la comunidad ecuestre *más grande de Argentina*" + bajada. Grilla 1 → 2 (≥ 580px) → 4 columnas (≥ 1100px), `gap 18px`. Cards con `card` + `card-hover`, **borde superior dorado 2px**, `padding 28px 24px 36px`, título serif 22px, texto 14px máx. 30ch, ícono de perfil como marca de agua de 130px (`opacity .09`).
4. **Servicios** (`#servicios`, fondo `--cream`): eyebrow + h2 "Todo lo que su caballo necesita, *a un click*" + bajada. Grilla 1 → 2 (≥ 580px) → 3 (≥ 900px). Ítems con `card`, **borde izquierdo dorado 2px**, `min-height 84px`, `padding 20px 24px`, nombre en serif 20px navy y marca de agua de 84px (`opacity .1`).
5. **Eventos** (`#eventos`, fondo `--sand`): `section-head` con eyebrow + h2 "Agenda ecuestre *siempre actualizada*" y botón `secondary` "Ver todos los eventos". Grilla 1 → 2 → 4. Card: imagen 205px `object-fit: cover`; badge de fecha arriba a la izquierda (navy, texto dorado, 11px 700, uppercase, `.06em`, `padding 7px 11px`, `--radius-btn`); cuerpo `padding 20px` con título serif 22px y lugar con ícono de pin en `--gold-2`, 12px `--muted`, separado por `border-top: 1px solid var(--line)`.
6. **Footer** (navy, **borde superior `3px solid var(--gold)`**): grilla 1 columna → `2fr 1fr 1fr` desde 640px, `padding-block var(--space-6)`. Marca "EQUESTRIS" en serif 27px uppercase + tagline 13px blanco `.7` + redes sociales en círculos de 36px con borde dorado `.35` → hover fondo dorado e ícono navy. Columnas "Plataforma" y "Compañía" con encabezado estilo eyebrow (dorado) y links 13px blanco `.7` → hover dorado. Pie con divisor `rgba(255,255,255,.1)`, 12px blanco `.45`: "© {año} Equestris. Todos los derechos reservados."
7. **Popup de registro** (`<dialog>` nativo): máx. 440px, `--radius-modal`, **borde superior `3px solid var(--gold)`**, sombra `0 28px 80px rgba(14,28,47,.35)`, backdrop `rgba(14,28,47,.7)` + blur 8px, entrada `translateY(12px) scale(.98)` → normal en .25s. Cierre: botón redondo de 34px con borde `--line` → hover navy. Contenido: eyebrow `--gold-2` "No se pierda nada", título 30px, texto 14px, formulario (nombre y apellido en fila, email, WhatsApp opcional), submit `gold` a ancho completo y link "Ya me registré" (12px `--muted` subrayado, hover `--gold-2`). Estado de éxito: círculo navy de 60px con check dorado y animación "pop".

## 6. Voz y copy

- **La landing le habla al visitante de usted**: "Encuentre", "Únase", "su caballo", "su pasión", "Entérese", "pruebe de nuevo". Mantener ese registro en todo texto nuevo de la landing (la plataforma usa tuteo; no mezclar dentro de la landing).
- Foco geográfico de la landing: Argentina ("la comunidad ecuestre más grande de Argentina"); el dominio es `equestris.com.ar`.
- Tagline: "El mundo ecuestre conectado". Hero: "Todo el mundo ecuestre, **en un solo lugar.**"
- Patrón de títulos de sección: frase + remate en `<em>` dorado ("…, *a un click*", "*siempre actualizada*").
- Textos en español directamente en las plantillas (la landing no tiene i18n).

## 7. Cómo aplicarlo

- En la landing: componentes standalone con estilos en su `.scss`, que empiezan con `@use 'mixins' as *;` y `@use 'typography' as *;`. Clases BEM por componente (`.events__card`, `.hero__title`, …). Construir con los mixins (`container`, `btn()`, `card`, `card-hover`, `section-head`, `icon-badge`, `kicker-label`, `section-title`, `body-text`, `stat-number`) y los tokens `var(--…)`; no repetir valores a mano.
- Fuera de la landing (HTML suelto u otro proyecto): copiar los tokens de la sección 1 y traducir los mixins a clases CSS equivalentes para que se vea idéntico.
- Responsive mobile-first con `min-width`; breakpoints usados: 480, 580, 640, 800, 900, 960 y 1100px.
- Nunca introducir colores hex nuevos sin justificarlo; derivarlos de los tokens (o con opacidad de azul náutico/dorado/blanco).
- Antes de entregar, revisar: que el azul náutico sea el color dominante de marca (incluido `theme-color`), filetes dorados coherentes (3px en header/footer/popup, 2px en cards, 1px en subrayados y filetes decorativos), que cada sección tenga eyebrow + título serif con remate dorado, contraste del texto sobre fotos, comportamiento en 375px sin scroll horizontal, hovers sutiles (−1px en botones, −4px en cards) y textos en usted.
