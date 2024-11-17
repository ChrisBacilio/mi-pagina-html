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

    document.getElementById('resultado').textContent = 
        `Reserva confirmada para ${reserva.nombre}. Habitación: ${reserva.tipoHabitacion}, 
         del ${reserva.fechaEntrada} al ${reserva.fechaSalida}.`;
}
