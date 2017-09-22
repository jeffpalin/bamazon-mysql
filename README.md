# bamazon-mysql


Summary:

This node application allows the user to view an online marketplace and order items. The marketplace is linked to a mySQL database to track inventory. It updates the database as items are purchased.

1.) User inputs: "node bamazonCustomer.js" into the terminal to execute the application.

2.) Once the application is running the user will see a table with items to purchase:

![Image 1](/images/capture1.PNG)

3.) Once the user selects an ID number the application will show a table with the item selected to focus on that particular item as shown below:

![Image 2](/images/capture2.PNG)

4.) The user enters the number of items that they want to purchase.. Note that if the number requested is more than the number available it will tell the user that there is not enough stock available and to input a quantity again.

![Image 5](/images/capture5.PNG)

5.) Input a quantity less than or equal to the quantity of items available. If the stock is available a summary of the purchase including price and updated availabel stock will be shown and the user can choose whether to keep shopping or not:

![Image 3](/images/capture3.PNG)

6.) The application will show an updated table showing the new quantities of items and repeat the process:

![Image 4](/images/capture4.PNG)

7.) The user can quit using "Q" or "q" when prompted or select "N" when asked if they want to keep shopping.
















