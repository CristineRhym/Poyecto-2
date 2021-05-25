const url = "https://api.football-data.org/v2/competitions/2014/standings";

fetch(url, {
    method: "GET",
    headers: {
        "X-Auth-Token": "2ceea787b053482db8cac583f5c6ce76"
    }
})
    .then(response => {
        if (response.ok) {
            return response.json();
        }
    })
    .then(data => {
        generar_tabla(data.standings[0].table);

    })


function generar_tabla(standings) {


    let tabla = document.getElementById("tablaclasificacion");
    for (let i = 0; i < standings.length; i++) {

        let row = document.createElement("tr");

        let image = document.createElement("img");
        image.setAttribute("src", standings[i].team.crestUrl);
        image.classList.add("image_team");

        let equipo = standings[i].team.name;

        let pj = standings[i].playedGames;

        let pg = standings[i].won;

        let pp = standings[i].lost;

        let pe = standings[i].draw;

        let gf = standings[i].goalsFor;

        let gc = standings[i].goalsAgainst;

        let puntos = standings[i].points;

        let ultimos = standings[i].form;
        ultimos= ultimos.replaceAll("D","🔘");
        ultimos=ultimos.replaceAll("W","🟢");
        ultimos=ultimos.replaceAll("L","🔴");
        ultimos=ultimos.replaceAll(","," ");

        var array1 = [image, equipo, pj, pg, pp, pe, gf, gc, puntos, ultimos];

        for (let j = 0; j < array1.length; j++) {

            let td = document.createElement("td");
            td.setAttribute("scope", "row");

            td.append(array1[j]);

            row.append(td);
        }
        tabla.append(row);
    }
}