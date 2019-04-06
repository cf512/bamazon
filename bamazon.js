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
        "\n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\nCONNECTED TO BAMAZON DATABASE AS ID "
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
            start();
        });
}

// The app should then prompt users with two messages.

// The first should ask them the ID of the product they would like to buy.

// The second message should ask how many units of the product they would like to buy.

// Create a "Prompt" with a series of questions.
function start(){
inquirer
  .prompt([
    // Here we create a basic text prompt.
    {
        type: "input",
        message: "Which item would you like to buy?\n 1- Lawnmower\n 2- Weed Eater\n 3- Television\n 4- Xbox\n 5- Bananas\n 6- Salmon\n 7- Socks\n 8- Phil Collins CD\n 9- Paper Towels\n 10- Whole Milk\n" + chalk.blue("Please enter your selection via Item #:\n"),
        name: "order",
        validate: function(value){
          return !isNaN(value) && value > 1 && value < 11;
        }
    },
    {
        type: "input",
        message: chalk.green("Please enter how many you would like to buy:\n"),
        name: "quantity",
        validate: function(value){
          return !isNaN(value) && value > 0;
        }
    },
    {
        type: "confirm",
        message: chalk.yellow("Would you like to proceed with this order?:\n"),
        name: "confirm",
        default: true,
    }
  ])
  .then(function(inquirerResponse) {
    // If the inquirerResponse confirms, we display an Order Received message
    if (inquirerResponse.confirm) {

      var howManyCurrently = connection.query( "SELECT price, product_name, stock_quantity from products WHERE item_id =" + inquirerResponse.order, function(err,res){
            
            if (err) throw err;

               console.log("+---------------------------------------------+\r\n" + 
             chalk.magenta("                ITEM #" + inquirerResponse.order + " | ") + 
             chalk.cyan.bold((res[0].product_name).toUpperCase()) + "\r\n" +
                          "+---------------------------------------------+\r\n" +
                          "          Currently in stock: " + res[0].stock_quantity + "\r\n" +
                          "          The amount you requested: " + inquirerResponse.quantity + "\r\n" +
                          "+---------------------------------------------+");

            if (inquirerResponse.quantity > res[0].stock_quantity) {
              console.log("Sorry, you have requested more than we have in stock.")
              connection.end();
            }

            else {
              console.log("Okay, sounds good, we'll fulfill this order.");
              let newQuantity = res[0].stock_quantity - inquirerResponse.quantity;
              let customerPrice = (inquirerResponse.quantity * res[0].price).toFixed(2);
              console.log("Your total is $" + customerPrice);
              updateProduct(newQuantity, inquirerResponse.order);
              function updateProduct(value, id){
                connection.query("UPDATE products SET ? WHERE ?",
                [
                  {
                    stock_quantity: value
                  },
                  {
                    item_id: id
                  }
                ],
                function(err, res) {
                    if(err) throw err;
                    console.log("+---------------------------------------------+\r\n" +
                                "       (UPDATED) Currently in stock: " + newQuantity + "\r\n" +
                                "+---------------------------------------------+\r\n");
                    connection.end();
                
                    });
              }
                       
          }
            
      });


      // Once the customer has placed the order, your application should check if your store has enough of the product to meet the customer's request.

      // if (inquirerResponse.quantity > )
      // connection.end();

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