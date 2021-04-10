async function getStats() {    
    const endpoint = '/COMP4537/termproject/API/v1/admin/stats'
    const devURL = `http://localhost:3000/${endpoint}`;
    const prodURL = `https://clintonfernandes.ca/${endpoint}`

    const URL = prodURL;

    const headers = new Headers();
    headers.append('Content-Type', 'text/json');
    headers.append('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkb21haW4iOiJjbGludG9uZmVybmFuZGVzLmNhIiwiaWF0IjoxNjE3MTYwNTY1fQ.e64XGL7yjA2cFzLLtxp6lO8v5Yn5eudcRY2opVtGCtI');

    const initObject = {
        method: "POST",
        headers: headers,
        password: "thisQuizIsForMark"
    };

    let res = await fetch(URL, initObject);

    if (res.ok) {
        let info = await res.json();
        console.log(info);
        outputPage(info);
    }
}

/**
 * Prints out the 
 * @param {Object} data JSON of data to display
 */
function outputPage(data) {
    document.write("<div>");
    document.write("<table>");

    for (let i = 0; i < data.length; i++) {
        let endpointData = data[i];

        document.write("<tr>");
        document.write(`<td>${endpointData.method}</td> <td>${endpointData.endpoint} <td>${endpointData.hits}</td>`);
        document.write("</tr>")
    }

    document.write("</table>");
    document.write("</div>");
}