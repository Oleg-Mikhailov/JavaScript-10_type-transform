(function () {

  let date = new Date();
  const yearNow = date.getFullYear();
  const monthNow = date.getMonth() + 1;
  const dayNow = date.getUTCDate();
  let oneYearMinus = 0;
  let FIOFilterInput;
  let dateFilterInput;
  let сourseFilterInput;

  let students = [
    { firstname: 'Иван', secondname: 'Крутов', surname: 'Иванович', birthdate: '05.02.2006', startdate: 2018, faculty: 'Вычислительные технологии' },
    { firstname: 'Сергей', secondname: 'Петров', surname: 'Петрович', birthdate: '15.03.2009', startdate: 2015, faculty: 'Прикладная математика' },
    { firstname: 'Анатолий', secondname: 'Коротков', surname: 'Марсович', birthdate: '16.01.2003', startdate: 2020, faculty: 'Экономика' },
    { firstname: 'Вадим', secondname: 'Сидоров', surname: 'Сергеевич', birthdate: '19.07.2002', startdate: 2019, faculty: 'Динамика и прочность' }
  ];
  let sortedStudents = [];
  let sortedIndex = [];

  function studentsClear(students) {
    for (let i in students) {
      let elementForClear = document.getElementById('FIO');
      while (elementForClear.firstChild) elementForClear.removeChild(elementForClear.firstChild);
      elementForClear = document.getElementById('Faculty');
      while (elementForClear.firstChild) elementForClear.removeChild(elementForClear.firstChild);
      elementForClear = document.getElementById('Date');
      while (elementForClear.firstChild) elementForClear.removeChild(elementForClear.firstChild);
      elementForClear = document.getElementById('Course');
      while (elementForClear.firstChild) elementForClear.removeChild(elementForClear.firstChild);
    }
  }

  function inputSortActive(students, i) {
    if (students[i].firstname.includes(FIOFilterInput.value)
      && students[i].faculty.includes(facultyFilterInput.value)
      && (dateFilterInput.value.length === 10 ? students[i].birthdate === dateFilterInput.value : students[i].birthdate != dateFilterInput.value)
      && (сourseFilterInput.value.length === 4 ? String(students[i].startdate) === сourseFilterInput.value : String(students[i].startdate) != сourseFilterInput.value))
      return true;
  }

  function studentAge(students, i) {
    students[i].birthdate = students[i].birthdate.split('.');
    Number(students[i].birthdate[1]) < monthNow ? oneYearMinus = 1 : oneYearMinus = 0;
    (Number(students[i].birthdate[1]) === monthNow) && (Number(students[i].birthdate[0]) >= dayNow) ? oneYearMinus = 1 : oneYearMinus = 0;
    const studentAge = ' (' + String(yearNow - Number(students[i].birthdate[2]) - oneYearMinus) + ' лет)';
    students[i].birthdate = students[i].birthdate.join('.');
    return studentAge;
  }

  function studentsLoad(students) {
    for (let i of sortedIndex) {
      if (inputSortActive(students, i)) {

        let liStudentFIO = document.getElementById('FIO');
        const studentFIO = document.createElement('div');
        studentFIO.innerHTML = students[i].firstname + ' ' + students[i].secondname + ' ' + students[i].surname;
        liStudentFIO.append(studentFIO);

        let liStudentFaculty = document.getElementById('Faculty');
        const studentFaculty = document.createElement('div');
        studentFaculty.innerHTML = students[i].faculty;
        liStudentFaculty.append(studentFaculty);

        let liStudentDR = document.getElementById('Date');
        const studentDR = document.createElement('div');

        studentDR.innerHTML = students[i].birthdate + studentAge(students, i);
        liStudentDR.append(studentDR);

        let liStudentCourse = document.getElementById('Course');
        const studentCourse = document.createElement('div');
        const finishYear = Number(students[i].startdate) + 4;
        const courseNumber = yearNow - Number(students[i].startdate);

        (finishYear > yearNow) || ((finishYear == yearNow) && (monthNow < 9)) ? studentCourse.innerHTML = students[i].startdate + '-' + String(finishYear) + ` (${courseNumber}) курс` :
          studentCourse.innerHTML = students[i].startdate + '-' + String(finishYear) + ` (закончил)`;
        liStudentCourse.append(studentCourse);
      }
    }
  }

  let prepareFIOIndex = students => {
    for (let i in students) {
      let searchString = sortedStudents[i];
      sortedIndex[i] = students.findIndex(student => student.firstname + student.secondname + student.surname === searchString);
    }
  }

  let prepareFacultyIndex = students => {
    for (let i in students) {
      let searchString = sortedStudents[i];
      sortedIndex[i] = students.findIndex(student => student.faculty === searchString);
    }
  }

  let prepareBirthDateIndex = students => {
    for (let i in students) {
      let searchString = sortedStudents[i];
      sortedIndex[i] = students.findIndex(student => student.birthdate === searchString);
    }
  }

  let prepareCourseIndex = students => {
    for (let i in students) {
      let searchString = sortedStudents[i];
      sortedIndex[i] = students.findIndex(student => student.startdate === searchString);
    }
  }

  const FIOSortButton = document.getElementById('button-FIO');
  FIOSortButton.addEventListener('click', function () {
    for (let i in students) sortedStudents[i] = students[i].firstname + students[i].secondname + students[i].surname;
    sortedStudents.sort();
    prepareFIOIndex(students);
    studentsClear(students);
    studentsLoad(students);
  })

  const facultySortButton = document.getElementById('button-Faculty');
  facultySortButton.addEventListener('click', function () {
    for (let i in students) sortedStudents[i] = students[i].faculty;
    sortedStudents.sort();
    prepareFacultyIndex(students, 'faculty');
    studentsClear(students);
    studentsLoad(students);
  })

  const dateSortButton = document.getElementById('button-Date');
  dateSortButton.addEventListener('click', function () {
    for (let i in students) {
      sortedStudents[i] = students[i].birthdate.split('.').reverse().join('-');
      sortedStudents[i] = Date.parse(sortedStudents[i]);
    }
    sortedStudents.sort();
    let firstLetterMonth = '';
    let firstLetterDay = '';
    for (let i in students) {
      let date = new Date(sortedStudents[i]);
      let monthStudent = date.getMonth() + 1;
      let dayStudent = date.getUTCDate();
      monthStudent < 10 ? firstLetterMonth = '0' : firstLetterMonth = '';
      dayStudent < 10 ? firstLetterDay = '0' : firstLetterDay = '';
      sortedStudents[i] = firstLetterDay + String(date.getUTCDate()) + '.' + firstLetterMonth + String(date.getMonth() + 1) + '.' + String(date.getFullYear());
    }
    prepareBirthDateIndex(students);
    studentsClear(students);
    studentsLoad(students);
  })

  const сourseSortButton = document.getElementById('button-Course');
  сourseSortButton.addEventListener('click', function () {
    for (let i in students) sortedStudents[i] = students[i].startdate;
    sortedStudents.sort();
    prepareCourseIndex(students);
    studentsClear(students);
    studentsLoad(students);
  })

  FIOFilterInput = document.getElementById('filterFIO');
  FIOFilterInput.addEventListener('input', function () {
    studentsClear(students);
    studentsLoad(students);
  })

  facultyFilterInput = document.getElementById('filterFaculty');
  facultyFilterInput.addEventListener('input', function () {
    studentsClear(students);
    studentsLoad(students);
  })

  dateFilterInput = document.getElementById('filterDate');
  dateFilterInput.addEventListener('input', function () {
    studentsClear(students);
    studentsLoad(students);
  })

  сourseFilterInput = document.getElementById('filterCourse');
  сourseFilterInput.addEventListener('input', function () {
    studentsClear(students);
    studentsLoad(students);
  })

  const addStudentButton = document.getElementById('addStudentButton');
  addStudentButton.addEventListener('click', function () {
    let courseValid;
    let FIOValid;
    let facultyValid;
    let birthDateValid;
    const newStudent = { firstname: ' ', secondname: ' ', surname: ' ', birthdate: '', startdate: 0000, faculty: '' };
    let fullName = document.getElementById('inputFIO').value.trim();
    fullName = fullName.split(' ');

    newStudent.firstname = fullName[0];
    newStudent.secondname = fullName[1];
    newStudent.surname = fullName[2];
    newStudent.faculty = document.getElementById('inputFaculty').value.trim();
    newStudent.birthdate = document.getElementById('inputDate').value;
    newStudent.startdate = document.getElementById('inputCourse').value.trim();
    Date.parse(newStudent.birthdate) <= Date.parse(date) ? birthDateValid = true : birthDateValid = false;
    newStudent.firstname && newStudent.secondname && newStudent.surname ? FIOValid = true : FIOValid = false;

    newStudent.startdate >= 2000 && newStudent.startdate <= yearNow ? courseValid = true : courseValid = false;
    !newStudent.startdate.length ? emptyCourseField = true : emptyCourseField = false;
    newStudent.faculty.length > 0 ? facultyValid = true : facultyValid = false;
    newStudent.birthdate = newStudent.birthdate.split('-').reverse().join('.');

    let errorMessage1 = document.getElementById('FIOErrorMessage');
    let errorMessage2 = document.getElementById('FacultyErrorMessage');
    let errorMessage3 = document.getElementById('DateErrorMessage');
    let errorMessage4 = document.getElementById('CourseErrorMessage');

    !FIOValid ? errorMessage1.innerHTML = 'Поле "ФИО" заполнено некорректно ' : errorMessage1.innerHTML = '';
    !facultyValid ? errorMessage2.innerHTML = 'Поле "Факультет" не должно быть пустым' : errorMessage2.innerHTML = '';
    !birthDateValid ? errorMessage3.innerHTML = 'Дата рождения должна быть в диапазоне от 01.01.1900 до текущей даты' : errorMessage3.innerHTML = '';
    errorMessage4.innerHTML = '';
    if (!courseValid && emptyCourseField) errorMessage4.innerHTML = 'Поле "год начала обучения" не должно быть пустым';
    if (!courseValid && !emptyCourseField) errorMessage4.innerHTML = 'Год начала обучения должен быть в диапазоне от 2000 года по текущий';
    if (courseValid && FIOValid && facultyValid && birthDateValid) {
      students.push(newStudent); sortedIndex[sortedIndex.length] = sortedIndex.length;

      document.getElementById('inputFIO').value = '';
      document.getElementById('inputFaculty').value = '';
      document.getElementById('inputDate').value = '';
      document.getElementById('inputCourse').value = '';
    }
    studentsClear(students);
    studentsLoad(students);
  });

  let studentsStartUpLoad = students => {
    for (let i in students) sortedIndex[i] = i;
    studentsLoad(students);
  }

  function startStudentsApp(container) {
    let appTitle = document.createElement('h2');
    appTitle.innerHTML = 'Студенты';
    container.append(appTitle);
    const inputDate = document.getElementById('inputDate');
    let firstLetterMonth = '';
    let firstLetterDay = '';
    monthNow < 10 ? firstLetterMonth = '0' : firstLetterMonth = '';
    dayNow < 10 ? firstLetterDay = '0' : firstLetterDay = '';
    inputDate.max = String(yearNow) + '-' + firstLetterMonth + String(monthNow) + '-' + firstLetterDay + String(dayNow);
    studentsStartUpLoad(students);
  }

  document.addEventListener('DOMContentLoaded', function () { });
  window.startStudentsApp = startStudentsApp;

})()
