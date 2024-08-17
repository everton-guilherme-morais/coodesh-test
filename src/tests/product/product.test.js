const request = require('supertest');

const BASE_URL = 'http://localhost:3002';

describe('GET /products', () => {
  it('should return a list of products', async () => {
    const response = await request(BASE_URL)
      .get('/products')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).toBeInstanceOf(Object);

    expect(response.body.products).toBeInstanceOf(Array);

    expect(response.body.products.length).toBeGreaterThan(0);

    if (response.body.products.length > 0) {
      expect(response.body.products[0]).toHaveProperty('product_name');
    }
    expect(response.body).toHaveProperty('currentPage');
    expect(response.body).toHaveProperty('totalPages');
    expect(response.body).toHaveProperty('totalProducts');
  });
});

describe('POST /products', () => {
  let productCode;

  beforeEach(() => {
    productCode = `test-${Date.now()}`;
  });

  it('should create a new product', async () => {
    const newProduct = {
      code: productCode,
      status: 'draft',
      imported_t: new Date().toISOString(),
      creator: 'testuser',
      created_t: new Date().toISOString(),
      last_modified_t: new Date().toISOString(),
      product_name: 'New Product',
      quantity: '500 g',
      brands: ['Test Brand'],
      categories: ['Test Category'],
      labels: ['Test Label'],
      cities: [],
      purchase_places: ['Test Place'],
      stores: ['Test Store'],
      ingredients_text: 'Test ingredients',
      traces: 'Test traces',
      serving_size: '10 g',
      serving_quantity: 10,
      nutriscore_score: 10,
      nutriscore_grade: 'a',
      image_url: 'https://example.com/image.jpg',
    };

    const response = await request(BASE_URL)
      .post('/products')
      .send(newProduct)
      .expect('Content-Type', /json/)
      .expect(201);

    expect(response.body).toHaveProperty('product_name', 'New Product');
  });
});
