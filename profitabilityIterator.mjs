
import fs from 'fs'
import path from 'path'

var getFiles = function (dir, files_){

    files_ = files_ || [];
    var files = fs.readdirSync(dir);
    for (var i in files){
        var name = dir + '/' + files[i];
        if (fs.statSync(name).isDirectory()){
            getFiles(name, files_);
        } else {
            files_.push(name);
        }
    }
    return files_;
};

let arrDir = getFiles('./botLogic/logs');

for (let dir of arrDir) {
    let file = fs.readFileSync(dir, {encoding:'utf8', flag:'r'});
    let profit
    console.log(dir)
    for (let prop of file) {
        console.log(prop.ticker)
        console.log(prop.profitability)
        prop += prop.profitability
    }
    console.log(profit)
}
