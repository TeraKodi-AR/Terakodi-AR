
function calcularEdad() {

    var nacimiento = document.getElementById('fecha').value;
    var hoy = new Date();
    var cumpleanos = new Date(nacimiento);
    var edad = hoy.getFullYear() - cumpleanos.getFullYear();
    var m = hoy.getMonth() - cumpleanos.getMonth();

    if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
        edad--;
    }

    sessionStorage.setItem("edad", edad)
}



function validarUsuario() {


    var nombreOK = false
    var edadOK = false
    var sexoOK = false
    var mailOK = false

    var validarNombre = /[a-z,A-Z,0-9]{4,20}$/;
    var nombre = document.getElementById('nombre').value

    if (validarNombre.test(nombre)) {

        var nombre = document.getElementById('nombre').value
        nombreOK = true
        document.getElementById("error").innerHTML = ""

    } else {
        document.getElementById("error").innerHTML = " *El nombre debe tener al menos 4 letras"
    }

    calcularEdad()

    var edad = sessionStorage.getItem("edad")

    if (isNaN(edad)) {

        document.getElementById("error").innerHTML += "<br>*Debe ingresar su fecha de nacimiento"
    } else {

        document.getElementById("error").innerHTML += ""
        edadOK = true
    }



    if ($("input[name='sexo']:checked").val() == null) {
        document.getElementById("error").innerHTML += "<br>*Debe seleccionar su sexo"
    } else {
        var sexo = $("input[name='sexo']:checked").val();
        sexoOK = true
        document.getElementById("error").innerHTML += ""


    }

    var validarMail = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/
    var mail = document.getElementById('mail').value

    if (validarMail.test(mail)) {
        document.getElementById("error").innerHTML += ""

        mailOK = true;

    } else {

        document.getElementById("error").innerHTML += "<br>*Debe ingresar un mail valido"
    }


    if (nombreOK == true && edadOK == true && sexoOK == true && mailOK == true) {

        sessionStorage.setItem("OK", "ok")
        $('#close').click()

    } else {

        sessionStorage.setItem("OK", "no ok")

    }




}




function guardarUsuario() {


    validarUsuario()

    var OK = sessionStorage.getItem("OK")




    if (OK == "ok") {



        var usuario = new Object();
        usuario.nombre = document.getElementById('nombre').value
        usuario.edad = sessionStorage.getItem("edad")
        usuario.fechaNacimiento = document.getElementById('fecha').value
        usuario.sexo = $("input[name='sexo']:checked").val()
        usuario.mail = document.getElementById('mail').value


        var usuarios = [];

        usuarios = JSON.parse(localStorage.getItem('session'));

        usuarios.push(usuario);


        localStorage.setItem('session', JSON.stringify(usuarios));


        tablaDeUsuarios()



    }




}

function tablaDeUsuarios() {

	document.getElementById("pagination").style.visibility = "hidden"

    if (localStorage.getItem('session') == null) {

        var usuarios = []

        localStorage.setItem('session', JSON.stringify(usuarios))

    }

    limpiarForm()

    var table = JSON.parse(localStorage.getItem('session'));
    var bodyTable = document.getElementById('tableBody')



    bodyTable.innerHTML = ""

    if (table != "") {


        if (table.length > 5) {

           

            paginarTabla()

        } else {

            for (var i = 0; i <= table.length; i++) {


                bodyTable.innerHTML += "<tr id=" + i + "><th>" + (i + 1) + "</th><th>" + table[i].nombre + "</th><th>" + table[i].edad + " años" + "</th><th>" + table[i].sexo + "</th><th>" + table[i].mail + "</th><th><i data-editar=" + i + " id='pencil' class='fa fa-pencil-square-o' onclick = 'editarUsuario()'></i></th><th><i data-borrar=" + i + " id='trash' class='fa fa-trash-o' onclick = 'borrarUsuario()'></i></th></tr>"

            }

        }

    }






}

function borrarUsuario() {
var usuarios = JSON.parse(localStorage.getItem('session'));
    var usuario = event.currentTarget.dataset.borrar
    var tr = document.getElementById(usuario)
	 
    var opcion = confirm("El usuario seleccionado sera eliminado");
    if (opcion == true) {
          usuarios.splice(usuario, 1)

    localStorage.setItem('session', JSON.stringify(usuarios));

    tr.style.display = 'none'

    tablaDeUsuarios()
	}

    


  
}


function editarUsuario() {


    var usuarios = JSON.parse(localStorage.getItem('session'));
    var usuario = event.currentTarget.dataset.editar
    var tr = document.getElementById(usuario)

    $("#nombre").val(usuarios[usuario].nombre)
    $("#fecha").val(usuarios[usuario].fechaNacimiento)
    $("#" + usuarios[usuario].sexo).attr("checked", true)
    $("#mail").val(usuarios[usuario].mail)
    $("#botonAgregar").click()
    $("#botonGuardar").css("display", "none")
    $("#botonEditar").css("display", "block")
    sessionStorage.setItem("usuarioEditado", usuario)


}

