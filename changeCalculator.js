window.addEventListener('error', (event) => {
    event.preventDefault()
    console.log(`Custom error handler: Error in ${event.filename} at line ${event.lineno}: ${event.message}`);
    return true;
})


const inputGroupe = document.querySelector('.input-group')
const inputs = Array.from(inputGroupe.querySelectorAll('input')).filter(input => input.id !== 'changeAmount')
// console.log(inputs);
const changeInput = inputGroupe.querySelector('#changeAmount')



const changeCalculator = function () {
    try {
        let cash;
        let bill;
        inputs.forEach(input => {
            if(input.id === 'cashAmount'){
                const cashAmount = input.value
                if(cashAmount === '') throw 'pls fill cash Amount input'
                const parseCash = parseFloat(cashAmount)
                if(parseCash <= 0) throw 'pls Enter Positive Value'
                cash = parseCash
            }else if(input.id === 'billAmount') {
                const billAmount = input.value
                if(billAmount === '') throw 'pls fill bill Amount input'
                const parseBill = parseFloat(billAmount)
                if(parseBill <= 0) throw 'pls Enter Positive Value'
                bill = parseBill
            }
        });
        if(cash < bill) throw 'Cash amount must be greater than or equal to bill amount.'
        const change = (cash - bill).toFixed(2)
        changeInput.value = change



        // Break down the change
        let remainingChange = Math.round(change * 100); // Convert to cents
        const breakdown = {
            twenties: 0, tens: 0, fives: 0, ones: 0,
            quarters: 0, dimes: 0, nickels: 0, pennies: 0
        };

        // Calculate bills
        breakdown.twenties = Math.floor(remainingChange / 2000);
        remainingChange %= 2000;
        breakdown.tens = Math.floor(remainingChange / 1000);
        remainingChange %= 1000;
        breakdown.fives = Math.floor(remainingChange / 500);
        remainingChange %= 500;
        breakdown.ones = Math.floor(remainingChange / 100);
        remainingChange %= 100;

        // Calculate coins
        breakdown.quarters = Math.floor(remainingChange / 25);
        remainingChange %= 25;
        breakdown.dimes = Math.floor(remainingChange / 10);
        remainingChange %= 10;
        breakdown.nickels = Math.floor(remainingChange / 5);
        breakdown.pennies = remainingChange % 5;

        // Update the UI with the breakdown
        for (const [denomination, count] of Object.entries(breakdown)) {
            const input = document.getElementById(denomination);
            if (input) input.value = count;
        }
    } catch (error) {
        console.log(error);
    }
}






inputGroupe.addEventListener('change', changeCalculator)