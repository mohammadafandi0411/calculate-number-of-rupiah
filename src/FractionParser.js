const fraction = [100000, 50000, 20000, 10000, 5000, 1000, 500, 100, 50];
const currencyCharsPattern = /[Rp\. ]+/g;
const validCurrencyPattern = /^(Rp)?( )?((\d{1,3}){1}((\.\d{3})+(\,00)?)|\d+)$/;

class FractionParser {
    constructor(amount) {
        this.amount = amount;
        this.countedFraction = [];
    }

    validateCurrency() {
        return this.amount.match(validCurrencyPattern);
    }

    removeCurrencyChars() {
        this.amount = parseInt(this.amount.replace(currencyCharsPattern, ""));
    }

    getFraction() {
        for (var i = 0; i < fraction.length; i++) {
            var rest = this.amount % fraction[i];
            var count = (this.amount - rest) / fraction[i];
            if (count > 0)
                this.countedFraction.push({ amount: fraction[i], count: count });
            this.amount = rest;
        }   
    }

    doParse() {
        if (this.validateCurrency()) {
            this.removeCurrencyChars();
            this.getFraction();

            return {
                status: 'success',
                data: {
                    lastAmount: this.amount,
                    countedFraction: this.countedFraction
                }
            }
        }
        
        return {
            status: 'failed'
        }
    }
}

export function parseFraction(amount) {
    var fractionParser = new FractionParser(amount);
    return fractionParser.doParse();
}