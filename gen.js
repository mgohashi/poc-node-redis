let faker = require('faker')
let fs = require('fs')
const util = require("util");
let writeFile = util.promisify(fs.writeFile);

let fake_data = [];

for (let i=0;  i< 3000000; i++) {
    let fake_item = {
        id: faker.random.uuid(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email()
    }

    fake_data.push(fake_item)
}

writeFile('fake_data.json', JSON.stringify(fake_data))
    .then(() => console.log('Data written!!'))
    .catch(error => console.log(error));