import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";
import {
  getDatabase,
  set,
  ref,
  onValue,
  push,
  update,
} from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";

const auth = getAuth();
const database = getDatabase();
let webDev = document.querySelector(".webdev");
let AI = document.querySelector(".AI");
let graphicDesigning = document.querySelector(".graphicDesigning");
let videoEditing = document.querySelector(".videoEditing");
let digitalMarketing = document.querySelector(".digitalMarketing");
let returnBtn = document.querySelector(".returnBtn");
let courseTitle = document.querySelector(".courseTitle");
let date = document.querySelector(".date");
let clickKey;
let showStudents = document.querySelector(".showStudents");
const showStudentsFunc = () => {
  console.log(clickKey);
  let studentsList = [];
  let studRef = ref(database, "students/");
  onValue(studRef, (snapshot) => {
    snapshot.forEach((childSnapshot) => {
      console.log(childSnapshot.val());
      let key = childSnapshot.key;
      if (childSnapshot.val().chooseCourse == clickKey) {
        let studentInfo = {
          name: childSnapshot.val().studentName,
          course: childSnapshot.val().courseName,
          batchNo: childSnapshot.val().batchNo,
          key,
        };
        studentsList.push(studentInfo);
        //creating elements
        let studentRow = document.createElement("div");
        let studentName = document.createElement("p");
        let batchNo = document.createElement("p");
        let attendance = document.createElement("input");
        let emptyDiv = document.createElement("div");
        let submitBtn = document.createElement("button");
        let editBtn = document.createElement("button");

        //giving values
        courseTitle.innerHTML = `students who are enrolled in: ${clickKey}`;
        batchNo.innerHTML = `batch no: <strong>${studentInfo.batchNo}</strong>`;
        studentName.innerHTML = `name: <strong> ${studentInfo.name}</strong>`;
        attendance.value = "P,A,L";
        submitBtn.innerText = "save";
        editBtn.innerText = "edit student info";
        date.innerHTML = `${new Date().getDate()} -${new Date().getMonth()}-${new Date().getFullYear()}`;

        //giving classes
        studentRow.classList.add("studentRow");
        attendance.classList.add("attendance");
        emptyDiv.classList.add("emptyDiv");
        submitBtn.classList.add("submitBtn");
        editBtn.classList.add("editBtn");
        //appending
        studentRow.appendChild(studentName);
        studentRow.appendChild(batchNo);
        studentRow.appendChild(attendance);
        studentRow.appendChild(submitBtn);
        studentRow.appendChild(editBtn);
        showStudents.appendChild(studentRow);
        showStudents.appendChild(emptyDiv);

        submitBtn.addEventListener("click", () => {
          let uniqueRef = ref(database, "students/" + key);
          if (attendance.value.length > 1) {
            Swal.fire(
              "submit attendance properly present:p absent:A leave:l application: leave:M"
            );
          } else {
            let obj = {
              studentStatus: attendance.value,
              date: `${new Date().getDate()} -${new Date().getMonth()}-${new Date().getFullYear()}`,
            };
            update(uniqueRef, obj).then((resolve) => {
              Swal.fire("done");
             
            });
          }
        });
        //edit work
        editBtn.addEventListener("click", () => {
          let studKey = document.createElement("p");
          let editInfoWork = document.querySelector(".editInfoWork");
          studKey.innerText = key;
          // editInfoWork.appendChild(studKey);
          editInfoWork.style.display = "flex";

          let done = document.querySelector(".done");
          done.addEventListener("click", () => {
            let name = document.querySelector("#name").value;
            let batchNo = document.querySelector("#batchNo").value;
            let chooseCourse = document.querySelector("#chooseCourse").value;
            if (!name || !batchNo || !chooseCourse) {
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "kindly fill all fields",
              });
            } else {
              let newRef = ref(database, "students/" + studKey.innerText);
              let newObj = {
                studentName: name,
                batchNo,
                chooseCourse,
              };
              update(newRef, newObj).then((resolve) => {
                Swal.fire("updated successfully");
                editInfoWork.style.display = "none";
                 window.location.reload();
              });
            }
          });
        });
      }
    });
  });
};
webDev.addEventListener("click", () => {
  showStudents.innerHTML = "";
  clickKey = "Web Development";
  showStudentsFunc();
});
AI.addEventListener("click", () => {
  showStudents.innerHTML = "";
  clickKey = "AI";
  showStudentsFunc();
});
digitalMarketing.addEventListener("click", () => {
  showStudents.innerHTML = "";
  clickKey = "Digital Marketing";
  showStudentsFunc();
});
videoEditing.addEventListener("click", () => {
  showStudents.innerHTML = "";
  clickKey = "Video Editing";
  showStudentsFunc();
});
graphicDesigning.addEventListener("click", () => {
  showStudents.innerHTML = "";
  clickKey = "Graphic Designing";
  showStudentsFunc();
});
returnBtn.addEventListener("click", () => {
  window.location.href = "./adminDashBoard.html";
});
let createStudent = document.querySelector(".createStudent");
createStudent.addEventListener("click", () => {
  window.location.href = "./createStudent.html";
})
