"use strict";
$(document).ready(function () {
    //1
    $("#test").click(function () {
        $("#risultati1").text($.get("http://localhost:8088/", testServizio));
        if (status !== "success")
            alert("Errore");
    });

    //2
    $("#costruttori1").click(function () {
        $("#risultati2").load("http://localhost:8088/costruttori");
        if (status !== "success")
            alert("Errore");
    });

    //3
    $("#costruttori2").click(function () {
        $.get("http://localhost:8088/costruttori", costruttori);
        if (status !== "success")
            alert("Errore");
    });

    //4
    $("#tab").click(function () {
        $.get("http://localhost:8088/piloti", tabellaPiloti);
        if (status !== "success")
            alert("Errore");

    });

    //5
    $("#mostraPiloti").click(ricercaPiloti);
    $.get("http://localhost:8088/costruttori", costruttoriSelect);
    if (status !== "success")
        alert("Errore");

    //6
    $("#pilotiteamselect").change(function () {
        var value = $(this).find(':selected').attr('value');
        if (value === "void")
            $("risultati6").text("Scrivere qui i risultati");
        $.get("http://localhost:8088/2018/pilotiDeiTeams" + value, pilotiSelect);
        if (status !== "success")
            alert("Errore");
    });
});

function testServizio(data) {
    $("risultati1").text(data);
}

function costruttori(data) {
    var lista = $('<ul>');
    $.each(data, function (key, val) {
        lista.append($('<li>').text(val.nomeCostruttore + "-" + val.nazioneCostruttore));
    });
    $("#risultati3").html(lista);
}

function tabellaPiloti(data) {
    var table = $('<table>');
    $.each(data, function (key, val) {
        var tr = $('<tr>');
        tr.append($('<td>').text(val.idPiloti));
        tr.append($('<td>').text(val.nomePilota + " " + val.cognomePilota));
        tr.append($('<td>').text(val.nazionalita));
        tr.append($('<td>').text(val.dataNascita));
        table.append(tr);
    });
    $("#risultati4").html(table);
}

function ricercaPiloti() {
    var obj = $("#textArea").val();
    $.get("http://localhost:8088/campionati/2018/pilotiDeiTeams/" + obj, tabPiloti);
    if (status !== "success")
        $("#textAreaPiloti").text("Errore");
}

function tabPiloti(data) {
    var table = $('<table>');
    $.each(data, function (key, val) {
        var tr = $('<tr>');
        tr.append($('<td>').text(val.idPilota));
        tr.append($('<td>').text(val.nomePilota + " " + val.cognomePilota));
        tr.append($('<td>').text(val.nazionalita));
        tr.append($('<td>').text(val.dataNascita));
        table.append(tr);
    });
    $("#divPiloti").html(table);
}

function costruttoriSelect(data) {
    var select = $("#pilotiSel");
    $.each(data, function (ix, val) {
        select.append(new Option(val.nomeCostruttore, val.idCostruttore));
    });
}

function pilotiSelect(data) {
    var tab = $("<table>");
    $.each(data, function (key, val) {
        var tr = $("<tr>");
        tr.append($("<td>").text(val.idPilota));
        tr.append($("<td>").text(val.congomePilota + " " + val.nomePilota));
        tr.append($("<td>").text(val.nazionalita));
        tr.append($("<td>").text(val.dataNascita));
        tab.append(tr);
    });
    $("#divPilotiSelect").html(tab);
}
