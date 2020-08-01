const express = require("express");
const app = express();
const { Pool } = require("pg");

app.listen(8000, function () {
  console.log("Server is running on 3000");
});

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "cyf_ecommerce",
  password: "Bird14",
  port: 5432,
});

//1. Retrieve all the customers names and addresses who lives in United States

app.get("/customer/name&address", function (req, res) {
  pool.query(
    "SELECT customers.name, customers.address FROM customers WHERE country='United Kingdom'",
    (error, results) => {
      res.json(results.rows);
    }
  );
});

//2. Retrieve all the customers ordered by ascending name

app.get("/customer/orders", function (req, res) {
  pool.query(
    "SELECT orders.* FROM orders INNER JOIN customers ON customer_id=customers.id ORDER BY customers.name ASC",
    (error, results) => {
      res.json(results.rows);
    }
  );
});

//3. Retrieve all the products which cost more than 100

app.get("/customer/costly-products", function (req, res) {
  pool.query(
    "SELECT product_name FROM products where unit_price>100",
    (error, results) => {
      res.json(results.rows);
    }
  );
});

//4. Retrieve all the products whose name contains the word `socks`
app.get("/customer/products/socks", function (req, res) {
  pool.query(
    "SELECT product_name FROM products where product_name like '%socks%'",
    (error, results) => {
      res.json(results.rows);
    }
  );
});

//5. Retrieve the 5 most expensive products
app.get("/customer/products/expensive", function (req, res) {
  pool.query(
    "SELECT product_name FROM products ORDER BY unit_price DESC LIMIT 5",
    (error, results) => {
      res.json(results.rows);
    }
  );
});

//6. Retrieve all the products with their corresponding suppliers.
//The result should only contain the columns `product_name`, `unit_price` and `supplier_name`
app.get("/customer/products&suppliers", function (req, res) {
  pool.query(
    "SELECT product_name, unit_price, suppliers.supplier_name FROM products  JOIN suppliers on suppliers.id=supplier_id",
    (error, results) => {
      res.json(results.rows);
    }
  );
});

//7. Retrieve all the products sold by suppliers based in the United Kingdom.
//The result should only contain the columns `product_name` and `supplier_name`.
app.get("/customer/products&suppliers/UK", function (req, res) {
  pool.query(
    "SELECT product_name, suppliers.supplier_name FROM products  JOIN suppliers on suppliers.id=supplier_id WHERE suppliers.country='United Kingdom'",
    (error, results) => {
      res.json(results.rows);
    }
  );
});

//8. Retrieve all orders from customer ID `1`
app.get("/customer/orders/customer_1", function (req, res) {
  pool.query(
    "SELECT orders.* FROM orders  JOIN customers on customers.id=customer_id WHERE customers.id=1",
    (error, results) => {
      res.json(results.rows);
    }
  );
});

//9. Retrieve all orders from customer named `Hope Crosby`
app.get("/customer/orders/HopeCrosby", function (req, res) {
  pool.query(
    "SELECT orders.* FROM orders  JOIN customers on customers.id=customer_id WHERE customers.name like '%Hope Crosby%'",
    (error, results) => {
      res.json(results.rows);
    }
  );
});

//10. Retrieve all the products in the order `ORD006`.
//The result should only contain the columns `product_name`, `unit_price` and `quantity`.
app.get("/customer/orders/ORD006", function (req, res) {
  pool.query(
    "SELECT product_name, unit_price, order_items.quantity FROM products INNER JOIN order_items on products.id=order_items.product_id  INNER JOIN orders ON orders.id=order_items.order_id  WHERE  orders.order_reference='ORD006'",
    (error, results) => {
      res.json(results.rows);
    }
  );
});

//11. Retrieve all the products with their supplier for all orders of all customers.
//The result should only contain the columns `name` (from customer), `order_reference` `order_date`, `product_name`, `supplier_name` and `quantity`.
app.get("/customer/orders/all", function (req, res) {
  pool.query(
    "SELECT customers.name,order_reference, order_date, products.product_name, suppliers.supplier_name, order_items.quantity FROM orders  INNER JOIN customers ON customer_id=customers.id INNER JOIN order_items ON orders.id=order_items.order_id  INNER JOIN products ON products.id=order_items.product_id INNER JOIN suppliers ON suppliers.id=products.supplier_id ",
    (error, results) => {
      res.json(results.rows);
    }
  );
});

//12. Retrieve the names of all customers who bought a product from a supplier from China.
app.get("/customer/orders/country/china", function (req, res) {
  pool.query(
    "SELECT DISTINCT customers.name FROM customers  INNER JOIN orders ON orders.customer_id=customers.id INNER JOIN order_items ON orders.id=order_items.order_id  INNER JOIN products ON products.id=order_items.product_id INNER JOIN suppliers ON suppliers.id=products.supplier_id WHERE suppliers.country='China' ",
    (error, results) => {
      res.json(results.rows);
    }
  );
});

// Add a new GET endpoint `/customers` to load all the customers from the database
app.get("/customers", function (req, res) {
  pool.query("SELECT * FROM customers", (error, results) => {
    res.json(results.rows);
  });
});

// - Add a new GET endpoint `/suppliers` to load all the suppliers from the database
app.get("/suppliers", function (req, res) {
  pool.query("SELECT * FROM suppliers", (error, results) => {
    res.json(results.rows);
  });
});

// - (STRETCH GOAL) Add a new GET endpoint `/products` to load all the product names along with their supplier names.
app.get("/products", function (req, res) {
  pool.query("SELECT * FROM products", (error, results) => {
    res.json(results.rows);
  });
});
