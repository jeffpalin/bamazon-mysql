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
        // Run questions with inquirer
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
        .then(function(itemAnswer) {
            // based on their answer, either quit program or pass selection to "else" below
            if (itemAnswer.purchaseItem === "q" || itemAnswer.purchaseItem === "Q") {
                connection.end();
            } else {
                // query the database for the corresponding item based on ID (note that LIMIT in SQL starts at 0 not 1)
                idNumber = (itemAnswer.purchaseItem - 1)
                connection.query("SELECT * FROM products LIMIT " + (idNumber) + ",1", function(err, results) {
                    if (err) throw err;
                    console.table(results);
                    quantity();
                    // Ask how many of the single line table created user wants to purchase
                    function quantity() {
                        inquirer
                            .prompt({
                                type: "input",
                                name: "purchaseQuantity",
                                message: "How many would you like to purchase? (Quit with Q)",
                            })
                            .then(function(quantityAnswer) {
                                // check to make sure there is enough stock to complete order
                                if ((quantityAnswer.purchaseQuantity) === "q" || (quantityAnswer.purchaseQuantity === "Q")) {
                                    connection.end();
                                    // } else if (!Number.isInteger(quantityAnswer.purchaseQuantity)) {
                                    //     console.log("---NOT AN INTEGER!-----");
                                    //     quantity();
                                } else if ((quantityAnswer.purchaseQuantity) > (results[0].stock_quantity)) {
                                    console.log("\n-----NOT ENOUGH STOCK TO COMPLETE ORDER!!-----\n");
                                    quantity();
                                } else {
                                    console.log(results[0].stock_quantity);
                                    console.log(quantityAnswer.purchaseQuantity);
                                }
                            });
                    }
                });
            }
        });
}