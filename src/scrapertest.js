const fs = require('fs');
const hs = require('./HtmlScrape')

// Nightmare setup
const Nightmare = require('nightmare');
const SHOW = false
const nm = Nightmare({ show:SHOW})

// Card finding consts
//card_name = "Lightning Bolt";
const base_url = 'https://shop.tcgplayer.com'
const find_url = '/magic/product/show?ProductName=';
const find_url_end = '&IsProductNameExact=true&viewAllVersions=true';


// Files for writing data
const SET_FILE_FRONT = "json/set_file_";
const SET_FILE_END = ".json"

//dataRun()

// Main data fetch functions
async function dataRun(card_name) {
    card_name = encodeURIComponent(card_name);
    // gets set data
    var setData = await nm
        .goto(base_url + find_url + card_name + find_url_end)
        .wait('body')
        .evaluate(() => document.querySelector('body').innerHTML)
        .then( response => {
            return hs.getSetData(response)
        }).catch( err => {
            console.log(err);
        });
    //console.log(setData)
    
    // write set Data to a file, later DB
    fs.writeFile(SET_FILE_FRONT + card_name + SET_FILE_END, JSON.stringify(setData), err => {
        if (err)
            console.log(err);
    } )

    var conjoinedCardData = []
    // LOOP through sets
    for (var i = 0; i < setData.length; i++)
    {
        //console.log(setData[i]['set_name'])
        var cardData = await nm
            .goto(base_url + setData[i]['full_href'])
            .wait('body')
            .wait(400)
            .evaluate(() => document.querySelector('body').innerHTML)
            .then( response => {
                return hs.getPriceData(response, setData[i]['set_name']);
            }).catch( err => {
                console.log(err);
            });
        for (var j in cardData)
        {
            conjoinedCardData.push(cardData[j])
        }
    }

    console.log(conjoinedCardData)
    nm.end()
    console.log('Completed card request.')
}

module.exports.dataRun = dataRun;