//HUMAN
class Human {
  constructor({ name, surname, age }) {
    this.name = name;
    this.surname = surname;
    this.age = age;
  }

  getFullName() {
    return `${this.name} ${this.surname}`;
  }

  setFullName(fullName) {
    let [name, surname] = fullName.split(" ");
    this.name = name;
    this.surname = surname;
  }
}

//STUDENT
class Student extends Human {
  constructor({ name, surname, age, marks }) {
    super({
      name,
      surname,
      age,
    });
    this.marks = marks || [];
  }

  getAverageMark(arrMarks = []) {
    const actualMarks = arrMarks || this.marks;
    const sum = actualMarks.reduce((accum, mark) => (accum += mark), 0);

    return sum / actualMarks.length;
  }

  getMinMark(arrMarks = []) {
    const actualMarks = arrMarks || this.marks;
    const min = actualMarks.sort((a, b) => a - b);

    return min[0];
  }

  getMaxMark(arrMarks = []) {
    const actualMarks = arrMarks || this.marks;
    const max = actualMarks.sort((a, b) => b - a);

    return max[0];
  }
}

//TEACHER
class Teacher extends Human {
  constructor({ name, surname, age, group }) {
    super({
      name,
      surname,
      age,
    });
    this.group = group.map((student) => new Student(student));
  }

  addNewStudent(newStudentOfGroup) {
    this.group.push(newStudentOfGroup);
  }

  getListOfNamesByAverageMark() {
    const sortGroup = this.group
      .sort((a, b) => b.getAverageMark() - a.getAverageMark())
      .map((student) => student.getFullName());

    return sortGroup;
  }

  getStudentByName(studentFullName) {
    const foundStudent = this.group.find(
      (student) => studentFullName === student.getFullName()
    );

    return foundStudent;
  }

  removeStudentByName(studentName) {
    const filteredStudents = this.group.filter(
      (person) => studentName !== person.getFullName()
    );
    this.group = filteredStudents;
  }

  updateStudentByName(student, fullName) {
    let index = this.group.findIndex((elem) => elem.getFullName() === fullName);
    this.group.splice(index, 1, student);
  }

  findFakeStudent() {
    const foundFakeStudents = this.group.filter(
      (student) => student instanceof FakeStudent
    );
    const resultFakeStudents = foundFakeStudents.map((student) => {
      const stringMarks = student.marks.join(",");

      return `${student.getFullName()}: ${stringMarks}`;
    });

    return resultFakeStudents.join("\n");
  }
}

// FAKESTUDENT
class FakeStudent extends Student {
  #chetedMarks = [];

  set #cheat(arrMarks) {
    this.#chetedMarks = arrMarks.map((el) => {
      return el * 2 > 12 ? 12 : el * 2;
    });
  }

  constructor({ name, surname, age, marks }) {
    super({
      name,
      surname,
      age,
      marks,
    });
    this.#cheat = marks;
  }

  getAverageMark() {
    return super.getAverageMark(this.#chetedMarks);
  }

  getMinMark() {
    return super.getMinMark(this.#chetedMarks);
  }

  getMaxMark() {
    return super.getMaxMark(this.#chetedMarks);
  }
}

const group = [
  {
    name: "Igor",
    surname: "Ivanov",
    age: 20,
    marks: [12, 5, 4, 9, 2],
  },
  {
    name: "Sergei",
    surname: "Petrov",
    age: 23,
    marks: [10, 6, 8, 4, 10],
  },
  {
    name: "Evgen",
    surname: "Smirnov",
    age: 19,
    marks: [12, 10, 7, 8, 11],
  },
  {
    name: "Svetlana",
    surname: "Ageeva",
    age: 22,
    marks: [1, 5, 2, 7, 1],
  },
  {
    name: "Viktoria",
    surname: "Sribna",
    age: 27,
    marks: [10, 7, 8, 4, 11],
  },
];

//INSTANCES
const human = new Human({
  name: "Ivan",
  surname: "Petrov",
  age: 23,
});

const newStudent = new Student({
  name: "Nadia",
  surname: "Luschenko",
  age: 26,
  marks: [10, 9, 8, 1, 10],
});

const teacher = new Teacher({
  name: "Irina",
  surname: "Baranova",
  age: 48,
  group,
});

const fakeStudent = new FakeStudent({
  name: "Max",
  surname: "Zverev",
  age: 29,
  marks: [12, 8, 8, 3, 10],
});

teacher.addNewStudent(fakeStudent);
