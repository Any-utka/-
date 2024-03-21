class TransactionAnalyzer {
    /**
     @param {Array} transactions - создаем массив TransactionAnalyzer.
     */
    constructor(transactions = []) {
        this.transactions = transactions;
    }

    /**
     // Добавляем новую транзакцию в список.
     * @param {Object} transaction
     */
    addTransaction(transaction) {
        // Определяем метод string() для каждой транзакции
        Object.defineProperty(transaction, 'string', {
            value: function() {
                return JSON.stringify(this);
            },
            enumerable: false, // чтобы метод не появлялся при перечислении свойств объекта
            configurable: true // разрешаем изменение определения свойства
        });

        this.transactions.push(transaction);
    }

    /**
     @returns {Array} - Массив всех транзакций.
     */
    getAllTransaction() {
        return this.transactions;
    }

    /**
     @returns {Array} - Массив различных типов транзакций.
     */
    getUniqueTransactionType() {
        const types = new Set(this.transactions.map(transaction => transaction.transaction_type.toLowerCase()));
        return Array.from(types);
    }

    /**
     @returns {number} - Общая сумма всех транзакций.
     */
    calculateTotalAmount() {
        return this.transactions.reduce((total, transaction) => total + parseFloat(transaction.transaction_amount), 0);
    }

    /**
      @param {number} year 
      @param {number} month 
      @param {number} day
      @returns {number} - Общая сумма транзакций за указанную дату.
     */
    calculateTotalAmountByDate(year, month, day) {
        let total = 0;
        this.transactions.forEach(transaction => {
            const date = new Date(transaction.transaction_date);
            if (
                date.getFullYear() === year &&
                date.getMonth() + 1 === month &&
                (!day || date.getDate() === day)
            ) {
                total += parseFloat(transaction.transaction_amount);
            }
        });
        return total;
    }

    /**
      @param {string} type - Тип транзакции ('debit' или 'credit').
      @returns {Array} - Массив транзакций указанного типа.
     */
    getTransactionByType(type) {
        return this.transactions.filter(transaction => transaction.transaction_type.toLowerCase() === type.toLowerCase());
    }

    /**
     * Возвращаем транзакции, проведенные в указанном порядке от startDate до endDate.
      @param {string} startDate 
      @param {string} endDate 
      @returns {Array} 
     */
    getTransactionsInDateRange(startDate, endDate) {
        return this.transactions.filter(transaction => {
            const transactionDate = new Date(transaction.transaction_date);
            const start = new Date(startDate);
            const end = new Date(endDate);
            return transactionDate >= start && transactionDate <= end;
        });
    }

    /**
      @param {string} merchantName - Название торгового представления или компании.
      @returns {Array} - Массив транзакций с указанным торговым представлением или компанией.
     */
    getTransactionsByMerchant(merchantName) {
        return this.transactions.filter(transaction => transaction.merchant_name === merchantName);
    }

    /**
      @returns {number} - Среднее значение транзакций.
     */
    calculateAverageTransactionAmount() {
        const totalAmount = this.calculateTotalAmount();
        const numberOfTransactions = this.transactions.length;
        return totalAmount / numberOfTransactions;
    }

    /**
      @param {number} minAmount 
      @param {number} maxAmount 
      @returns {Array} - Массив транзакций в заданном диапазоне сумм.
     */
    getTransactionsByAmountRange(minAmount, maxAmount) {
        return this.transactions.filter(transaction => {
            const amount = parseFloat(transaction.transaction_amount);
            return amount >= minAmount && amount <= maxAmount;
        });
    }

    /**
      @returns {number} - Общая сумма дебетовых транзакций.
     */
    calculateTotalDebitAmount() {
        const debitTransactions = this.getTransactionByType('debit');
        return this.calculateTotalAmountFromTransactions(debitTransactions);
    }

    /**
      @param {Array} transactions - Массив транзакций.
      @returns {number} - Общая сумма транзакций.
     */
    calculateTotalAmountFromTransactions(transactions) {
        return transactions.reduce((total, transaction) => total + parseFloat(transaction.transaction_amount), 0);
    }
    findMostTransactionsMonth() {
        const months = {};
        this.transactions.forEach(transaction => {
            const date = new Date(transaction.transaction_date);
            const month = date.getMonth();
            const monthName = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][month];
            if (months[monthName]) {
                months[monthName]++;
            } else {
                months[monthName] = 1;
            }
        });
        let maxTransactions = 0;
        let mostTransactionsMonth = '';
        for (const month in months) {
            if (months[month] > maxTransactions) {
                maxTransactions = months[month];
                mostTransactionsMonth = month;
            }
        }
        return mostTransactionsMonth;
    }
    findMostDebitTransactionMonth() {
        const months = {};
        this.transactions.forEach(transaction => {
            if (transaction.transaction_type.toLowerCase() === 'debit') {
                const date = new Date(transaction.transaction_date);
                const month = date.getMonth();
                const monthName = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][month];
                if (months[monthName]) {
                    months[monthName]++;
                } else {
                    months[monthName] = 1;
                }
            }
        });
        let maxDebitTransactions = 0;
        let mostDebitTransactionsMonth = '';
        for (const month in months) {
            if (months[month] > maxDebitTransactions) {
                maxDebitTransactions = months[month];
                mostDebitTransactionsMonth = month;
            }
        }
        return mostDebitTransactionsMonth;
    }
    mostTransactionTypes() {
        const transactionTypes = {};
        this.transactions.forEach(transaction => {
            const type = transaction.transaction_type.toLowerCase();
            if (transactionTypes[type]) {
                transactionTypes[type]++;
            } else {
                transactionTypes[type] = 1;
            }
        });

        let maxTransactions = 0;
        let mostTransactionType = '';
        for (const type in transactionTypes) {
            if (transactionTypes[type] > maxTransactions) {
                maxTransactions = transactionTypes[type];
                mostTransactionType = type;
            }
        }
        return mostTransactionType;
    }
    getTransactionsBeforeDate(date) {
        const transactionsBeforeDate = this.transactions.filter(transaction => {
            return transaction.transaction_date < date;
        });
        return transactionsBeforeDate;
    }
    findTransactionById(id) {
        return this.transactions.find(transaction => transaction.transaction_id === id) || null;
    }
    mapTransactionDescriptions() {
        return this.transactions.map(transaction => transaction.transaction_description);
    }
}

module.exports = { TransactionAnalyzer };
