const connect = require('connect');
const url = require('url');

const app = connect();

// Function to handle URL parsing and math operations
function calculate(req, res) {
    const { method, x, y } = url.parse(req.url, true).query; // Parse URL and extract query parameters
    const number1 = parseFloat(x); // Convert 'x' to a number
    const number2 = parseFloat(y); // Convert 'y' to a number

    if (isNaN(number1) || isNaN(number2)) {
        res.end('Invalid numbers for x or y');
        return;
    }

    let result;
    switch (method) {
        case 'add': 
            result = number1 + number2; 
            break;
        case 'subtract': 
            result = number1 - number2; 
            break;
        case 'multiply': 
            result = number1 * number2; 
            break;
        case 'divide':
            if (number2 === 0) return res.end('Division by zero is not allowed');
            result = number1 / number2;
            break;
        default: 
            return res.end('Invalid method. Use "add", "subtract", "multiply", or "divide"');
    }

    res.end(`${number1} ${method} ${number2} = ${result}`);
}

// Use the calculate function for requests to /server
app.use('/server', calculate);

// Start the server on port 1000
app.listen(1000, () => {
    console.log('Server is running at http://localhost:1000/');
});
