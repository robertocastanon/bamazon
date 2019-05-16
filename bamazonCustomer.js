var mysql = require('mysql')
var inquirer = require('inquirer')
var Table = require('cli-table');
 
var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'nodeUser',
    password: '',
    database: 'bamazon'
});

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
        table.push([
            res[i].sku,
            res[i].product_name,
            res[i].department_name,
            res[i].price,
            res[i].stock_quantity,
            ])
        };
    console.log(table.toString());

    inquirer.prompt([
        {
            name: 'sku_pick',
            type: 'input',
            message: 'Input the SKU number of the product you would like to purchase'
        },
        {
            name: 'amount',
            type: 'input',
            message: 'How much would you like to buy?'
        }
    ])
    .then(answer => {


    })

});
connection.end()
};