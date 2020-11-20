var sortowanie = true;
var zalogowane = false;
var daneOsobowe = [
    { login: '1', haslo: '1', wiek: '10', plec: 'M', id: 1 },
    { login: '2', haslo: '2', wiek: '10', plec: 'M', id: 2 },
    { login: '3', haslo: '3', wiek: '10', plec: 'K', id: 3 },
    { login: '4', haslo: '4', wiek: '15', plec: 'M', id: 4 },
    { login: '45', haslo: '5', wiek: '16', plec: 'M', id: 5 },
    { login: '456', haslo: '1', wiek: '16', plec: 'K', id: 6 },
    { login: '4561', haslo: '1', wiek: '19', uczen: 'on', plec: 'K', id: 7 }
]
var express = require("express")
var app = express()
var PORT = process.env.PORT || 3000;
app.use(express.static('static'))
var path = require("path")
var bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({
    extended: true
}));
app.post("/rejestracja", function (req, res) {
    var zmDane = true;
    for (let i = 0; i < daneOsobowe.length; i++) {
        if (req.body.login == daneOsobowe[i].login) {
            zmDane = false;
        }
    }
    if (zmDane) {
        daneOsobowe.push(req.body)
        daneOsobowe[daneOsobowe.length - 1].id = daneOsobowe.length
        res.send("Cześć, " + req.body.login)
    }
    else {
        res.send("Błąd: użytkownik istnieje")
    }
    console.log(daneOsobowe)
})
app.post("/loginadm", function (req, res) {
    for (let i = 0; i < daneOsobowe.length; i++) {
        if (req.body.login == daneOsobowe[i].login) {
            if (req.body.haslo == daneOsobowe[i].haslo) {
                zalogowane = true;
                res.redirect("/admin")
            }
            else {
                res.send("Błąd: użytkownik istnieje")
            }
        }
    }
})
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + "/static/pages/main.html"))
});
app.get('/main', function (req, res) {
    res.sendFile(path.join(__dirname + "/static/pages/main.html"))
});
app.get('/login', function (req, res) {
    res.sendFile(path.join(__dirname + "/static/pages/login.html"))
});
app.get('/register', function (req, res) {
    res.sendFile(path.join(__dirname + "/static/pages/register.html"))
});
app.get('/admin', function (req, res) {
    if (zalogowane) {
        res.sendFile(path.join(__dirname + "/static/pages/adminlog.html"))
    }
    else {
        res.sendFile(path.join(__dirname + "/static/pages/adminunlog.html"))
    }
});
app.get('/logout', function (req, res) {
    if (zalogowane) {
        zalogowane = false;
        res.redirect("/admin")
    }
    else {
        res.send("Błąd: Brak dostępu")
    }
});
app.get('/show', function (req, res) {
    if (zalogowane) {
        daneOsobowe = daneOsobowe.sort(function (a, b) {
            return (a.id) - (b.id);
        });;
        res.sendFile(path.join(__dirname + "/static/pages/adminlog.html"))
        let stronaTworzona = "<body style='background-color:rgb(26, 26, 0);width:100vw;height:100vw'><a style='color:rgb(204, 204, 0);margin:15px;font-size:20px;font-weight:bold;' href='/sort'>Sort</a><a  style='color:rgb(204, 204, 0);margin:15px;font-size:20px;font-weight:bold;' href='gender'>Gender</a><a  style='color:rgb(204, 204, 0);margin:15px;font-size:20px;font-weight:bold;'href='show'>Show</a><table style='margin:0 auto;width:1000px;height:500px; ' >"
        for (i = 0; i < daneOsobowe.length; i++) {
            let tablicaTworzona = ""
            tablicaTworzona += "<tr style='background-color:rgb(26, 26, 0);color:rgb(204, 204, 0);border:solid 5px rgb(204, 204, 0);border-radius:5px;height:50px;' ><th style='background-color:rgb(26, 26, 0);color:rgb(204, 204, 0);border:solid 5px rgb(204, 204, 0);border-radius:5px;'> Id: " + daneOsobowe[i].id + "</th><th style='background-color:rgb(26, 26, 0);color:rgb(204, 204, 0); border:solid 5px rgb(204, 204, 0);border-radius:5px;'> User: " + daneOsobowe[i].login + "; Hasło: " + daneOsobowe[i].haslo + "</th>"
            if (daneOsobowe[i].uczen == "on")
                tablicaTworzona += "<th style='background-color:rgb(26, 26, 0);color:rgb(204, 204, 0); border:solid 5px rgb(204, 204, 0);border-radius:5px;'>Uczeń: <input type='checkbox' checked disabled></th>"
            else
                tablicaTworzona += "<th style='background-color:rgb(26, 26, 0);color:rgb(204, 204, 0); border:solid 5px rgb(204, 204, 0);border-radius:5px;'>Uczeń: <input type='checkbox' disabled></th>"
            tablicaTworzona += "<th style='background-color:rgb(26, 26, 0);color:rgb(204, 204, 0); border:solid 5px rgb(204, 204, 0);border-radius:5px;'> Wiek: " + daneOsobowe[i].wiek + "</th>" + "<th style='background-color:rgb(26, 26, 0);color:rgb(204, 204, 0); border:solid 5px rgb(204, 204, 0);border-radius:5px;'> Płeć: " + daneOsobowe[i].plec + "</th></tr>"
            stronaTworzona += tablicaTworzona
        }
        stronaTworzona += "</table></body>"
        res.send(stronaTworzona)
    }
    else {
        res.send("Błąd: Brak dostępu")
    }
});
app.get('/gender', function (req, res) {
    if (zalogowane) {
        let stronaTworzona = "<body style='background-color:rgb(26, 26, 0);width:100vw;height:100vh'><a style='color:rgb(204, 204, 0);margin:10px;font-size:20px;font-weight:bold;' href='/sort'>Sort</a><a  style='color:rgb(204, 204, 0);margin:10px;font-size:20px;font-weight:bold;' href='gender'>Gender</a><a  style='color:rgb(204, 204, 0);margin:10px;font-size:20px;font-weight:bold;'href='show'>Show</a><table style='margin:0 auto;width:1000px;height:500px;' >"
        let tablicaPom = "<table style='margin:0 auto;width:1000px;height:500px;margin-top:15px;' >"
        for (i = 0; i < daneOsobowe.length; i++) {
            if (daneOsobowe[i].plec == "M") {
                let tablicaTworzona = ''
                tablicaTworzona += "<tr style='background-color:rgb(26, 26, 0);color:rgb(204, 204, 0);border:solid 5px rgb(204, 204, 0);border-radius:5px;' ><th style='background-color:rgb(26, 26, 0);color:rgb(204, 204, 0);border:solid 5px rgb(204, 204, 0);border-radius:5px;'> Id: " + daneOsobowe[i].id + "</th>"
                tablicaTworzona += "<th style='background-color:rgb(26, 26, 0);color:rgb(204, 204, 0); border:solid 5px rgb(204, 204, 0);border-radius:5px;'> Płeć: " + daneOsobowe[i].plec + "</th></tr>"
                stronaTworzona += tablicaTworzona
            }
            else {
                let tablicaTworzona = ''
                tablicaPom += "<tr style='background-color:rgb(26, 26, 0);color:rgb(204, 204, 0);border:solid 5px rgb(204, 204, 0);border-radius:5px;' ><th style='background-color:rgb(26, 26, 0);color:rgb(204, 204, 0);border:solid 5px rgb(204, 204, 0);border-radius:5px;'> Id: " + daneOsobowe[i].id + "</th>"
                tablicaTworzona += "<th style='background-color:rgb(26, 26, 0);color:rgb(204, 204, 0); border:solid 5px rgb(204, 204, 0);border-radius:5px;'> Płeć: " + daneOsobowe[i].plec + "</th></tr>"
                tablicaPom += tablicaTworzona
            }
        }
        stronaTworzona += "</table>" + tablicaPom + "</table></body>"
        res.send(stronaTworzona)
    }
    else {
        res.send("Błąd: Brak dostępu")
    }
});
app.get('/sort', function (req, res) {
    if (zalogowane) {
        daneOsobowe = daneOsobowe.sort(function (a, b) {
            return parseFloat(a.wiek) - parseFloat(b.wiek);
        });;
        let stronaTworzona = "<body style='background-color:rgb(26, 26, 0);width:100vw;height:100vh'><a style='color:rgb(204, 204, 0);margin:10px;font-size:20px;font-weight:bold;' href='/sort'>Sort</a><a  style='color:rgb(204, 204, 0);margin:10px;font-size:20px;font-weight:bold;' href='gender'>Gender</a><a  style='color:rgb(204, 204, 0);margin:10px;font-size:20px;font-weight:bold;'href='show'>Show</a>"
        if (sortowanie)
            stronaTworzona += "<form  onchange='this.submit()'  method='POST' action='/sort'><input checked type='radio' name='type' id='r1'value='gora' ><label style='color:rgb(204, 204, 0);font-weight:bold;'for='#r1'>Najm.-Najw.</label> <input type='radio' name='type' id='r2'value='dol'><label style='color:rgb(204, 204, 0);font-weight:bold;' for='#r2'>Najw.-Najm.</label></form><table style='margin:0 auto;width:1000px;height:500px; ' >"
        else {
            stronaTworzona += "<form  onchange='this.submit()'  method='POST' action='/sort'><input type='radio' name='type' id='r1'value='gora' ><label style='color:rgb(204, 204, 0);font-weight:bold;'for='#r1'>Najmn.-Najw.</label> <input type='radio' checked name='type' id='r2'value='dol'><label style='color:rgb(204, 204, 0);font-weight:bold;' for='#r2'>Najw.-Najm.</label></form><table style='margin:0 auto;width:1000px;height:500px; ' >"
            daneOsobowe.reverse()
        }
        let tablicaPom = "<table style='margin:0 auto;width:1000px;height:500px;;margin-top:15px;' >"
        for (i = 0; i < daneOsobowe.length; i++) {
            if (sortowanie) {
                let tablicaTworzona = ''
                tablicaTworzona += "<tr style='background-color:rgb(26, 26, 0);color:rgb(204, 204, 0);border:solid 5px rgb(204, 204, 0);border-radius:5px;' ><th style='background-color:rgb(26, 26, 0);color:rgb(204, 204, 0);border:solid 5px rgb(204, 204, 0);border-radius:5px;'> Id: " + daneOsobowe[i].id + "</th><th style='background-color:rgb(26, 26, 0);color:rgb(204, 204, 0); border:solid 5px rgb(204, 204, 0)'> User: " + daneOsobowe[i].login + ";Hasło: " + daneOsobowe[i].haslo + "</th>"
                tablicaTworzona += "<th style='background-color:rgb(26, 26, 0);color:rgb(204, 204, 0); border:solid 5px rgb(204, 204, 0);border-radius:5px;'> Wiek: " + daneOsobowe[i].wiek + "</th></tr>"
                stronaTworzona += tablicaTworzona
            }
            else {
                let tablicaTworzona = ''
                tablicaTworzona += "<tr style='background-color:rgb(26, 26, 0);color:rgb(204, 204, 0);border:solid 5px rgb(204, 204, 0);border-radius:5px;' ><th style='background-color:rgb(26, 26, 0);color:rgb(204, 204, 0);border:solid 5px rgb(204, 204, 0);border-radius:5px;'> Id: " + daneOsobowe[i].id + "</th><th style='background-color:rgb(26, 26, 0);color:rgb(204, 204, 0); border:solid 5px rgb(204, 204, 0)'> User: " + daneOsobowe[i].login + ";Hasło: " + daneOsobowe[i].haslo + "</th>"
                tablicaTworzona += "<th style='background-color:rgb(26, 26, 0);color:rgb(204, 204, 0); border:solid 5px rgb(204, 204, 0);border-radius:5px;'> Wiek: " + daneOsobowe[i].wiek + "</th></tr>"
                stronaTworzona += tablicaTworzona
            }
        }
        stronaTworzona += "</table>" + tablicaPom + "</table></body>"
        res.send(stronaTworzona)
    } else
        res.send("Błąd: Brak dostępu")
})
app.post('/sort', function (req, res) {
    if (req.body.type == 'dol')
        sortowanie = false
    else
        sortowanie = true
    res.redirect("/sort")
})
app.get('*', function (req, res) {
    res.send("Podana strona nie istnieje!")
});
app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT)
})