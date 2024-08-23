document.addEventListener('DOMContentLoaded', () => {
    // Función para cargar los turnos del día
    function cargarTurnos() {
        fetch('/api/turnos')
            .then(response => response.json())
            .then(data => {
                // Procesar los datos y actualizar la vista
                console.log(data);
            })
            .catch(error => console.error('Error:', error));
    }

    // Función para agregar un nuevo turno
    document.getElementById('agregar-turno').addEventListener('click', () => {
        // Mostrar un formulario para agregar el turno
        // Validar y enviar la solicitud para agregar el turno
    });

    // Llamar a la función para cargar los turnos al iniciar
    cargarTurnos();
});