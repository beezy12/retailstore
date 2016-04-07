const _ = require('underscore')
const mongod = require('mongod')

// type   node index.js  at the cl to see output
// _.each([1, 2, 3], function(v) {
//     console.log(v)
// })


/* Query for a document is slightly trickier.
If you pass the call back to the driver's find function,
you'll get back a cursor rather than a set of documents.
In the context of MongoDB, a cursor
is an object that you could call next on
to get the next document.
However, in order to make things easier
for users who don't need fine grained control
over the cursor, the driver has this nice chainable toArray
function that exhausts the cursor for you
and returns an array of documents in the call back.
And once you run this program, you
should see that MongoDB successfully
inserted a document, and then query to back. */

const uri = 'mongodb://localhost:27017/example'

mongodb.MongoClient.connect(uri, function(error, db) {
    if(error) {
        console.log(error)
        process.exit(1)
    }

    db.collection('sample').insert({ x: 1 }, function(error, result) {
        if(error) {
            console.log(error)
            process.exit(1)
        }

        db.collection('sample').find().toArray(function(error, docs) {
            if(error) {
                console.log(error)
                process.exit(1)
            }

            console.log('Found these docs: ')
            docs.forEach(function(doc) {
                console.log(JSON.stringify(doc))
            })
            process.exit(0)
        })
    })
})
