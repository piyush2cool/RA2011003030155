const { expect } = require('chai');
const axios = require('axios');
const server = require('./index'); // Import your server file

// Define the base URL of your running server
const baseUrl = 'http://localhost:3000';

describe('/numbers', () => {
    it('should fetch, merge, and sort numbers from provided URLs', async () => {
        const urls = [
            'http://20.244.56.144/numbers/primes',
            'http://20.244.56.144/numbers/fibo',
            'http://20.244.56.144/numbers/odd'
        ];

        // Make a request to your server
        const response = await axios.get(`${baseUrl}/numbers`, {
            params: {
                url: urls
            }
        });

        expect(response.status).to.equal(200);
        expect(response.data).to.have.property('numbers').that.is.an('array');

        // Verify that the numbers are merged and sorted
        const mergedNumbers = response.data.numbers;
        expect(mergedNumbers).to.deep.equal([1, 2, 3, 5, 8, 13, 17, 19, 23, 29, 31]);
    });
});

// Close the server after all tests are done
after(() => {
    server.close();
});
