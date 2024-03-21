const { TransactionAnalyzer } = require('./transactionAnalyzer');
const transactionsData = require('./transactions.json'); 

const analyzer = new TransactionAnalyzer();

// Все транзакции из файла transactions.json
transactionsData.forEach(transaction => {
    analyzer.addTransaction(transaction);
});

// Вывод транзакций
console.log("Список всех транзакций:");
console.log(analyzer.getAllTransaction());

console.log("\nУникальные типы транзакций:");
console.log(analyzer.getUniqueTransactionType());

console.log("\nОбщая сумма всех транзакций:");
console.log(analyzer.calculateTotalAmount());

console.log("\nОбщая сумма транзакций за январь 2019 года:");
console.log(analyzer.calculateTotalAmountByDate(2019, 1));

console.log("\nТранзакции типа 'debit':");
console.log(analyzer.getTransactionByType("debit"));

console.log("\nТранзакции в диапазоне дат с 2019-01-01 по 2019-01-31:");
console.log(analyzer.getTransactionsInDateRange("2019-01-01", "2019-01-31"));

console.log("\nТранзакции совершенные с магазином SuperMart:");
console.log(analyzer.getTransactionsByMerchant("SuperMart"));

console.log("\nСредняя сумма транзакций:");
console.log(analyzer.calculateAverageTransactionAmount());

console.log("\nТранзакции в диапазоне сумм от 50.00 до 150.00:");
console.log(analyzer.getTransactionsByAmountRange(50.00, 150.00));

console.log("\nОбщая сумма дебетовых транзакций:");
console.log(analyzer.calculateTotalDebitAmount());

console.log("\nМесяц с наибольшим количеством транзакций:");
console.log(analyzer.findMostTransactionsMonth());

console.log("\nМесяц с наибольшим количеством дебетовых транзакций:");
console.log(analyzer.findMostDebitTransactionMonth());

console.log("\nНаиболее частый тип транзакций:");
console.log(analyzer.mostTransactionTypes());

console.log("\nТранзакции до 2019-01-01:");
console.log(analyzer.getTransactionsBeforeDate("2019-01-01"));

console.log("\nТранзакция с id '1':");
console.log(analyzer.findTransactionById("1"));

console.log("\nМассив описаний транзакций:");
console.log(analyzer.mapTransactionDescriptions());
