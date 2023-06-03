// Call the dataTables jQuery plugin
$(document).ready(function() {
    cargarUsuarios()
  $('#usuarios').DataTable();
});


async function cargarUsuarios(){


  const request = await fetch('api/usuarios', {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  });
  const usuarios = await request.json();

//console.log(usuarios);

    let listadoHtml = '';
    for (let usuario of usuarios){
        let botonEliminar = '<a href="#" onclick="eliminarusuario('+usuario.id+')"class="btn btn-danger btn-circle btn-sm"><i class="fas fa-trash"></i></a'
        let telefono = usuario.telefono == null ? '-': usuario.telefono;
    let usuarioHtml = '<tr><td>' +usuario.id+ '</td><td>'+usuario.nombre+' '+usuario.apellido+'</td><td>'+usuario.email+'</td><td>'+usuario.telefono+'</td><td>'+botonEliminar+'></td></tr>';

    listadoHtml += usuarioHtml;
    }

  document.querySelector('#usuarios tbody').outerHTML = listadoHtml;
}

async function eliminarUsuario(Id){

if (!confirm('¿Desea eliminar este usuario?')) {
    return;
  }

  const request = await fetch('api/usuarios' + id, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  });
  location.reload()
}