# bamazon app (node & mysql)
UTAUS201902FSF3-FT/01-class-content/12-mysql/02-Homework/

### Developer's Notes:
This assignment was a fun one and we got to use our newfound Nodejs and MySQL learnings. This app makes use of the mysql and inquirer packages for nodejs. The tougher aspects had to do with making sense of connection.query and its function(err,res) component. The app also uses the chalk package, which was used for styling the text content.

## How it Works:

### The user is prompted to select an item and a quantity. If there is sufficient quantity, the order is accepted, the user is presented with a total cost, and the inventory level in the database is updated:

![](https://raw.githubusercontent.com/cf512/bamazon/master/images/01-in-stock.png)

### If the user requests an amount in excess of the available inventory, they receive an error (based on logic that compares the invetonry and requested amount) and the program closes:

![](https://raw.githubusercontent.com/cf512/bamazon/master/images/02-out-of-stock.png)

---

For posterity, the original assignment notes can be found here: [assignment.md](https://github.com/cf512/bamazon/blob/master/assignment.md). 