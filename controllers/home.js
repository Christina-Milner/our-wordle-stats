const Entry = require('../models/Entry')
const User = require('../models/User')

module.exports = {
    errorMes: (req, res) => {
        res.render('error.ejs')
    },
    getIndex: async (req, res) => {
        try {
            const colorLetters = (strArr, solutionArr) => {
                let result = Array.from({length: strArr.length}, () => "")
                while (!strArr.every(e => e === '#')) {
                    for (let i = 0; i < strArr.length; i++) {
                        if (strArr[i] === solutionArr[i]) {
                            result[i] = [strArr[i], "green"]
                            strArr[i] = '#'
                            solutionArr[i] = '#'
                        }
                    }
                    for (let i = 0; i < strArr.length; i++) {
                        if (strArr[i] === "#") {continue}
                        else if (solutionArr.includes(strArr[i])) {
                            result[i] = [strArr[i], "yellow"]
                            solutionArr[solutionArr.indexOf(strArr[i])] = '#'
                        }
                        else {
                            result[i] = [strArr[i], "grey"]
                        }
                        strArr[i] = '#'
                    }
                }
                return result
            } 
            let data = await Entry.find({})
            let ohMyGodMongoose = []
            for (let thing of data) {
                let newThing = {}
                Object.assign(newThing, thing['_doc'])
                newThing['cStarter'] = colorLetters(newThing['cStarter'].split(''), newThing['solution'].split(''))
                newThing['fStarter'] = colorLetters(newThing['fStarter'].split(''), newThing['solution'].split(''))
                ohMyGodMongoose.push(newThing)

            }
            ohMyGodMongoose.sort((a, b) => a.num - b.num)
            res.render('index.ejs', {info: ohMyGodMongoose})
        }
        catch (err) {
            console.log(err)
        } 
    },
    getStats: async (req, res) => {
        try {
            let data = await Entry.find({})
            res.render('stats.ejs', {info: data})
        }
        catch (err) {
            console.log(err)
        }
    },
    getAbout: (req, res) => {
        res.render('about.ejs')
    }
}