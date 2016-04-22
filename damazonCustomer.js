var mysql      = require('mysql');
var prompt     = require('prompt');

var connection = mysql.createConnection({
  host     : 'localhost',
  port     :  3306,
  user     : 'root',
  password : 'Eliza1220',
  database : 'damazon'
});
function purchase() {

	connection.query('SELECT * FROM products', function(err, rows) {
		console.log("-----------------------");  
  	for (var i = 0; i < rows.length; i++) {
  		console.log("Item ID: " + rows[i].item_id);
  		console.log("Product Name: " + rows[i].product_Name);
  		console.log("Price: " + rows[i].price); 
  		console.log("----------------------");
  	};
	prompt.get(['Id_of_purchase', 'quantity'], function (err, result) {
		var alterId= result.Id_of_purchase;
		for(k = 0; k<rows.length; k++){
			if (rows[k].item_id==alterId){
				console.log("You've chosen " +rows[k].product_Name);
    			if(result.quantity <= rows[k].stock){
    				console.log("Your purchase of " + result.quantity + " " + rows[k].product_Name + " is complete.");
    				var total= result.quantity * rows[k].price;
    				console.log("The total of your purchase is: $"+total);
    				salesSheet();
    				var newQuantity= rows[k].stock - result.quantity;
    				connection.query("UPDATE products SET stock = ? WHERE item_id = ?",[newQuantity,result.Id_of_purchase],function(err,res2){
						if (err) throw err;
				
					});
    			newPurchase();
    			}else{
    				console.log("Sorry there are only "+ rows[k].stock+ " "+ rows[k].product_Name + " in stock.");
    				newPurchase();
    			};
    		};
    	};
	});

	});
};

purchase();
function newPurchase(){
	console.log("Would You like to make another purchase? Please Select Y or N")
	prompt.get(['NewPurchase'], function(err, res){
		var newPurch= res.NewPurchase.toLowerCase();
		if(newPurch=='y'){
			purchase();
		}else{
			connection.end();
		}

	});
}
function salesSheet(){
	SELECT departments.departmentName, SUM(Orders.OrderID) AS NumberOfOrders FROM Orders LEFT JOIN Shippers ON Orders.ShipperID=Shippers.ShipperID GROUP BY ShipperName;

}