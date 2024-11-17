function procesarReserva() {
    const nombre = document.getElementById('nombre').value;
    const fechaEntrada = document.getElementById('fechaEntrada').value;
    const fechaSalida = document.getElementById('fechaSalida').value;
    const tipoHabitacion = document.getElementById('tipoHabitacion').value;

    if (!nombre || !fechaEntrada || !fechaSalida || !tipoHabitacion) {
        document.getElementById('resultado').textContent = 'Por favor, completa todos los campos.';
        return;
    }

    const reserva = {
        nombre: nombre,
        fechaEntrada: fechaEntrada,
        fechaSalida: fechaSalida,
        tipoHabitacion: tipoHabitacion
    };

    // Mostrar mensaje mientras se envía la solicitud
    document.getElementById('resultado').textContent = 'Enviando la reserva...';

    // Enviar la reserva al servidor con fetch
    fetch('https://servidor-html.onrender.com/reservar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(reserva)
    })
    .then(response => response.json()) // Procesar la respuesta JSON del servidor
    .then(data => {
        if (data.message) {
            // Si la reserva fue exitosa
            document.getElementById('resultado').textContent = 
                `Reserva confirmada para ${reserva.nombre}. Habitación: ${reserva.tipoHabitacion}, 
                 del ${reserva.fechaEntrada} al ${reserva.fechaSalida}.`;
        } else {
            // Si hubo un error en la reserva
            document.getElementById('resultado').textContent = 
                `Hubo un error en la reserva: ${data.error}`;
        }
    })
    .catch(error => {
        // En caso de error de conexión con el servidor
        document.getElementById('resultado').textContent = 
            `Error en la conexión con el servidor: ${error}`;
    });
}
