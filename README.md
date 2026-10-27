# ¿Qué personaje sos? — guía para empezar

Esta primera versión editable incluye un test de personalidad, un resultado personalizado por IA y un chat de IA.

## Antes de empezar
Necesitás internet y Node.js LTS: https://nodejs.org/
Podés editar los archivos con Bloc de notas o Visual Studio Code.

La IA usa la API de OpenAI. **La API se factura por separado de ChatGPT** y puede requerir configurar facturación. Si es para la escuela, pedile a un adulto responsable o docente que revise la cuenta, la clave y los límites de gasto. Nunca compartas tu clave.

## Cómo ejecutar la web en Windows
1. Descargá y extraé el ZIP en una carpeta.
2. Instalá Node.js LTS desde https://nodejs.org/ y después cerrá y volvé a abrir la terminal.
3. Abrí la carpeta extraída. En el Explorador, hacé clic en la barra de dirección, escribí `cmd` y apretá Enter.
4. Escribí `npm install` y esperá a que termine.
5. Copiá `.env.example` y llamá a la copia `.env` (sin `.example`). Si no ves archivos que empiezan con punto, activá “Elementos ocultos”.
6. Abrí `.env` en un editor y reemplazá `pegá_tu_clave_aquí` por tu clave API. Guardá. **No la pongas en `public/app.js`, `public/index.html`, capturas o repositorios públicos.**
7. En la terminal ejecutá `npm start`.
8. Abrí http://localhost:3000 en tu navegador.
9. Probá todas las preguntas y luego el chat. Para detener el servidor, volvé a la terminal y apretá `Ctrl + C`.

## Qué pueden editar
- `public/data.js`: preguntas, opciones, categorías y textos de las tarjetas.
- `public/styles.css`: colores, tamaños, espacios y diseño.
- `public/index.html`: títulos, textos y secciones.
- `public/app.js`: comportamiento de botones y test.
- `server.js`: conexión con IA y catálogo que usa el resultado. Mejor no tocarlo hasta que la primera versión funcione.

Si agregan personajes, actualicen el catálogo `catalog` en `server.js` y también las categorías/preguntas si quieren. El test recomienda solo personajes del catálogo del servidor.

## Si algo falla
- `node` o `npm` no se reconoce: instalá Node.js LTS y abrí una terminal nueva.
- La página no abre: comprobá que `npm start` siga funcionando.
- Error de clave: confirmá que el archivo se llame exactamente `.env`, que la clave esté bien escrita y reiniciá `npm start`.
- Error de saldo/límite: revisá la facturación y uso de la API. Una suscripción de ChatGPT no incluye automáticamente uso de API.
- Modelo no disponible: cambiá `OPENAI_MODEL` en `.env` por un modelo disponible en tu cuenta API y reiniciá el servidor.

La IA necesita internet. Esta versión no tiene cuentas de usuario ni guarda conversaciones permanentemente. No ingresen información privada.
