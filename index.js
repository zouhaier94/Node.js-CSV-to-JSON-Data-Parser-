const csvtojson = require('csvtojson')

const csvFilePath = 'data.csv'
const fs = require('fs')

let Alexander_sp = null;
let Bernhard_sp = null;
let Caesare_sp = null;
let result1 = null;

let Alexander_sec = null;
let Bernhard_sec = null;
let Caesare_sec = null;
let result2 = null;

let max = 9007199254740992;
let most_words;
let result3 = null;

csvtojson()
    .fromFile(csvFilePath)
    .then((jsonObj) => {
        // 1. Which politician gave the most speeches in 2013?
        jsonObj.forEach(el => {
            if (jsonObj[0].Date.slice(0, 4) == 2013 && (el.Topic)) {
                if (el.Speaker == "Alexander Abel") Alexander_sp++
                if (el.Speaker == "Bernhard Belling") Bernhard_sp++
                if (el.Speaker == "Caesare Collins") Caesare_sp++
            }
        });
        if (Math.max(Alexander_sp, Bernhard_sp, Caesare_sp) == Alexander_sp) result1 = 'Alexander Abel'
        if (Math.max(Alexander_sp, Bernhard_sp, Caesare_sp) == Bernhard_sp) result1 = 'Bernhard Belling'
        if (Math.max(Alexander_sp, Bernhard_sp, Caesare_sp) == Caesare_sp) result1 = 'Caesare Collins'
        //console.log('Question1: ' + result1)

        // 2. Which politician gave the most speeches on the topic „Internal Security"?
        jsonObj.forEach(el => {
            if ((el.Topic == 'Internal Security')) {
                if (el.Speaker == "Alexander Abel") Alexander_sec++
                if (el.Speaker == "Bernhard Belling") Bernhard_sec++
                if (el.Speaker == "Caesare Collins") Caesare_sec++
            }
        });
        if (Math.max(Alexander_sec, Bernhard_sec, Caesare_sec) == Alexander_sec) result2 = 'Alexander Abel'
        if (Math.max(Alexander_sec, Bernhard_sec, Caesare_sec) == Bernhard_sec) result2 = 'Bernhard Belling'
        if (Math.max(Alexander_sec, Bernhard_sec, Caesare_sec) == Caesare_sec) result2 = 'Caesare Collins'
        //console.log('Question2: ' + result2)

        // 3. Which politician used the fewest words (in total)?
        jsonObj.forEach(el => {
            if (parseInt(el.Words) < max) {
                max = parseInt(el.Words);
                result3 = el.Speaker
            }
        });
        //console.log('Question3: ' + result3)


        var data = [{ mostSpeeches: result1, mostSecurity: result2, leastWordy: result3 }];
        console.log(data)

        fs.writeFileSync("output.json", JSON.stringify(data), 'utf-8', (err) => { if (err) console.log(err) })

    })


// Extra: Which politician gave the most speeches in 2012?
/* 
let ms = null
let mostSpeeches = null
let most_words

jsonObj.forEach(el => {
    if (jsonObj[0].Date.slice(0, 4) == 2012
        && parseInt(el.Words) > ms) {
        ms = parseInt(el.Words);
        mostSpeeches = el.Speaker
    }
});
console.log(mostSpeeches)  
*/