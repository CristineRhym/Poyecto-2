const url = "https://api.football-data.org/v2/competitions/2014/matches";
let boton = document.getElementById("boton");
let loading = document.getElementById("loading")


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
        generar_tabla(data.matches)
        boton.addEventListener("click", function () /*=>*/ {
            generar_filtro(data.matches)
        });
        if (data.matches != undefined) {
            loading.style.display = 'none'
            return data.matches
        }
    })

function generar_tabla(matchesGeneral) {
    let tabla = document.getElementById("tablapartidos");
    limpiartabla();
    // tabla.innerHTML = " "
    for (let i = 0; i < matchesGeneral.length; i++) {

        let row = document.createElement("tr");

        let visitante = document.createElement("td");
        visitante.innerHTML = matchesGeneral[i].awayTeam.name;

        let resultado = document.createElement("td");
        resultado.innerHTML = matchesGeneral[i].score.fullTime.homeTeam + "-" + matchesGeneral[i].score.fullTime.awayTeam;
        if (matchesGeneral[i].score.fullTime.homeTeam == null) {
            resultado.textContent = "Próximamente"
        }
        else {
            resultado.innerHTML = matchesGeneral[i].score.fullTime.homeTeam + "-" + matchesGeneral[i].score.fullTime.awayTeam;
        }

        let local = document.createElement("td");
        local.innerHTML = matchesGeneral[i].homeTeam.name;

        tabla.append(row);
        row.append(local, resultado, visitante);


    }
}

function limpiartabla() {
    document.getElementById("tablapartidos").innerHTML = " "
}

function generar_filtro(matchesFiltrados) {

    let buscarMatch = document.getElementById("buscaPartidos").value;

    let filteredArray = matchesFiltrados.filter(match => {
        if (match.homeTeam.name.toLowerCase().includes(buscarMatch.toLowerCase()) || match.awayTeam.name.toLowerCase().includes(buscarMatch.toLowerCase())) {
            return true
        } else {
            return false

        }
    })

    let radioButton1 = document.querySelector('input[name="Partidos"]:checked');
    let radioButton2 = document.querySelector('input[name="Partidos"]:checked');
    let radioButton3 = document.querySelector('input[name="Partidos"]:checked');
    let radioButton4 = document.querySelector('input[name="Partidos"]:checked');


    let filteredArray2 = filteredArray.filter(match => {
        if (radioButton1.value == "Ganados") {
            if (match.homeTeam.name.toLowerCase().includes(buscarMatch.toLowerCase()) && match.score.winner == "HOME_TEAM" || match.awayTeam.name.toLowerCase().includes(buscarMatch) && match.score.winner == "AWAY_TEAM") {
                return true

            } else {
                return false
            }
        }

        if (radioButton2.value == "Empatados") {
            if (match.homeTeam.name.toLowerCase().includes(buscarMatch.toLowerCase()) && match.score.winner == "DRAW" || match.awayTeam.name.toLowerCase().includes(buscarMatch) && match.score.winner == "DRAW") {
                return true

            } else {
                return false
            }

            // if(radioButton2=="Empatados" && match.score.winner=="DRAW"){
            //     return true
            // }
        }

        if (radioButton3.value == "Perdidos") {
            if (match.homeTeam.name.toLowerCase().includes(buscarMatch.toLowerCase()) && match.score.winner == "AWAY_TEAM" || match.awayTeam.name.toLowerCase().includes(buscarMatch) && match.score.winner == "HOME_TEAM") {
                return true

            } else {
                return false
            }
        }

        if (radioButton4.value == "Proximos") {
            if (match.homeTeam.name.toLowerCase().includes(buscarMatch.toLowerCase()) && match.score.winner == null || match.awayTeam.name.toLowerCase().includes(buscarMatch) && match.score.winner == null) {
                return true

            } else {
                return false
            }
        }
    })
    generar_tabla(filteredArray2)

}


