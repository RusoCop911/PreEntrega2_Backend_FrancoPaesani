const { Console } = require('console');
const fs = require('fs');

class ProductManager {
    constructor(filePath) {
        this.path = filePath;
        this.nextId = 1;
        this.products = [];
        this.loadProducts();
    }

    loadProducts() {
        try {
            const data = fs.readFileSync(this.path, 'utf8');
            this.products = JSON.parse(data);
            if (this.products.length > 0) {
                this.nextId = Math.max(...this.products.map(product => product.id)) + 1;
            }
        } catch (err) {
            this.products = [];
            console.error ('Error al cargar los productos')
        }
    }

    saveProducts() {
        try {
            fs.writeFileSync(this.path, JSON.stringify(this.products, null, 2));
            console.log('Productos guardados en el archivo JSON.');
        } catch (err) {
            console.error('Error al guardar productos en el archivo JSON:', err)
        }
    }

    addProduct(product) {
        product.id = this.nextId++;
        this.products.push(product);
        this.saveProducts();
        this.loadProducts();
        return product;
    }

    getProducts() {
        return this.products;
    }

    getProductById(id) {
        const product = this.products.find(product => product.id === id);
        return product || null;
    }

    updateProduct(id, fieldToUpdate, value) {
        const product = this.getProductById(id);
        if (product) {
            product[fieldToUpdate] = value;
            this.saveProducts();
        } else {
            console.error('Producto no encontrado.')
        }
    }

    deleteProduct(id) {
        const index = this.products.findIndex(product => product.id === id);
        if (index !== -1) {
            this.products.splice(index, 1);
            this.saveProducts();
            this.loadProducts();
            return ('producto borrado');
        } else {
            console.error('Producto no encontrado.')
        }
    }
}

const manager = new ProductManager('productos.json');

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
