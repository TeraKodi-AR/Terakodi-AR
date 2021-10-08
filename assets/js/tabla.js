function validarProducto() {


    var productoOK = false;
    var quantityOK = false;
    var codeOK = false;

    var validarProducto = /[a-z,A-Z,0-9]{1,20}$/;
    var producto = document.getElementById('producto').value;

    if (validarProducto.test(producto)) {

        producto = document.getElementById('producto').value;
        productoOK = true;
        document.getElementById("error").innerHTML = "";

    } else {
        document.getElementById("error").innerHTML = " *The product need to have 1 letter minimun";
    }

    var validarQuantity = /[0-9]{1,5}$/;
    var quantity = document.getElementById('quantity').value;

    if (validarQuantity.test(quantity)) {
        document.getElementById("error").innerHTML += "";

        quantityOK = true;

    } else {

        document.getElementById("error").innerHTML += " *You need to enter a number";
    }

    var validarCodigo = /[a-z,A-Z,0-9]{1,20}$/;
    var code = document.getElementById('code').value;

    if (validarCodigo.test(code)) {

        var code = document.getElementById('code').value;
        codeOK = true;
        document.getElementById("error").innerHTML = "";

    } else {
        document.getElementById("error").innerHTML = " *The code need to have 1 character minimun";
    }


    if (productoOK == true && quantityOK == true && codeOK == true) {

        sessionStorage.setItem("OK", "ok");
        $('#close').click();

    } else {

        sessionStorage.setItem("OK", "no ok");

    }




}




function guardarProducto() {


    validarProducto();

    var OK = sessionStorage.getItem("OK");




    if (OK == "ok") {



        var venta = new Object();
        venta.producto = document.getElementById('producto').value;
        venta.quantity = document.getElementById('quantity').value;
        venta.code = document.getElementById('code').value;



        var ventas = [];

        ventas = JSON.parse(localStorage.getItem('session'));

        ventas.push(venta);


        localStorage.setItem('session', JSON.stringify(ventas));


        tablaDeVentas();



    }




}

function tablaDeVentas() {

	document.getElementById("pagination").style.visibility = "hidden";

    if (localStorage.getItem('session') == null) {

        var ventas = [];

        localStorage.setItem('session', JSON.stringify(ventas));

    }

    limpiarForm();

    var table = JSON.parse(localStorage.getItem('session'));
    var bodyTable = document.getElementById('tableBody');



    bodyTable.innerHTML = "";

    if (table != "") {


        if (table.length > 5) {

           

            paginarTabla();

        } else {

            for (var i = 0; i <= table.length; i++) {


                bodyTable.innerHTML += "<tr id=" + i + "><th>" + (i + 1) + "</th><th>" + table[i].producto + "</th><th>" + table[i].quantity + "</th><th>" + table[i].code + "</th><th><i data-editar=" + i + " id='pencil' class='fa fa-pencil-square-o' onclick = 'editarUsuario()'></i></th><th><i data-borrar=" + i + " id='trash' class='fa fa-trash-o' onclick = 'borrarUsuario()'></i></th></tr>";

            }

        }

    }






}

function borrarUsuario() {
var ventas = JSON.parse(localStorage.getItem('session'));
    var venta = event.currentTarget.dataset.borrar;
    var tr = document.getElementById(venta);
	 
    var opcion = confirm("The selected sale will be deleted");
    if (opcion == true) {
          ventas.splice(venta, 1);

    localStorage.setItem('session', JSON.stringify(ventas));

    tr.style.display = 'none';

    tablaDeVentas();
	}

    


  
}


function editarVenta() {


    var ventas = JSON.parse(localStorage.getItem('session'));
    var venta = event.currentTarget.dataset.editar;
    var tr = document.getElementById(venta);

    $("#producto").val(ventas[venta].producto);
    $("#quantity").val(ventas[venta].quantity);
    $("#telefono").val(ventas[venta].code);
    $("#botonAgregar").click();
    $("#botonGuardar").css("display", "none");
    $("#botonEditar").css("display", "block");
    sessionStorage.setItem("ventaEditado", venta);


}

