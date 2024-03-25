/* SmtpJS.com - v3.0.0 */
var Email = { send: function (a) { return new Promise(function (n, e) { a.nocache = Math.floor(1e6 * Math.random() + 1), a.Action = "Send"; var t = JSON.stringify(a); Email.ajaxPost("https://smtpjs.com/v3/smtpjs.aspx?", t, function (e) { n(e) }) }) }, ajaxPost: function (e, n, t) { var a = Email.createCORSRequest("POST", e); a.setRequestHeader("Content-type", "application/x-www-form-urlencoded"), a.onload = function () { var e = a.responseText; null != t && t(e) }, a.send(n) }, ajax: function (e, n) { var t = Email.createCORSRequest("GET", e); t.onload = function () { var e = t.responseText; null != n && n(e) }, t.send() }, createCORSRequest: function (e, n) { var t = new XMLHttpRequest; return "withCredentials" in t ? t.open(e, n, !0) : "undefined" != typeof XDomainRequest ? (t = new XDomainRequest).open(e, n) : t = null, t } };


document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('emailForm').addEventListener('submit', function (event) {
        event.preventDefault();
        sendEmail();
    });
});

//use smtp to send email 
function sendEmail() {
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var tel = document.getElementById("tel").value;
    var message = document.getElementById("Message").value;

    const emailData = {
        Host: "smtp-relay.brevo.com",
        Username: "carl7yt@gmail.com",
        Password: "dVvrwmEPGAk8CQH2",
        port: 587,
        To: email,
        From: "aaron.vanmarcke@gmail.com",
        Subject: "New Message from " + name,
        Body: `Name: ${name}<br>Email: ${email}<br>Phone: ${tel}<br>Message: ${message}`
    };

    Email.send({
        emailData
    }).then(
        message => alert("Email sent successfully!")
    ).catch(
        error => alert("Failed to send email. Please try again later.")
    );
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("tel").value = "";
    document.getElementById("Message").value = "";

}
