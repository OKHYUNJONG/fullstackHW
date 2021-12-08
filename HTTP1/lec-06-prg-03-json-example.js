const fs = require('fs');

fs.readFile('lec-06-prg-03-json-example.json', 'utf8', (error, json_data) => {
    const superHeroes = JSON.parse(json_data);
    console.log(superHeroes['homeTown'])
    console.log(superHeroes['active'])
    console.log(superHeroes['members'][1]['powers'][2])
})