function confirmarEdicion() {



    validarProducto();

    var OK = sessionStorage.getItem("OK");

    if (OK == "ok") {
        var index = sessionStorage.getItem("ventaEditado");


        validarProducto()

        var venta = new Object();
        venta.producto = $("#producto").val();
        venta.quantity = $("#quantity").val();
        venta.code = $("#code").val();

        var ventas = JSON.parse(localStorage.getItem('session'));


        ventas.splice(index, 1, venta);

        localStorage.setItem('session', JSON.stringify(ventas));


        tablaDeVentas();




    }

}

function paginarTabla() {


	document.getElementById("pagination").style.visibility = "visible";

    var bodyTable = document.getElementById('tableBody');

    bodyTable.innerHTML = "";

    var table = JSON.parse(localStorage.getItem('session'));

    var currentPage = 1;

    var totalPages = Math.ceil(table.length / 5);

    var paginatedTable = table.slice(0, 4);

    document.getElementById("pagNum").innerHTML = currentPage;

    document.getElementById("totalPag").innerHTML = totalPages;

    document.getElementById("prevPag").disabled = true;

    for (var i = 0; i <= paginatedTable.length; i++) {


        bodyTable.innerHTML += "<tr id=" + i + "><th>" + (i + 1) + "</th><th>" + table[i].producto + "</th><th>" + table[i].quantity + "</th><th>" + table[i].code + "</th><th><i data-editar=" + i + " id='pencil' class='fa fa-pencil-square-o' onclick = 'editarUsuario()'></i></th><th><i data-borrar=" + i + " id='trash' class='fa fa-trash-o' onclick = 'borrarUsuario()'></i></th></tr>";

    }


}





function nextPage(){


	var table = JSON.parse(localStorage.getItem('session'));
	var totalPages = Math.ceil(table.length / 5);

	 var currentPage =  document.getElementById("pagNum").innerHTML;
	

if ( currentPage < totalPages){

	document.getElementById("prevPag").disabled = false;

		 var inicio = (currentPage) * 5;
	     var final =  inicio + 5;


	   var bodyTable = document.getElementById('tableBody');

    bodyTable.innerHTML = "";
var paginatedTable = table.slice(inicio, final);

	      currentPage ++

	 document.getElementById("pagNum").innerHTML = currentPage;


 
    for (var i = 0; i <= paginatedTable.length; i++) {


        bodyTable.innerHTML += "<tr id=" + i + "><th>" + ((final + i) - 4) + "</th><th>" + paginatedTable[i].nombre + "</th><th>" + paginatedTable[i].edad + " años" + "</th><th>" + paginatedTable[i].sexo + "</th><th>" + paginatedTable[i].mail + "</th><th><i data-editar=" + i + " id='pencil' class='fa fa-pencil-square-o' onclick = 'editarUsuario()'></i></th><th><i data-borrar=" + i + " id='trash' class='fa fa-trash-o' onclick = 'borrarUsuario()'></i></th></tr>";

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

		 var ventas = (currentPage) * 5;
	var final = ventas - 5;
	var inicio = final - 5 ;
	


	   var bodyTable = document.getElementById('tableBody')

    bodyTable.innerHTML = "";


var paginatedTable = table.slice(inicio, final);



	      currentPage --;

	 document.getElementById("pagNum").innerHTML = currentPage;


 
    for (var i = 0; i <= paginatedTable.length; i++) {


        bodyTable.innerHTML += "<tr id=" + i + "><th>" + ((final - 4) + i) + "</th><th>" + paginatedTable[i].nombre + "</th><th>" + paginatedTable[i].edad + " años" + "</th><th>" + paginatedTable[i].sexo + "</th><th>" + paginatedTable[i].mail + "</th><th><i data-editar=" + i + " id='pencil' class='fa fa-pencil-square-o' onclick = 'editarUsuario()'></i></th><th><i data-borrar=" + i + " id='trash' class='fa fa-trash-o' onclick = 'borrarUsuario()'></i></th></tr>";

    }





}else{

	document.getElementById("nextPag").disabled = false;

}
	 
	 
	 	

}



function limpiarForm() {

    $("#producto").val("");
    $("#quantity").val("");
    $("#code").val("");

}