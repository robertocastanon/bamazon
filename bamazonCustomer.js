var mysql = require('mysql')
var inquirer = require('inquirer')
var Table = require('cli-table')

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
        console.log(`----------------------------------------------
        | SKU: ${res[i].sku}
        | NAME: ${res[i].product_name}
        | DEPARTMENT: ${res[i].department_name}
        | PRICE: $${res[i].price}
        | STOCK: ${res[i].stock_quantity}`)}
})
        connection.end()
}
