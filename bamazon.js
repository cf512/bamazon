var mysql = require("mysql");
var inquirer = require("inquirer");
var chalk = require("chalk");

// Then create a Node application called bamazonCustomer.js. Running this application will first display all of the items available for sale. Include the ids, names, and prices of products for sale.

var connection = mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "rootroot",
    database: "bamazon_DB"
  });
  
connection.connect(function(err) {
    if (err) throw err;
    console.log(
        "\n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\nConnected to bamazon database as id "
        + connection.threadId + 
        "\n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
    displayAll();
});

function displayAll() {
    // console.log("DISPLAYING ALL PRODUCTS:\n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
    var query = connection.query(
        "SELECT item_id, product_name, stock_quantity, price from products", function(err,res){
            if (err) throw err;
            console.table(res);
            // console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
            prompt();
        });
}

// The app should then prompt users with two messages.

// The first should ask them the ID of the product they would like to buy.

// The second message should ask how many units of the product they would like to buy.

// Create a "Prompt" with a series of questions.
function prompt(){
inquirer
  .prompt([
    // Here we create a basic text prompt.
    {
        type: "input",
        message: "Which item would you like to buy?\n 1- Lawnmower\n 2- Weed Eater\n 3- Television\n 4- Xbox\n 5- Bananas\n 6- Salmon\n 7- Socks\n 8- Phil Collins CD\n 9- Paper Towels\n 10- Whole Milk\n" + chalk.blue("Enter your selection: "),
        name: "order",
    },
    {
        type: "input",
        message: "How many of this item would you like to buy?\n" + chalk.blue("Enter your selection: "),
        name: "quantity",
    },
    {
        type: "confirm",
        message: "Would you like to proceed with this order?:",
        name: "confirm",
        default: true,
    }
  ])
  .then(function(inquirerResponse) {
    // If the inquirerResponse confirms, we display an Order Received message
    if (inquirerResponse.confirm) {

      var theItem = inquirerResponse.order;
      var requestedQuantity = inquirerResponse.quantity;
      // var stockQuantity = 0;

      var howManyCurrently = connection.query(
        "SELECT stock_quantity from products WHERE ?",
        {
          item_id: theItem
        },
        function(err,res){
            if (err) throw err;
            var stockQuantity = JSON.stringify(res[0].stock_quantity);
        });

      console.log("\nOrder Received for Item #: " + inquirerResponse.order + "\nand a quantity of: " + inquirerResponse.quantity);
      console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
      console.log("This is how many are in stock: " + stockQuantity);
      console.log("This is how many were requested: " + requestedQuantity);

      // Once the customer has placed the order, your application should check if your store has enough of the product to meet the customer's request.

      // if (inquirerResponse.quantity > )
      connection.end();

      // If not, the app should log a phrase like Insufficient quantity!, and then prevent the order from going through.
      // However, if your store does have enough of the product, you should fulfill the customer's order.

      // This means updating the SQL database to reflect the remaining quantity.
      // Once the update goes through, show the customer the total cost of their purchase.

      
    }
    else {
      console.log("\nNo problem, come back again another time.\n");
      connection.end();
    }
  });
}

