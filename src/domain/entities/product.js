class Product {
  constructor({ name, code, imported_t, status }) {
    this.name = name;
    this.code = code;
    this.imported_t = imported_t;
    this.status = status || 'draft';
  }
}

module.exports = Product;
