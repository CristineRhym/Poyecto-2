const url = "https://api.football-data.org/v2/competitions/2014/matches";

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
        generar_estadistica(data.matches);
        generar_estadistica2(data.matches);

        
    })




function generar_estadistica(partidos) {

    let estadisticas = []

    for (let i = 0; i < partidos.length; i++) {

        if (partidos[i].status != "FINISHED") {
            continue
        }
        let homeTeamId = partidos[i].homeTeam.id;
        let awayTeamId = partidos[i].awayTeam.id;


        let foundHomeTeam;
        let foundAwayTeam;

        for (let j = 0; j < estadisticas.length; j++) {

            if (estadisticas[j].id == homeTeamId) {
                foundHomeTeam = estadisticas[j];
            }

            if (estadisticas[j].id == awayTeamId) {
                foundAwayTeam = estadisticas[j];
            }
        }


        if (foundHomeTeam == undefined) {
            let equipoHome = {
                id: homeTeamId,
                name: partidos[i].homeTeam.name,
                goals: partidos[i].score.fullTime.homeTeam,
                matches: 1
            }
            estadisticas.push(equipoHome)


        }
        else {
            // foundHomeTeam.goals=foundHomeTeam.goals+partidos[i].score.fullTime.homeTeam;
            foundHomeTeam.goals += partidos[i].score.fullTime.homeTeam;
            // foundHomeTeam.matches=foundHomeTeam.matches+1;
            // foundHomeTeam.matches+=1;
            foundHomeTeam.matches++;
        }

        if (foundAwayTeam == undefined) {
            let equipoAway = {
                id: awayTeamId,
                name: partidos[i].awayTeam.name,
                goals: partidos[i].score.fullTime.awayTeam,
                matches: 1
            }
            estadisticas.push(equipoAway)
        }
        else {
            foundAwayTeam.goals += partidos[i].score.fullTime.awayTeam;
            foundAwayTeam.matches++;
        }

    }



    for (let k = 0; k < estadisticas.length; k++) {

        estadisticas[k].avg = estadisticas[k].goals / estadisticas[k].matches;

    }


    crear_tabla(estadisticas)
}


function crear_tabla(estadisticas) {



    let tabla = document.getElementById("tabla_estadistica1");

    estadisticas.sort((a, b) => b.avg - a.avg);

    let primeros5 = estadisticas.slice(0, 5);

    for (let i = 0; i < primeros5.length; i++) {

        let row = document.createElement("tr");

        let image = document.createElement("img");
        // image.setAttribute("src", standings[i].team.crestUrl);
        image.classList.add("image_team");

        let equipos = primeros5[i].name;

        let goles = primeros5[i].goals;

        let partidos = primeros5[i].matches;

        let avg = primeros5[i].avg;

        let array1 = [image, equipos, goles, partidos, avg];

        for (let j = 0; j < array1.length; j++) {

            let td = document.createElement("td");
            td.setAttribute("scope", "row");

            td.append(array1[j]);

            row.append(td);
        }
        tabla.append(row);
    }


}

function generar_estadistica2(partidos2) {

    let estadisticas2 = []
    for (let i = 0; i < partidos2.length; i++) {

        if (partidos2[i].status != "FINISHED") {
            continue
        }
        let homeTeamGoals = partidos2[i].score.fullTime.homeTeam;
        let awayTeam = partidos2[i].awayTeam.id;


        let foundAwayTeam;


        for (let j = 0; j < estadisticas2.length; j++) {

            if (estadisticas2[j].id == awayTeam) {
                foundAwayTeam = estadisticas2[j];
            }


        }

        if (foundAwayTeam == undefined) {
            let equipoAway = {
                id: awayTeam,
                name: partidos2[i].awayTeam.name,
                goalsAgainst: homeTeamGoals,
                matches: 1
            }
            estadisticas2.push(equipoAway)


        }
        else {
            // foundHomeTeam.goals=foundHomeTeam.goals+partidos[i].score.fullTime.homeTeam;
            foundAwayTeam.goalsAgainst += partidos2[i].score.fullTime.homeTeam;
            // foundHomeTeam.matches=foundHomeTeam.matches+1;
            // foundHomeTeam.matches+=1;
            foundAwayTeam.matches++;
        }


    }
    crear_tabla2(estadisticas2)

}
function crear_tabla2(estadisticas2) {

    let tabla2 = document.getElementById("tabla_estadistica2");

    estadisticas2.sort((a, b) => b.goalsAgainst - a.goalsAgainst);

    let primeros5menos = estadisticas2.slice(0, 5);

    for (let i = 0; i < primeros5menos.length; i++) {

        let row = document.createElement("tr");

        let image = document.createElement("img");
        // image.setAttribute("src", standings[i].team.crestUrl);  Si pongo esto desaparece la tabla
        image.classList.add("image_team");

        let equipos = primeros5menos[i].name;

        let goalsAga = primeros5menos[i].goalsAgainst;

        let partidos = primeros5menos[i].matches;

        let array2 = [image, equipos, goalsAga, partidos];

        for (let j = 0; j < array2.length; j++) {

            let td = document.createElement("td");
            td.setAttribute("scope", "row");

            td.append(array2[j]);

            row.append(td);
        }
        tabla2.append(row);
    }
    
}