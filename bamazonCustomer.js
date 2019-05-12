var mysql = require('mysql')
var inquirer = require('inquirer')

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
    readProducts()
})

function readProducts () {
    console.log('Slecting all products from Bamazon!..')
    connection.query('SELECT * FROM products', function (err,res) {
        console.log(res)
        connection.end()
    })
}