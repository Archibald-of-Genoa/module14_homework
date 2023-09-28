
const jsonString = `{
    "list": [
     {
      "name": "Petr",
      "age": "20",
      "prof": "mechanic"
     },
     {
      "name": "Vova",
      "age": "60",
      "prof": "pilot"
     }
    ]
   }`;

const data = JSON.parse(jsonString);

const result = {
  list: [],
};

data.list.forEach((person) => {
  result.list.push({
    name: person.name,
    age: parseInt(person.age),
    prof: person.prof
  });
});

console.log(result);
