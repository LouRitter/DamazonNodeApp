var mysql      = require('mysql');
var prompt     = require('prompt');

var connection = mysql.createConnection({
  host     : 'localhost',
  port     :  3306,
  user     : 'root',
  password : 'Eliza1220',
  database : 'damazon'
});
function options(){
console.log("Please select option #: (1)List Inventory (2)Show Low Inventory (3)Add Inventory (4)Add New Item");
prompt.get(['option'], function (err, result) {
	var option=result.option;
	
	if(option==1){
		function allProducts(){
		connection.query('SELECT * FROM products', function(err, rows) {
			console.log("-----------------------");  
 		 	for (var i = 0; i < rows.length; i++) {
  				console.log("Item ID: " + rows[i].item_id);
  				console.log("Product Name: " + rows[i].product_Name);
  				console.log("Price: " + rows[i].price); 
  				console.log("Stock: " + rows[i].stock)
  				console.log("----------------------");
 			 };
 		});
 		connection.end();
	};
		allProducts();
		

 		
 	}else if(option==2){
 		function lowInventory(){
 		connection.query('SELECT * FROM products WHERE stock < 5', function(err, res) {
			console.log("-----------------------");  
 		 	for (var i = 0; i < res.length; i++) {
  				console.log("Item ID: " + res[i].item_id);
  				console.log("Product Name: " + res[i].product_Name);
  				console.log("Price: " + res[i].price); 
  				console.log("Stock: " + res[i].stock)
  				console.log("----------------------");
 			 };
 		});
 		connection.end();
 		};
 		lowInventory();
 		
 	}else if(option==3){
		function addMore(){
			prompt.get(['Id','Quantity'], function (err, resultTwo){
				var alterId= resultTwo.Id;
				var quan= parseInt(resultTwo.Quantity);

			connection.query('SELECT * FROM products', function (err, rowsTwo){
				for (k=0; k < rowsTwo.length; k++){
					if (rowsTwo[k].item_id == alterId){
						var newQuantity= rowsTwo[k].stock + quan;

						connection.query("UPDATE products SET stock = ? WHERE item_id = ?",[newQuantity,resultTwo.Id],function(err,resTwo){
							if (err) throw err;
						});
						console.log("Shipment of "+ quan +" "+ rowsTwo[k].product_Name + " is complete.")
						connection.end();
					};
				};
			});
			});
		}
		addMore();
		
 	}else if(option==4){
 		function addNewItem(){
 			prompt.get(['Name','department','price','stock'], function(err, result) {
 				var name= result.Name;
 				var department= result.department;
 				var price= result.price;
 				var stock= result.stock;
 				connection.query("INSERT INTO products (product_Name,department,price,stock) VALUES (?, ?, ?, ?);",[name,department,price,stock], function(err,res){
					if(err) throw err;
					console.log("New Product ("+name+ ") added." ); 			
 				});
 				connection.end();
 			});
 		};
 		addNewItem();
 	};
 });
};
options();

