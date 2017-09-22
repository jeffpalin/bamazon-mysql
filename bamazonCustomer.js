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
                            } else if ((quantityAnswer.purchaseQuantity) > (results[0].stock_quantity)) {
                                console.log("\n-----NOT ENOUGH STOCK TO COMPLETE ORDER (ONLY " + (results[0].stock_quantity) + " AVAILABLE) !!-----\n");
                                quantity();
                            } else {
                                // Update the bamazonDB.sql database with the new stock_quantity value
                                var newQuantity = (results[0].stock_quantity) - (quantityAnswer.purchaseQuantity);
                                var totalPrice = (quantityAnswer.purchaseQuantity) * (results[0].price);
                                connection.query(
                                    "UPDATE products SET ? WHERE ?", [{
                                            stock_quantity: newQuantity
                                        },
                                        {
                                            id: itemAnswer.purchaseItem
                                        }
                                    ],
                                    function(err) {
                                        if (err) throw err;
                                        // Give a summary of the purchase
                                        purchaseSummary();
                                        // Prompt the user if they want to purchase more items
                                        inquirer
                                            .prompt({
                                                type: "confirm",
                                                message: "Do you want to make another purchase?",
                                                name: "confirm",
                                                default: true
                                            })
                                            .then(function(purchaseResponse) {
                                                // Reload table for another selection if confirmed for another purchase
                                                if (purchaseResponse.confirm) {
                                                    loadProducts();
                                                } else {
                                                    console.log("\nThanks for coming out!");
                                                    connection.end();
                                                }
                                            });
                                    }
                                );
                                // purchaseSummary function used after purchase and prior to confirm prompt for
                                // another purchase
                                function purchaseSummary() {
                                    console.log("-----------------------------------------------------");
                                    console.log("YOUR PURCHASE WAS COMPLETED SUCCESSFULLY!\n");
                                    console.log("You ordered: " + quantityAnswer.purchaseQuantity + " of the " + results[0].product_name);
                                    console.log("There are " + newQuantity + " left in stock.");
                                    console.log("TOTAL COST: $" + totalPrice);
                                    console.log("-----------------------------------------------------");
                                };
                            };
                        });
                    }
                });
            };
        });
};