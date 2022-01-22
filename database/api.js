import { databaseOperationsAPI } from "./operations-api.js";
import { router } from "../server-init.js";

let connection;

if (!connection) {
  databaseOperationsAPI.connect().then(con => {
    console.log("Successfully connected to database");
    connection = con;
  })
    .catch(error => console.log(error));
}

router.route("/check-status").get((_, response) => {
  response.status(200).send('All good!');
})

router.route("/get-test-value").get(async function getTestValue(_, response) {
  const value = await databaseOperationsAPI.getTestValue(connection);
  response.status(200).json(value);
})

router.route("/orders").get(async function getOrders(_, response) {
  const orders = await databaseOperationsAPI.getOrders(connection);
  response.status(200).json(orders);
});

router
  .route("/orders/:orderId")
  .get(async function getOrderById(request, response) {
    const orderId = +request.params.orderId;
    const order = await databaseOperationsAPI.getOrder(connection, orderId);
    response.status(200).json(order);
  });

router
  .route("/orders/:orderId")
  .delete(async function deleteOrder(request, response) {
    const orderId = +request.params.orderId;
    await databaseOperationsAPI.deleteOrder(connection, orderId);
    response.status(200).json("Success!");
  });

router
  .route("/products/:bookId")
  .delete(async function deleteBook(request, response) {
    const bookId = +request.params.bookId;
    await databaseOperationsAPI.deleteBook(connection, bookId);
    response.status(200).json("Success!");
  });

router
  .route("/orders")
  .post(async function createOrder({ body: order }, response) {
    try {
      await databaseOperationsAPI.createOrder(connection, order);
      response.status(200).json("Success!");
    } catch (err) {
      console.error(err);
      response.status(500).json("Internal server error!");
    }
  });

router.route("/products").get(async function getProducts(_, response) {
  const orders = await databaseOperationsAPI.getProducts(connection);
  response.status(200).json(orders);
});

router
  .route("/products")
  .post(async function createOrder({ body: product }, response) {
    try {
      await databaseOperationsAPI.createProduct(connection, product);
      response.status(200).json("Success!");
    } catch (err) {
      console.error(err);
      response.status(500).json("Internal server error!");
    }
  });
