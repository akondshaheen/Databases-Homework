const express = require("express");
const app = express();
const { Pool } = require("pg");
var bodyParser = require("body-parser");
app.use(bodyParser.json());

app.listen(3000, function () {
  console.log("Server is running on 3000");
});

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "cyf_ecommerce",
  password: "Bird14",
  port: 5432,
});

// If you don't have it already, add a new GET endpoint `/products` to load all the product names along with their supplier names.

// app.get("/products", function (req, res) {
//   pool.query(
//     "SELECT product_name, suppliers.supplier_name FROM products  JOIN suppliers on suppliers.id=supplier_id",
//     (error, results) => {
//       res.json(results.rows);
//     }
//   );
// });

//Update the previous GET endpoint `/products` to filter the list of products by name using a query parameter, for example `/products?name=Cup`. This endpoint should still work even if you don't use the `name` query parameter!

app.get("/products", function (req, res) {
  const name = req.query.name;
  if (name) {
    pool
      .query("SELECT * FROM products WHERE  product_name=$1", [name])
      .then((result) => res.json(result.rows))
      .catch((e) => console.error(e));
  } else {
    pool
      .query("SELECT * FROM products")
      .then((result) => res.json(result.rows))
      .catch((e) => console.error(e));
  }
});
// - Add a new GET endpoint `/customers/:customerId` to load a single customer by ID.
app.get("/customers/:customerId", function (req, res) {
  const customerId = req.params.customerId;

  pool
    .query("SELECT * FROM customers WHERE  id=$1", [customerId])
    .then((result) => res.json(result.rows))
    .catch((e) => console.error(e));
});

// - Add a new POST endpoint `/customers` to create a new customer.
app.post("/customerls/", function (req, res) {
  console.log("checking data", req.body.name);
  const customerName = req.body.name;
  const customerAddress = req.body.address;
  const customerCity = req.body.city;
  const customerCountry = req.body.country;

  const query =
    "INSERT INTO customers (name, address, city, country) VALUES ($1, $2, $3, $4)";
  pool
    .query(query, [
      customerName,
      customerAddress,
      customerCity,
      customerCountry,
    ])
    .then(() => res.send("Customer created!"))
    .catch((e) => console.error(e));
});

// - Add a new POST endpoint `/products` to create a new product (with a product name, a price and a supplier id). Check that the price is a positive integer and that the supplier ID exists in the database, otherwise return an error.
app.post("/products/", function (req, res) {
  const newProducts = req.body.product_name;
  const newPrice = req.body.unit_price;
  const new_supl_id = req.body.supplier_id;

  if (!Number.isInteger(newPrice) || newPrice <= 0) {
    return res.status(400).send("The price should be a positive integer.");
  } else {
    pool
      .query("SELECT * FROM suppliers WHERE id=$1", [new_supl_id])
      .then((result) => {
        if (result.rows.length == 0) {
          return res.status(400).send("No supplier on this product!");
        } else {
          const query =
            "INSERT INTO products(product_name, unit_price, supplier_id) VALUES($1, $2, $3)";
          pool
            .query(query, [newProducts, newPrice, new_supl_id])
            .then(() => res.send(`Customer  updated!`))
            .catch((e) => console.error(e));
        }
      });
  }
});

// - Add a new POST endpoint `/customers/:customerId/orders` to create a new order (including an order date, and an order reference) for a customer. Check that the customerId corresponds to an existing customer or return an error.
app.post("/customers/:customerId/orders", function (req, res) {
  const cId = req.params.customerId;
  const new_order_date = req.body.order_date;
  const new_order_ref = req.body.order_reference;

  pool.query("SELECT * FROM customers WHERE id=$1", [cId]).then((result) => {
    if (result.rows.length == 0) {
      return res.status(400).send("New Customer!");
    } else {
      const query =
        "INSERT INTO orders(order_date, order_reference) VALUES($1, $2)";
      pool
        .query(query, [new_order_date, new_order_ref])
        .then(() => res.send(`Customer  updated!`))
        .catch((e) => console.error(e));
    }
  });
});
// - Add a new PUT endpoint `/customers/:customerId` to update an existing customer (name, address, city and country).
app.put("/customers/:customerId/", function (req, res) {
  const update_id = req.params.customerId;
  const update_name = req.body.name;
  const update_address = req.body.address;
  const update_city = req.body.city;
  const update_country = req.body.country;

  const query =
    " UPDATE customers SET name=$1, address=$2, city=$3, country=$4 WHERE id=$5";
  pool
    .query(query, [
      update_name,
      update_address,
      update_city,
      update_country,
      update_id,
    ])
    .then(() => res.send("Customer updated!"))
    .catch((e) => console.error(e));
});

// - Add a new DELETE endpoint `/orders/:orderId` to delete an existing order along all the associated order items.

// - Add a new DELETE endpoint `/customers/:customerId` to delete an existing customer only if this customer doesn't have orders.

// - Add a new GET endpoint `/customers/:customerId/orders` to load all the orders along the items in the orders of a specific customer. Especially, the following information should be returned: order references, order dates, product names, unit prices, suppliers and quantities.
//WHERE EXISTS (SELECT supplier_id FROM products WHERE new_supplier_id = products.supplier_id)
app.get("/customers/:customerId/orders", function (req, res) {
  const get_id = req.params.customerId;
  const get_name = req.body.name;
  const get_order_ref = req.body.order_reference;
  const get_order_date = req.body.order_date;
  const get_product_name = req.body.product_name;
  const get_unit_price = req.body.unit_price;
  const get_supplier_name = req.body.supplier_name;
  const get_quantity = req.body.quantity;

  const query =
    "SELECT customers.name, orders.order_reference, orders.order_date, products.product_name, products.unit_price, suppliers.supplier_name, suppliers.country, order_items.quantity FROM customers INNER JOIN orders ON customer_id=customers.id INNER JOIN order_items ON order_id=orders.id INNER JOIN products ON products.id=order_items.product_id INNER JOIN suppliers ON suppliers.id=products.supplier_id WHERE customers.id=$1";
  pool
    .query(query, [get_id])
    .then((result) => res.json(result.rows))
    .catch((e) => console.error(e));
});
