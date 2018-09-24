let fs = require('fs'),
    JSONStream = require('JSONStream'),
    es = require('event-stream'),
    { createClient } = require("then-redis"),
    db = createClient('redis://127.0.0.1:6379/fake')
 
var getStream = function() {
    let file = 'fake_data.json',
        stream = fs.createReadStream(file, {encoding: 'utf8'}),
        parser = JSONStream.parse('*')
    return stream.pipe(parser)
}

let counter = 0

getStream().pipe(es.mapSync(function(data) {
    let json_data = JSON.stringify(data)
    console.log('saving data: '+json_data+' to '+counter)
    db.set('key-'+counter++, json_data).then((val) => {
        console.log('data saved!')
    })
}))

