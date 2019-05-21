/* ========== REQUIREMENTS FROM NPM ========== */

var mysql = require("mysql"); // npm mysql is used to connect sql to node
var inquirer = require("inquirer"); // a clean interative CLI user interface 
var Table = require("cli-table"); // to display the data from sql into tables cleanly

/* ========== CONNECTION REQUIREMENTS FOR SQL ========== */

var connection = mysql.createConnection({ // var to store connetion to sql database
  host: "localhost",
  port: 3306,
  user: "nodeUser",
  password: "",
  database: "bamazon"
});

/* ========== CLI-TABLE ========== */

var table = new Table({ // to display the initial table
  head: ["SKU", "NAME", "DEPARTMENT", "PRICE", "STOCK"]
});

var updatedTable = new Table({ // to display the table once updated
  head: ["SKU", "NAME", "DEPARTMENT", "PRICE", "STOCK"]
});

/* ========== FUNCTIONS ========== */

connection.connect(function(err) { // start connection for sql
  if (err) throw err; // catch error
  console.log(`connected as customer ${connection.threadId}`); // log to the user to show that you're connected
  start(); // call the starting function
});

/* ========== START FUNCTION ========== */

function start() { // display the table, two prompts amonut and total cost of purchase
  console.log("Selecting all products from Bamazon!.."); // log to indicate that start function is starting
  connection.query("SELECT * FROM products", function(err, res) { // selects all from the products table in sql
    if (err) throw err;
    for (var i = 0; i < res.length; i++) { // for loop to display all the the tables cleanly
      table.push([ // using cli-table push the info the table
        res[i].sku,
        res[i].product_name,
        res[i].department_name,
        `$${res[i].price}`,
        res[i].stock_quantity
      ]);
    }
    console.log(table.toString()); // display the cli-table

    inquirer
      .prompt([
        { // first inquirer prompt, that asks the user to provide the sku of the product they want to buy
          name: "sku_pick",
          type: "input",
          message: "Input the SKU number of the product you would like to purchase" 
        },
        { // second prompt, that asks the user to provide how much they want to purchase
          name: "amount_pick",
          type: "input",
          message: "How much would you like to buy?"
        }
      ])
      .then(answer => {
        var product = res[answer.sku_pick - 1]; // captures the product picked from the first prompt
        var amount = answer.amount_pick; // captures the amount given from the second prompt
        if (amount > product.stock_quantity) { // if there is not enough stock..
          console.log("Insufficient quantity!"); // display to user that there isnt enough
          console.log("SHUTTING DOWN Bamazon...");
          connection.end(); // shut down connection

        } else { // if there is enough stock then..
          var newAmount = parseInt(product.stock_quantity - amount); // capture the information of the stock quantity of selected product minus the amount wanted
          connection.query(
            "UPDATE products SET ? WHERE ?", // update the products table to changed the stock quantity of selected item to newAmount
            [
              {
                stock_quantity: newAmount // update the amount to the newAmount
              },
              {
                sku: product.sku // update only the item the user picked
              }
            ],
            function(err) { // function to display the total cost the user spent
                if (err) throw err
              var total = amount * product.price; // capture the price 
              console.log("Item(s) Purchased!");
              console.log(`Your total cost is: $${total}.`); // dispaly the item user spent
              update() // call the update function for the updated table
            }
          );
        }
      });
  });
}

/* ========== UPDATED TABLE ========== */

function update() { // at the end display the updated table to show the change in stock
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err; // throw error
    for (var i = 0; i < res.length; i++) { // for loop to display
      updatedTable.push([
        res[i].sku,
        res[i].product_name,
        res[i].department_name,
        `$${res[i].price}`,
        res[i].stock_quantity
      ]);
    }
    console.log("UPDATING Bamazon...");    
    console.log(updatedTable.toString()); // disaplay the actuabl table
    console.log("SHUTTING DOWN Bamazon...");
    connection.end(); // ends connection once displaying updated table
}
)};

/* ========== END ========== */

