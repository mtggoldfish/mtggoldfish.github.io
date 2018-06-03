var name = "name";

function getQueryParams(qs) {
    qs = qs.split('+').join(' ');

    var params = {},
        tokens,
        re = /[?&]?([^=]+)=([^&]*)/g;

    while (tokens = re.exec(qs)) {
        params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
    }

    return params;
}

function send() {
    var mes = name + ":" + document.getElementById("message").value;

    var XHR = ("onload" in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;

    var xhr = new XHR();

    xhr.open('GET', 'http://192.168.0.131:8080/message/send/_ALL_/' + mes, true);

    xhr.onload = function () {
    };

    xhr.onerror = function () {
    };

    xhr.send();
}


function check() {
    var XHR = ("onload" in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;

    var xhr = new XHR();
    xhr.open('GET', 'http://192.168.0.131:8080/message/read/' + name, true);

    xhr.onload = function () {
        if (this.responseText != "null") {
            var a = this.responseText.split("\n");
            a.forEach(function (value, index, array) {
                if (index > 0) {
                    document.getElementById("chat").value += value + "\n";
                }
            });
        }
    };

    xhr.onerror = function () {
        alert('Сервер не отвечает');
    };

    xhr.send();
}

window.onload = function (ev) {
    setInterval("check()", 1000);
};

function submit() {
    var login = document.getElementById("login-form").value;
    var password = document.getElementById("password-form").value;
    var XHR = ("onload" in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;

    var xhr = new XHR();
    xhr.open('GET', 'http://192.168.0.131:8080/check/' + login + '/' + password, true);

    xhr.onload = function () {
        if (this.responseText == "ok") {
            document.getElementById("login-frame").style.display = "none";
            name = login;
        } else {
            alert("Неверный логин или пароль")
        }
    };

    xhr.onerror = function () {
        alert('Сервер не отвечает');
    };

    xhr.send();
}

function XOR(a, b) {
    var res = "",
        i = a.length,
        j = b.length;
    while (i-- > 0 && j-- > 0)
        res = (parseInt(a.charAt(i), 16) ^ parseInt(b.charAt(j), 16)).toString(16) + res;
    return res;
}
