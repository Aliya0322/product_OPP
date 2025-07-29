class Product {
    constructor (id, name, price) {
        this.id = id;
        this.name = name;
        this.price = price;
    }

    getInfo() {
        return(`Артикул: ${this.id}, наименование: ${this.name}, цена: ${this.price}`)
    }
}

class Electronics extends Product {
    #garanty;
    #brand;
    constructor (id, name, price, garanty, brand) {
        super(id, name, price);
        this.#garanty = garanty;
        this.#brand = brand;
    }

    get garanty() {return this.#garanty}
    set garanty(value) {
        if(value<0) {
            throw new Error("Гарантия не может быть отрицательной")
        }
        this.#garanty=value;
    }

    get brand () {return this.#brand};
    set brand(value) {
        if(typeof value !=='string' || value.trim() ==='') {
            throw new Error("Бренд должен быть непустой строкой")
        }
        this.#brand=value;
    }

    getInfo() {
        return(`${super.getInfo()}, гарантия ${this.garanty} мес., бренд ${this.brand}`)
    }
        
    }

class Clothing extends Product {
    #size;
    #material;
    constructor(id, name, price, size, material) {
        super(id, name, price);
        this.#size = size;
        this.#material = material;
    }

    get size() {
        return this.#size;
    }
    set size(value) {
        if(value < 0) {
            throw new Error('Размер не может быть отрицательным')
        }
        this.#size = value;
    }

    get material() {
        return this.#material;
    }

    set material(value) {
        if(typeof value !=='string' || value.trim() ==='') {
            throw new Error("Материал должен быть непустой строкой")
        }
        this.#material=value;
    }

    getInfo() {
        return(`${super.getInfo()}, размер ${this.size}, материал ${this.material}`)
    }
}

class Food extends Product {
    #expiryDate;
    constructor(id, name, price, expiryDate) {
        super(id, name, price);
        this.#expiryDate = expiryDate;
    }

    get expiryDate() {
        return this.#expiryDate;
    }
    set expiryDate(value) {
        if (typeof value !== 'string' && !(value instanceof Date)) {
            throw new Error('Строка должна быть в формате "YYYY-MM-DD"')
        }
        this.#expiryDate = value;
    }

    getInfo() {
        return(`${super.getInfo()}, срок годности ${this.expiryDate}`)
    }
}


class ProductCatalog {
    constructor() {
        this.productList = [];
    }

    filter(criteria) {
    return this.productList.filter(product => {
        if (criteria.maxPrice !== undefined && product.price > criteria.maxPrice) {
            return false;
        }
        if (criteria.category && !(product instanceof criteria.category)) {
            return false;
        }
        return true;
    });
}
}

const catalog = new ProductCatalog();
catalog.productList.push(
    new Electronics(1, "Phone", 500, 12, "Samsung"),
    new Clothing(2, "T-Shirt", 20, "M", "Cotton")
);

const filterCategory = catalog.filter({ category: Electronics });
const filterPrice = catalog.filter({maxPrice: 600});
console.log(filterCategory);
console.log(filterPrice);
