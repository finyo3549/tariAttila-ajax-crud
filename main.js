import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle'
const api_url = "https://retoolapi.dev/YZM9ys/data";
document.addEventListener("DOMContentLoaded", (init) );
function init () {
  const data = document.getElementById("data");
  loadTable(data);
  uploadData();
}

function loadTable(data) {
  fetch(api_url).then(httpResponse => httpResponse.json()).then(responseBody => {
    data.innerHTML = "";
    responseBody.forEach(personData => {
    const tableRow = document.createElement("tr");
    const idTableData = document.createElement("td");
    const nameTableData = document.createElement("td");  
    const jobTitleTableData = document.createElement("td");  
    const entryDateTableData = document.createElement("td");  
    const imeiTableData = document.createElement("td");  
    idTableData.textContent = personData.id;
    nameTableData.textContent = personData.name;
    jobTitleTableData.textContent = personData.job_title;
    entryDateTableData.textContent = personData.entry_date;
    imeiTableData.textContent = personData.IMEI;
    tableRow.appendChild(idTableData);
    tableRow.appendChild(nameTableData);
    tableRow.appendChild(jobTitleTableData);
    tableRow.appendChild(entryDateTableData);
    tableRow.appendChild(imeiTableData);
    data.appendChild(tableRow);
    });
  })
}

function uploadData() {
  const gomb = document.getElementById("gomb");
  

  gomb.addEventListener("click" , () => {
    const name = document.getElementById("name").value;
    const entry_date = document.getElementById("entry_date").value;
    const job_title = document.getElementById("job_title").value;
    const imei = document.getElementById("imei").value;
    const postData = {
      name: name,
      entry_date: entry_date,
      job_title: job_title,
      imei: imei,
    };

    fetch(api_url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    })
       

  });
}