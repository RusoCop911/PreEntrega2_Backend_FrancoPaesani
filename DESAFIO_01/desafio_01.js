class ProductManager {
    constructor() {
        this.products = [];
        this.nextId = 1;
    }

    addProduct(product) {
        const campoFaltante = this.getCampoFaltante(product);
        if (campoFaltante.length > 0) {
            console.log("Falta el siguiente campo obligatorio: " + campoFaltante.join(", "));
            return;
        }

        if (this.products.some(producto => producto.code === product.code)) {
            console.log("El código del producto ya existe.");
            return;
        }

        product.id = this.nextId++;
        this.products.push(product);
        console.log("Producto agregado con éxito.");
    }

    getCampoFaltante(product) {
        const camposObligatorios = ["title", "description", "price", "thumbnail", "code", "stock"];
        return camposObligatorios.filter(field => !product[field]);
    }

    getProducts() {
        return this.products;
    }

    getProductById(id) {
        const product = this.products.find(producto => producto.id === id);
        if (product) {
            return product;
        } else {
            return "Producto no encontrado.";  
        }
    }
}

const manager = new ProductManager();

const agregarProductos = [
    {
        title: "Prod. 1",
        description: "Descripción del producto 1",
        price: 100,
        thumbnail: "Sin Imagen",
        code: "Prod01",
        stock: 100
    },
    {
        title: "Prod. 2",
        description: "Descripción del producto 2",
        price: 200,
        thumbnail: "Sin Imagen",
        code: "Prod02",
        stock: 50
    },
    {
        title: "Prod. 3",
        description: "Descripción del producto 3",
        price: 300,
        code: "Prod03",
        stock: 300
    },
    {
        title: "Prod. 4",
        description: "Descripción del producto 4",
        price: 400,
        thumbnail: "Sin Imagen",
        code: "Prod02",
        stock: 4
    },
    {
        title: "Prod. 5",
        description: "Descripción del producto 5",
        price: 200,
        thumbnail: "Sin Imagen",
        code: "Prod05",
        stock: 100
    }
];

agregarProductos.forEach(product => {
    manager.addProduct(product);
});

console.log(manager.getProducts());
console.log(manager.getProductById(1));
console.log(manager.getProductById(3));
console.log(manager.getProductById(4));
console.log(manager.getProductById(9));
