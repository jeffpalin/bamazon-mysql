var mysql = require("mysql");
var inquirer = require("inquirer");
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
});
// Function to load the products table from the database and print results to the console
function loadProducts() {
    // Selects all of the data from the MySQL products table
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;

        // Draw the table in the terminal using the response
        console.table(res);
        // Run first question with inquirer
        start();
    });
}

// function which prompts the user for what action they should take
function start() {
    inquirer
        .prompt({
            type: "input",
            name: "purchaseItem",
            message: "What is the ID of the item you would like to purchase? (Quit with Q)",
        })
        .then(function(answer) {
            // based on their answer, either call the bid or the post functions
            if (answer.purchaseItem === "q" || answer.purchaseItem === "Q") {
                connection.end();
            } else {
                // query the database for all items being auctioned
                connection.query("SELECT * FROM products LIMIT " + (answer.purchaseItem - 1) + ",1", function(err, results) {
                    if (err) throw err;
                    console.log(results);

                });
            }
        });
}