import mariadb from "mariadb";
import { databaseConfigProps } from "../config.js";

const instance = mariadb.createPool(databaseConfigProps);

async function connectToDatabase() {
  try {
    return await instance.getConnection();
  } catch (error) {
    return error;
  }
}

async function getTestValue(dbConnection) {
  try {
    return await dbConnection.query("Select 1 as val");
  } catch (error) {
    console.log(error);
  }
}

async function getOrders(dbConnection) {
  try {
    return await dbConnection.query("Select * from Orders");
  } catch (err) {
    console.log(err);
  }
}

async function getProducts(dbConnection) {
  try {
    return await dbConnection.query("Select * from Books");
  } catch (err) {
    console.log(err);
  }
}

async function getOrder(dbConnection, orderId) {
  try {
    return await dbConnection.query(
      "Select * from Orders WHERE OrderId = ?",
      [orderId]
    );
  } catch (err) {
    console.log(err);
  }
}

async function deleteOrder(dbConnection, orderId) {
  try {
    await dbConnection.query("DELETE FROM Orders WHERE OrderId = ?", [orderId]);
  } catch (err) {
    console.log(err);
  }
}

async function deleteProduct(dbConnection, bookId) {
  try {
    await dbConnection.query("DELETE FROM Books WHERE BookId = ?", [bookId]);
  } catch (err) {
    console.log(err);
  }
}

async function createOrder(dbConnection, order) {
  try {
    const {quantity, price } = order;
    await dbConnection.query(
      "INSERT INTO Orders (Quantity, Price) VALUES (?, ?)",
      [quantity, price],
      function handleError(err) {
        throw err;
      }
    );
  } catch (err) {
    throw err;
  }
}

async function createBook(dbConnection, product) {
  try {
    console.log(product);
    const { name, price } = product;
    await dbConnection.query(
      "INSERT INTO Books (Name, Price) VALUES (?, ?)",
      [name, price],
      function handleError(err) {
        throw err;
      }
    );
  } catch (err) {
    throw err;
  }
}

export const databaseOperationsAPI = {
  connect: connectToDatabase,
  getTestValue: getTestValue,
  getOrders: getOrders,
  getProducts: getProducts,
  getOrder: getOrder,
  deleteOrder: deleteOrder,
  deleteBook: deleteProduct,
  createOrder: createOrder,
  createProduct: createBook,
}
