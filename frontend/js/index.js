const SERVER_URL = 'http://localhost:3000'

//Func to refer to the Server
async function serverAddStudent(obj) {
  let response = await fetch(SERVER_URL + '/api/students', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(obj),
  })

  let data = await response.json()

  return data
}

//Func to delte entry from the Server
async function serverDeleteStudent(id) {
  let response = await fetch(SERVER_URL + '/api/students' + id, {
    method: 'DELETE',
  })

  let data = await response.json()
  return data
}

// Get
async function serverGetStudents() {
  let response = await fetch(SERVER_URL + '/api/students', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  })
  let data = await response.json()
  return data
}

let serverData = await serverGetStudents()

/* let listStudents = [
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
 */

let listStudents = []

if (serverData) {
  listStudents = serverData
}

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
  const $tdstudyStart = document.createElement("td");
  const $tdDelete = document.createElement("td");
  const $btnDelete = document.createElement("button");

  $btnDelete.classList.add("btn", "btn-danger", "w-100")
  $btnDelete.textContent = 'Delete'

  // Fill tr with value
  $tdLNS.textContent = `${item.lastname} ${item.name} ${item.surname}`;
  $tdBirthday.textContent = formatDate(new Date(item.birthday));
  $tdfaculty.textContent = item.faculty;
  $tdstudyStart.textContent = item.start;

//Click by deletebtn
$btnDelete.addEventListener('click', async function() {
  await serverDeleteStudent(item.id)
  $tr.remove()
})

  $tdDelete.append($btnDelete)
  $tr.append($tdLNS, $tdBirthday, $tdfaculty, $tdstudyStart, $tdDelete);
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

document.getElementById('add-form').addEventListener('submit', async function(event) {
    event.preventDefault()

    let newStudentObj = {
        name: document.getElementById('name-inp').value,
        lastname: document.getElementById('last-inp').value,
        surname: document.getElementById('surname-inp').value,
        birthday: new Date(document.getElementById('birthday-inp').value),
        faculty: document.getElementById('faculty-inp').value,
        studyStart: document.getElementById('studyStart-inp').value,
    }

    let serverDataObj =  await serverAddStudent(newStudentObj)
    serverDataObj.birthday = new Date(serverDataObj.birthday)

    listStudents.push(serverDataObj)
    console.log(listStudents)
    render(listStudents)
});
