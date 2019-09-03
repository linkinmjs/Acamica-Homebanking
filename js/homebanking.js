//Declaración de variables
var nombreUsuario = "Mauricio Stampella";
var saldoCuenta = 4000;
var limiteExtraccion = 2000;
var error;
var intentos = 3;
//Deudas
var deudaAgua = 350;
var deudaTelefono = 425;
var deudaLuz = 210;
var deudaInternet = 570;
//Cuentas
var cuenta1 = 12345678;
var cuenta2 = 87654321;

//Ejecución de las funciones que actualizan los valores de las variables en el HTML.
window.onload = function () {
    cargarNombreEnPantalla();
    actualizarSaldoEnPantalla();
    actualizarLimiteEnPantalla();
}

//Funciones que tenes que completar
function cambiarLimiteDeExtraccion() {
    var valor = parseInt(prompt("Ingrese el nuevo límite: ", "0"));

    resetearError();
    esNumero(valor);

    if (error == "") {
        limiteExtraccion = valor;
        alert("El nuevo límite es: " + limiteExtraccion);
        actualizarLimiteEnPantalla();
    }else{
        alert(error);
    }
}

function extraerDinero() {
    var valor = parseInt(prompt("Ingrese el monto a extraer:", "0"));

    resetearError();
    superaLimite(valor);
    esMultiplo(valor);
    esValido(valor);
    esNumero(valor);

    if (error == "") {
        var saldoAnterior = saldoCuenta;

        restarSaldo(valor);
        actualizarSaldoEnPantalla();
        alert(
            "Has extraido: " + valor +
            "\nSaldo anterior: " + saldoAnterior +
            "\nSaldo actual: " + saldoCuenta
        )
    } else {
        alert(error);
    }
}

function depositarDinero() {
    var valor = parseInt(prompt("Ingrese el monto a depositar:", "0"));

    resetearError();
    esMultiplo(valor);
    esNumero(valor);

    if (error == "") {
        var saldoAnterior = saldoCuenta;
        
        sumarSaldo(valor);
        actualizarSaldoEnPantalla();
        alert(
            "Has depositado: " + valor +
            "\nSaldo anterior: " + saldoAnterior +
            "\nSaldo actual: " + saldoCuenta
        )
    } else {
        alert(error);
    }
}

function pagarServicio() {
    resetearError();
    var servicio = prompt("Seleccione de su agenda de pagos, el número del servicio a abonar:\n1 - Agua\n2 - Teléfono\n3 - Luz\n4 - Internet");
    switch (servicio) {
        case "1":
            esValido(deudaAgua);
            if (error == "") {
                deudaAgua = pagarDeuda(deudaAgua);
            } else {
                alert(error);
            }
            break;
        case "2":
            esValido(deudaTelefono);
            if (error == "") {
                deudaTelefono = pagarDeuda(deudaTelefono);
            } else {
                alert(error);
            }
            break;
        case "3":
            esValido(deudaLuz);
            if (error == "") {
                deudaLuz = pagarDeuda(deudaLuz);
            } else {
                alert(error);
            }
            break;
        case "4":
            esValido(deudaInternet);
            if (error == "") {
                deudaInternet = pagarDeuda(deudaInternet);
            } else {
                alert(error);
            }
            break;
    }
}

function transferirDinero() {
    var monto = prompt("Ingrese el monto a transferir: ", "0");
    resetearError();
    esValido(monto);
    esNumero(monto);
    if (error == "") {
        var cuenta = prompt("Ingrese la cuenta a la que se le desea transferir");
        if (cuenta == cuenta1 || cuenta == cuenta2) {
            saldoCuenta -= monto;
            actualizarSaldoEnPantalla();
            alert("El monto solicitado se ha transferido correctamente.");
        } else {
            alert("La cuenta ingresada no esta incorporada en su agenda.\nActualmente usted dispone de las siguientes cuentas:\n- " + cuenta1 + "\n- " + cuenta2);
        }
    } else {
        alert(error);
    }

}

//Funciones que actualizan el valor de las variables en el HTML
function cargarNombreEnPantalla() {
    document.getElementById("nombre").innerHTML = "Bienvenido/a " + nombreUsuario;
}

function actualizarSaldoEnPantalla() {
    document.getElementById("saldo-cuenta").innerHTML = "$" + saldoCuenta;
}

function actualizarLimiteEnPantalla() {
    document.getElementById("limite-extraccion").innerHTML = "Tu límite de extracción es: $" + limiteExtraccion;
}



/*******************************************************/
// FUNCIONES PERSONALIZADAS - 02/09/2019
//

//Validaciones
function esNumero(m) {
    var monto = m;
    if (!isNaN(monto)) {
        return;
    } else {
        return (error = "El valor ingresado no es válido.");
    }
}
function superaLimite(m) {
    var monto = m
    if (monto <= limiteExtraccion) {
        return;
    } else {
        return (error = "El monto es superior al limite de extracción");
    }
}
function esValido(m) {
    var monto = m;
    if (monto <= saldoCuenta) {
        return;
    } else {
        return (error = "El saldo de la cuenta es inferior al monto ingresado");
    }
}
function esMultiplo(m) {
    var monto = m % 100;
    if (monto == 0) {
        return;
    } else {
        return (error = "La operación no se podrá llevar a cabo.\nEsta terminal solo opera con billetes de $100.");
    }
}

//Triggers
function resetearError() {
    error = "";
}

//Operaciones
function pagarDeuda(d) {
    var cancelarDeuda = confirm("Actualmente debe: $" + d + "\n\nDesea pagar la deuda?");
    if (cancelarDeuda == true) {
        restarSaldo(d);
        
        alert("Gracias por utilizar la terminal");
        d = 0;
        return d;
    } else {
        return d;
    }
}

function sumarSaldo(m){
    saldoCuenta += m;
    actualizarSaldoEnPantalla();
}

function restarSaldo(m){
    saldoCuenta -= m;
    actualizarSaldoEnPantalla();
}

function loguear() {
    contraseña = prompt("Ingrese su contraseña");
    if (contraseña == "test") {
        cargarNombreEnPantalla();
        var elems = document.getElementsByClassName('btn');
        for (var i = 0; i < elems.length; i += 1) {
            elems[i].style.display = 'none';
        }
        var elems = document.getElementsByClassName('terminal');
        for (var i = 0; i < elems.length; i += 1) {
            elems[i].style.display = 'flex';
        }
    } else if(intentos == 0){
        alert("Contraseña Incorrecta. Se ha bloqueado su cuenta.");
        saldoCuenta = 0;
    } else {
        alert("Contraseña Incorrecta. Quedan " + intentos + " intentos" );
        intentos -= 1;
    }
}