# bamazon app (node & mysql)
UTAUS201902FSF3-FT/01-class-content/12-mysql/02-Homework/

### Developer's Notes:
This assignment was a fun one and we got to use our newfound Nodejs and MySQL learnings. This app makes use of the mysql and inquirer packages for nodejs. The tougher aspects had to do with making sense of connection.query and its function(err,res) component. The app also uses the chalk package, which was used for styling the text content.

## How it Works:

### The user is prompted to select an item and a quantity. If there is sufficient quantity, the order is accepted, the user is presented with a total cost, and the inventory level in the database is updated:

![](https://raw.githubusercontent.com/cf512/bamazon/master/images/01-in-stock.png)

### If the user requests an amount in excess of the available inventory, they receive an error (based on logic that compares the invetonry and requested amount) and the program closes:

![](https://raw.githubusercontent.com/cf512/bamazon/master/images/02-out-of-stock.png)

## Original Assignment Instructions

1. Create a MySQL Database called `bamazon`.

2. Then create a Table inside of that database called `products`.

3. The products table should have each of the following columns:

   * item_id (unique id for each product)

   * product_name (Name of product)

   * department_name

   * price (cost to customer)

   * stock_quantity (how much of the product is available in stores)

4. Populate this database with around 10 different products. (i.e. Insert "mock" data rows into this database and table).

5. Then create a Node application called `bamazonCustomer.js`. Running this application will first display all of the items available for sale. Include the ids, names, and prices of products for sale.

6. The app should then prompt users with two messages.

   * The first should ask them the ID of the product they would like to buy.
   * The second message should ask how many units of the product they would like to buy.

7. Once the customer has placed the order, your application should check if your store has enough of the product to meet the customer's request.

   * If not, the app should log a phrase like `Insufficient quantity!`, and then prevent the order from going through.

8. However, if your store _does_ have enough of the product, you should fulfill the customer's order.
   * This means updating the SQL database to reflect the remaining quantity.
   * Once the update goes through, show the customer the total cost of their purchase.