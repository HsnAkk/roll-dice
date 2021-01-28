import { students } from './data.js';


// array for people who answered the questions
let arrPeople = [];

// querySelectors
const parent = document.querySelector('.students');
const select = document.querySelector('.select');
const skip = document.querySelector('.skipped');
const reset = document.querySelector('.reset');


// create div element and add to parent 
function createElement ({id, name}) {
    const elem = document.createElement('div');
    elem.textContent = name;
    elem.className = `student_${id}`
    parent.insertAdjacentElement('beforeend', elem); 
}

// create random number, find a person and return it.
function findPerson() {
    // create random number
    let randomNum = Math.floor(Math.random() * students.length) + 1;

    // find person
    let [{ id, name }] = students.filter(item => item.id === randomNum);
    
    return { id, name };
};


// validation : check person in arrPeople
function valPerson({ id, name }) {

    if (arrPeople.includes(name)) {

        while (true) {
            let { id, name } = findPerson();

            if (!arrPeople.includes(name)) {
                return { id, name }
            }
        }
    }
    return {id, name}
}



// add div elements in browser
for (let item of students) {
    createElement(item);
}


// select a person
select.addEventListener('click', function () {

    // find a person
    let { id, name } = findPerson();

    // validate : check person in arrPeople
    const { id: num , name: per } = valPerson({ id, name });

    // if next one is the last student
    if (arrPeople.length === students.length - 1) {
        arrPeople.push(per);
        console.log(arrPeople);
        document.querySelector(`.student_${num}`).style.background = "linear-gradient(to right, #c2e59c, #64b3f4)";
        document.querySelector(`.student_${num}`).style.border = '3px solid dodgerblue';

        setTimeout(function () {
            document.querySelector(`.student_${num}`).style.border = 'none';
        }, 3000);

        setTimeout(function () {
            for (var i = 1; i <= students.length; i++) {
                document.querySelector(`.student_${i}`).style.background = '#fff';
                document.querySelector(`.student_${i}`).style.border = "1px dotted #f5f5f5";
            }            
        }, 4000);

        arrPeople = [];

    } else {
        arrPeople.push(per);
        console.log(arrPeople);
        document.querySelector(`.student_${num}`).style.background =
            "linear-gradient(to right, #c2e59c, #64b3f4)";
        document.querySelector(`.student_${num}`).style.border = '3px solid dodgerblue';
    
        setTimeout(function () {
            document.querySelector(`.student_${num}`).style.border = 'none';
        }, 3000);
    }   
});



skip.addEventListener('click', function () {
    let perName = arrPeople[arrPeople.length - 1];
    let conf = confirm(`Do you want to remove ${perName} from list?`)
    //console.log(perName);

    if (conf) {
        for (var i = 1; i <= 15; i++) {
            if (document.querySelector(`.student_${i}`).textContent === perName) {
                document.querySelector(`.student_${i}`).style.background = '#fff';
                break;
            }
        }
        arrPeople = arrPeople.slice(0, arrPeople.length - 1);
        console.log(arrPeople);
    }
});



reset.addEventListener('click', function () {
    arrPeople = [];
    console.log(arrPeople);

    for (var i = 1; i <= students.length; i++) {
        document.querySelector(`.student_${i}`).style.background = '#fff';
        document.querySelector(`.student_${i}`).style.border = "1px dotted #f5f5f5";
    }    
});