'use strict'

// const express = require('express')
// const app = express()

const _ = require('underscore')
const mongodb = require('mongodb')


const uri = 'mongodb://localhost:27017/example'



// here I am inserting a document a querying it back
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



// mongoose.connect(MONGODB_URL, (err) => {
//     if(err) throw err
//
//     app.listen(PORT, () => {
//         console.log(`server is running on port: ${PORT}`)
//     })
// })
