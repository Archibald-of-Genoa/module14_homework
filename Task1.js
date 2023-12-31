const parser = new DOMParser();

const xmlString =
    `<list>
    <student>
    <name lang="en">
        <first>Ivan</first>
        <second>Ivanov</second>
    </name>
    <age>35</age>
    <prof>teacher</prof>
    </student>
    <student>
    <name lang="ru">
        <first>Петр</first>
        <second>Петров</second>
    </name>
    <age>58</age>
    <prof>driver</prof>
    </student>
</list>`;


const xmlDOM = parser.parseFromString(xmlString, "text/xml");

const students = xmlDOM.querySelectorAll('student');




const result = {
    list: []
}

students.forEach(student => {

    const listNode = xmlDOM.querySelector('list');
    const nameNode = student.querySelector('name');
    const firstNode = nameNode.querySelector('first');
    const secondNode = nameNode.querySelector('second');
    const ageNode = student.querySelector('age');
    const profNode = student.querySelector('prof');
    const langAttr = nameNode.getAttribute('lang');


    result.list.push({
        name: `${firstNode.textContent} ${secondNode.textContent}`,
        age: ageNode.textContent,
        prof: profNode.textContent,
        lang: langAttr
    })

})


console.log(result);
