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

    const movieDoc = {
        title: 'Jaws',
        year: 1975,
        director: 'Steven Spielberg',
        rating: 'PG',
        review: {
            critics: 80,
            audience: 96
        },
        screenplay: ['Big Dan', 'Ol Carl Gottlieb']
    }

    db.collection('movies').insert(movieDoc, function(error, result) {
        if(error) {
            console.log(error)
            process.exit(1)
        }
        // returns all audience ratings that are greater than 90
        // mongo would return a cursor instead of an array, which is why we use the toArray method
        db.collection('movies')
            .find({'review.audience': {'$gte': 90}})
            .toArray(function(error, docs) {
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
