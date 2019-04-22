const brain = require('brain.js');
const fs = require('fs');
const path = require('path');

const filepath = "bblb.txt";

const text = fs.readFileSync(path.resolve(__dirname, filepath), 'utf8').split('\n');

let ob = [];

text.forEach( (phrase) => {
    let pSplit = phrase.split(':');
    if (pSplit.length < 2)
        return;
    else 
        ob.push({input: pSplit[1].trim(), output: pSplit[0]})
});

const lstm = new brain.recurrent.LSTM();
const result = lstm.train(ob, {
  iterations: 10000,
  logPeriod: 10,
  log: details => console.log(details),
  errorThresh: 0.025
});

function saveFile(){
    fs.writeFile("network.json", JSON.stringify(lstm.toJSON()), function(err) {
        if(err)
            return console.log(err);

        console.log("The file was saved!");
    });
    console.log(lstm.toJSON());
}

saveFile();
