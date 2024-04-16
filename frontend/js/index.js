let listStudents = [
  {
    name: "Petr",
    lastname: "Berezov",
    surname: "Aleksandrovich",
    birthday: new Date(2004, 7, 12),
    faculty: "Jurisprudence",
    start: 2021,
  },
  {
    name: "Alisa",
    lastname: "Degtyreva",
    surname: "Mironovna",
    birthday: new Date(2003, 12, 29),
    faculty: "Graphic Design",
    start: 2020,
  },
  {
    name: "Lybov",
    lastname: "Agapova",
    surname: "Semenovna",
    birthday: new Date(2002, 3, 2),
    faculty: "Instrumental vocals",
    start: 2018,
  },
];

//Format date
function formatDate(date) {
  var dd = date.getDate();
  if (dd < 10) dd = "0" + dd;

  var mm = date.getMonth() + 1;
  if (mm < 10) mm = "0" + mm;

  var yy = date.getFullYear();
  if (yy < 10) yy = "0" + yy;

  return dd + "." + mm + "." + yy;
}

//Func to create an item of the student
function $getNewStudentTR(item) {
  const $tr = document.createElement("tr");
  const $tdLNS = document.createElement("td");
  const $tdBirthday = document.createElement("td");
  const $tdfaculty = document.createElement("td");
  const $tdStart = document.createElement("td");

  // Fill tr with value
  $tdLNS.textContent = `${item.lastname} ${item.name} ${item.surname}`;
  $tdBirthday.textContent = formatDate(item.birthday);
  $tdfaculty.textContent = item.faculty;
  $tdStart.textContent = item.start;

  $tr.append($tdLNS, $tdBirthday, $tdfaculty, $tdStart);
  return $tr;
}

//Func to dispaly data of the studeuts 
function render(arr) {
    let copyArr = [...arr]

    const $studTable = document.getElementById("stud-table");

    $studTable.innerHTML = ''
    for (const item of copyArr ) {
    const $newTr = $getNewStudentTR(item);
    $studTable.append($newTr);
    }
}

render(listStudents)

document.getElementById('add-form').addEventListener('submit', function(event) {
    event.preventDefault()

    let newStudentObj = {
        name: document.getElementById('name-inp').value,
        lastname: document.getElementById('last-inp').value,
        surname: document.getElementById('surname-inp').value,
        birthday: new Date(document.getElementById('birthday-inp').value),
        faculty: document.getElementById('faculty-inp').value,
        start: document.getElementById('start-inp').value,
    }

    listStudents.push(newStudentObj)
    render(listStudents)
});
