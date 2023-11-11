const api_url = "https://retoolapi.dev/8pmkIT/data";
document.addEventListener("DOMContentLoaded", (init) );
function init () {
  const data = document.getElementById("data");
  loadTable(data);
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