function confirmarEdicion() {



    validarUsuario()

    var OK = sessionStorage.getItem("OK")

    if (OK == "ok") {
        var index = sessionStorage.getItem("usuarioEditado")


        validarUsuario()

        var usuario = new Object();
        usuario.nombre = $("#nombre").val()
        usuario.edad = sessionStorage.getItem("edad")
        usuario.fechaNacimiento = $("#fecha").val()
        usuario.sexo = $("input[name='sexo']:checked").val()
        usuario.mail = $("#mail").val()

        var usuarios = JSON.parse(localStorage.getItem('session'));


        usuarios.splice(index, 1, usuario)

        localStorage.setItem('session', JSON.stringify(usuarios))


        tablaDeUsuarios()




    }

}

function paginarTabla() {


	document.getElementById("pagination").style.visibility = "visible"

    var bodyTable = document.getElementById('tableBody')

    bodyTable.innerHTML = ""

    var table = JSON.parse(localStorage.getItem('session'));

    var currentPage = 1;

    var totalPages = Math.ceil(table.length / 5);

    var paginatedTable = table.slice(0, 4);

    document.getElementById("pagNum").innerHTML = currentPage;

    document.getElementById("totalPag").innerHTML = totalPages;

    document.getElementById("prevPag").disabled = true;

    for (var i = 0; i <= paginatedTable.length; i++) {


        bodyTable.innerHTML += "<tr id=" + i + "><th>" + (i + 1) + "</th><th>" + table[i].nombre + "</th><th>" + table[i].edad + " años" + "</th><th>" + table[i].sexo + "</th><th>" + table[i].mail + "</th><th><i data-editar=" + i + " id='pencil' class='fa fa-pencil-square-o' onclick = 'editarUsuario()'></i></th><th><i data-borrar=" + i + " id='trash' class='fa fa-trash-o' onclick = 'borrarUsuario()'></i></th></tr>"

    }


}





function nextPage(){


	var table = JSON.parse(localStorage.getItem('session'));
	var totalPages = Math.ceil(table.length / 5);

	 var currentPage =  document.getElementById("pagNum").innerHTML;
	

if ( currentPage < totalPages){

	document.getElementById("prevPag").disabled = false;

		 var inicio = (currentPage) * 5
	var final =  inicio + 5;


	   var bodyTable = document.getElementById('tableBody')

    bodyTable.innerHTML = ""
var paginatedTable = table.slice(inicio, final);

	      currentPage ++

	 document.getElementById("pagNum").innerHTML = currentPage


 
    for (var i = 0; i <= paginatedTable.length; i++) {


        bodyTable.innerHTML += "<tr id=" + i + "><th>" + ((final + i) - 4) + "</th><th>" + paginatedTable[i].nombre + "</th><th>" + paginatedTable[i].edad + " años" + "</th><th>" + paginatedTable[i].sexo + "</th><th>" + paginatedTable[i].mail + "</th><th><i data-editar=" + i + " id='pencil' class='fa fa-pencil-square-o' onclick = 'editarUsuario()'></i></th><th><i data-borrar=" + i + " id='trash' class='fa fa-trash-o' onclick = 'borrarUsuario()'></i></th></tr>"

    }





}else{

	document.getElementById("nextPag").disabled = true;

}
	 
	 
	 	

}

function prevPage(){


	var table = JSON.parse(localStorage.getItem('session'));
	var totalPages = Math.ceil(table.length / 5);

	 var currentPage =  document.getElementById("pagNum").innerHTML;
	

if ( currentPage > 1){

		 var usuarios = (currentPage) * 5
	var final = usuarios - 5
	var inicio = final - 5 ;
	


	   var bodyTable = document.getElementById('tableBody')

    bodyTable.innerHTML = ""


var paginatedTable = table.slice(inicio, final);



	      currentPage --

	 document.getElementById("pagNum").innerHTML = currentPage


 
    for (var i = 0; i <= paginatedTable.length; i++) {


        bodyTable.innerHTML += "<tr id=" + i + "><th>" + ((final - 4) + i) + "</th><th>" + paginatedTable[i].nombre + "</th><th>" + paginatedTable[i].edad + " años" + "</th><th>" + paginatedTable[i].sexo + "</th><th>" + paginatedTable[i].mail + "</th><th><i data-editar=" + i + " id='pencil' class='fa fa-pencil-square-o' onclick = 'editarUsuario()'></i></th><th><i data-borrar=" + i + " id='trash' class='fa fa-trash-o' onclick = 'borrarUsuario()'></i></th></tr>"

    }





}else{

	document.getElementById("nextPag").disabled = false;

}
	 
	 
	 	

}



function limpiarForm() {

    $("#nombre").val("")

    $("#fecha").val(undefined)
    $("#Femenino").attr("checked", false)
    $("#Masculino").attr("checked", false)
    $("#mail").val("")


}