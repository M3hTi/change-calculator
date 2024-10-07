# Detailed Change Calculator JavaScript Code Explanation

## 1. Global Error Handler

```javascript
window.addEventListener('error', (event) => {
    event.preventDefault()
    console.log(`Custom error handler: Error in ${event.filename} at line ${event.lineno}: ${event.message}`);
    return true;
})
```

**Step-by-step explanation:**
1. `window.addEventListener('error', ...)`: This attaches an event listener to the global `window` object for any uncaught errors.
2. `event.preventDefault()`: Prevents the browser from running its default error handling.
3. `console.log(...)`: Logs a custom error message with file name, line number, and error message.
4. `return true;`: Indicates that the error has been handled.

**Purpose:** This provides a global safety net to catch and log any unexpected errors that might occur anywhere in your script.

## 2. DOM Element Selection

```javascript
const inputGroupe = document.querySelector('.input-group')
const inputs = Array.from(inputGroupe.querySelectorAll('input')).filter(input => input.id !== 'changeAmount')
const changeInput = inputGroupe.querySelector('#changeAmount')
```

**Step-by-step explanation:**
1. `document.querySelector('.input-group')`: Selects the first element with class 'input-group'.
2. `inputGroupe.querySelectorAll('input')`: Selects all input elements within the input group.
3. `Array.from(...)`: Converts the NodeList of inputs into an array for easier manipulation.
4. `.filter(input => input.id !== 'changeAmount')`: Removes the 'changeAmount' input from the array.
5. `inputGroupe.querySelector('#changeAmount')`: Specifically selects the 'changeAmount' input.

**Purpose:** This sets up the necessary DOM references for later use in the script.

## 3. Main Function: changeCalculator

```javascript
const changeCalculator = function () {
    try {
        // ... (function body)
    } catch (error) {
        console.log(error);
    }
}
```

**Step-by-step explanation:**
1. Define `changeCalculator` as a function expression.
2. Wrap the entire function body in a try-catch block for error handling.

### 3.1 Input Validation and Parsing

```javascript
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
        // Similar logic for bill amount
    }
});
```

**Step-by-step explanation:**
1. Initialize `cash` and `bill` variables.
2. Loop through each input in the `inputs` array.
3. Check the `id` of each input to determine if it's 'cashAmount' or 'billAmount'.
4. For each input:
   a. Get the input value.
   b. Check if the value is empty and throw an error if it is.
   c. Parse the value to a float.
   d. Check if the parsed value is positive and throw an error if it's not.
   e. Assign the parsed value to either `cash` or `bill`.

**Purpose:** This ensures that valid, positive numbers are provided for both the cash and bill amounts.

### 3.2 Change Calculation

```javascript
if(cash < bill) throw 'Cash amount must be greater than or equal to bill amount.'
const change = (cash - bill).toFixed(2)
changeInput.value = change
```

**Step-by-step explanation:**
1. Check if cash is less than bill, throw an error if true.
2. Calculate the change by subtracting bill from cash.
3. Use `.toFixed(2)` to round to two decimal places.
4. Set the value of the changeInput to the calculated change.

**Purpose:** This calculates the change and updates the UI with the result.

### 3.3 Change Breakdown

```javascript
let remainingChange = Math.round(change * 100);
const breakdown = {
    twenties: 0, tens: 0, fives: 0, ones: 0,
    quarters: 0, dimes: 0, nickels: 0, pennies: 0
};

// Calculate bills
breakdown.twenties = Math.floor(remainingChange / 2000);
remainingChange %= 2000;
// ... (similar calculations for other denominations)
```

**Step-by-step explanation:**
1. Convert change to cents to avoid floating-point issues.
2. Initialize a `breakdown` object with all denominations set to 0.
3. For each denomination (from largest to smallest):
   a. Use `Math.floor()` to calculate how many of that denomination fit into the remaining change.
   b. Use the modulo operator (`%=`) to update the remaining change.

**Purpose:** This breaks down the total change into specific counts of each bill and coin denomination.

### 3.4 UI Update

```javascript
for (const [denomination, count] of Object.entries(breakdown)) {
    const input = document.getElementById(denomination);
    if (input) input.value = count;
}
```

**Step-by-step explanation:**
1. Use `Object.entries(breakdown)` to get an array of [key, value] pairs from the breakdown object.
2. Loop through each pair, destructuring into `denomination` and `count`.
3. For each denomination:
   a. Try to find an input element with an ID matching the denomination.
   b. If found, set its value to the count for that denomination.

**Purpose:** This updates all the denomination input fields in the UI with the calculated breakdown.

## 4. Event Listener

```javascript
inputGroupe.addEventListener('change', changeCalculator)
```

**Step-by-step explanation:**
1. Add an event listener to the `inputGroupe` element.
2. Listen for the 'change' event.
3. When the event occurs, run the `changeCalculator` function.

**Purpose:** This ensures the change calculation runs whenever any input value changes.

## Key Concepts to Remember

1. **Error Handling:** The code uses both global and local error handling to catch and manage errors effectively.
2. **DOM Manipulation:** The code interacts with the DOM to read input values and update results.
3. **Number Precision:** Change is calculated in cents to avoid floating-point arithmetic issues.
4. **Modular Arithmetic:** The change breakdown uses division and modulo operations to calculate denominations.
5. **Object Iteration:** `Object.entries()` is used to efficiently update multiple UI elements.

## Potential Improvements

1. Consider using 'input' event instead of 'change' for more responsive updates.
2. Add visual feedback for errors instead of just logging to console.
3. Implement input sanitization to prevent non-numeric inputs.
4. Consider using constants for denomination values to improve maintainability.

Remember: When modifying this code, be particularly careful with the change breakdown logic to ensure accuracy across all possible inputs.