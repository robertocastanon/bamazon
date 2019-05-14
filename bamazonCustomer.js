var mysql = require('mysql')
var inquirer = require('inquirer')
var Table = require('cli-table');
 
// instantiate
var table = new Table({
    head: [
        'SKU',
        'NAME',
        'DEPARTMENT',
        'PRICE',
        'STOCK',
    ]
});

// var printValue = connection.query('SELECT * FROM products')

var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'nodeUser',
    password: '',
    database: 'bamazon'
})

connection.connect(function (err) {
    if (err) throw err
    console.log(`connected as id ${connection.threadId}`)

    start()
})

function start () {
    console.log('Selecting all products from Bamazon!..')
    connection.query('SELECT * FROM products', function (err, res) {
        if (err) throw err
        for (var i = 0; i < res.length; i++) {

        table.push(
            [res[i].sku, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity,]
        )};
        
        console.log(table.toString());
        
        
})
        connection.end()
}
