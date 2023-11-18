import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle'
//const api_url = "https://retoolapi.dev/YZM9ys/data";
const api_url = "https://retoolapi.dev/NEqLXd/data";
document.addEventListener("DOMContentLoaded", () => {
  const resetButton = document.getElementById("resetButton");
  resetButton.classList.add('btn','btn-secondary','mt-3');
  resetButton.addEventListener("click", resetForm);
  const uploadButton = document.getElementById("uploadButton");

  const dataForm = document.getElementById("dataForm");
  dataForm.addEventListener("submit", handleFormSubmit);
  loadTable(uploadButton);

});

function loadTable(uploadButton) {

  const data = document.getElementById("data");
  fetch(api_url).then(httpResponse => httpResponse.json()).then(responseBody => {
    data.innerHTML = "";
    responseBody.forEach(personData => {
      uploadButton.classList.add('btn','btn-primary','mt-3');
      const tableRow = document.createElement("tr");
      const idTableData = document.createElement("td");
      const nameTableData = document.createElement("td");
      const jobTitleTableData = document.createElement("td");
      const entryDateTableData = document.createElement("td");
      const imeiTableData = document.createElement("td");
      const actionsTableData = document.createElement("td");
      const deleteButton = document.createElement("button");
      const updateButton = document.createElement("button");
      deleteButton.classList.add('btn', 'btn-danger');
      deleteButton.textContent = "Delete";
      deleteButton.addEventListener("click", () => deletePerson(personData.id));

      updateButton.classList.add('btn', 'btn-warning', 'mx-3');
      updateButton.textContent = "Update";
      updateButton.addEventListener("click", () => fillForm(personData,uploadButton));
      idTableData.textContent = personData.id;
      nameTableData.textContent = personData.name;
      jobTitleTableData.textContent = personData.job_title;
      entryDateTableData.textContent = personData.company_name;
      imeiTableData.textContent = personData.imei;

      actionsTableData.appendChild(deleteButton);
      actionsTableData.appendChild(updateButton);
      tableRow.appendChild(idTableData);
      tableRow.appendChild(nameTableData);
      tableRow.appendChild(jobTitleTableData);
      tableRow.appendChild(entryDateTableData);
      tableRow.appendChild(imeiTableData);
      tableRow.appendChild(actionsTableData);
      data.appendChild(tableRow);
    });
  })
}

function handleFormSubmit(event) {
  
    event.preventDefault();
    const id = document.getElementById("id").value;
    const name = document.getElementById("name").value;
    const company_name = document.getElementById("company_name").value;
    const job_title = document.getElementById("job_title").value;
    const imei = document.getElementById("imei").value;
    const personInfo = {
      name: name,
      company_name: company_name,
      job_title: job_title,
      imei: imei,
    };
  if(id == "") {
    addPerson(personInfo);
  } else {
    updatePerson(id,personInfo);
  }
}

async function addPerson(person) {
  const response = await fetch(api_url, {
    method: "POST",
    body: JSON.stringify(person),
    headers: {
      "Content-Type": "application/json"
    }
  });
  if(response.ok) {
    const success = 1;
    showAlert(success);
  resetForm();
  loadTable(uploadButton);
}
}
async function deletePerson(id) {
  console.log(id);
  
  const response = await fetch(api_url + '/' + id, {method: "DELETE"})
  if(response.ok) {
    const success = 1;
    showAlert(success);
    loadTable(uploadButton);
} else {
  success =0;
  showAlert(success);
  loadTable(uploadButton);
}
}
function resetForm() {
  document.getElementById("name").value ="";
  document.getElementById("job_title").value ="";
  document.getElementById("imei").value ="";
  document.getElementById("company_name").value ="";
  loadTable();
}
function showAlert(alertMessage) {
  if (alertMessage == 1) {
  var alertDiv = document.createElement("div");
  alertDiv.classList.add('alert', 'alert-success', 'fade', 'show', 'fixed-top');
  alertDiv.setAttribute('role', 'alert');
  alertDiv.innerHTML = "<b>Success</b>";
  document.body.appendChild(alertDiv);
} else {
  var alertDiv = document.createElement("div");
  alertDiv.classList.add('alert', 'alert-danger', 'fade','show', 'fixed-top');
  alertDiv.setAttribute('role', 'alert');
  alertDiv.innerHTML = "<b>Failed</b>";
  document.body.appendChild(alertDiv);
}

setTimeout(() => {
  document.body.removeChild(alertDiv);
}, 3000);
}
function fillForm(personData,uploadButton) {
  uploadButton.classList.add('btn-warning');
  uploadButton.textContent = "Update";
  document.getElementById("id").value = personData.id;
  document.getElementById("name").value = personData.name;
  document.getElementById("job_title").value = personData.job_title;
  document.getElementById("company_name").value = personData.company_name;
  document.getElementById("imei").value = personData.imei;
}