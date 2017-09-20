var mysql = require("mysql");
var inquire = require("inquirer");
require('console.table');

// create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "R2Qeph2thavU",
    database: "bamazonDB"
});
// connect to the mysql server and sql database
connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    loadProducts();
    // run the start function after the product table to prompt the user
    // start();
    //end the connection and go back to the terminal
    connection.end();
});
// Function to load the products table from the database and print results to the console
function loadProducts() {
    // Selects all of the data from the MySQL products table
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;

        // Draw the table in the terminal using the response
        console.table(res);
    });
}



// function queryAll() {
//     connection.query("SELECT * FROM products", function(err, res) {
//         for (var i = 0; i < res.length; i++) {
//             console.log(res[i].id + " | " + res[i].product_name + " | " + res[i].department_name +
//                 " | $" + res[i].price + " | " + res[i].stock_quantity)
//         }
//         console.log("-----------------------------------");
//     });
// }