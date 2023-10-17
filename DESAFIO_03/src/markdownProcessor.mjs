import * as marked from 'marked';

const markdownContent = 
`# App para Búsqueda de Productos.

- Para ver todos los productos, visita "/products".
- Para limitar la cantidad de resultados, usa "/products?limit=N" donde "N" es el número de resultados que deseas.
- Para buscar un producto específico, visita "/products/ID", donde "ID" es el número del ID del producto buscado.

¡Suerte en la búsqueda de productos!`;

const htmlContent = marked.parse(markdownContent);

export default htmlContent;
