function agregarCalificacion() {
    const container = document.getElementById('calificacionesContainer');
    const index = container.children.length;

    const calificacionDiv = document.createElement('div');
    calificacionDiv.classList.add('calificacion');

    calificacionDiv.innerHTML = `
        <label>Calificación ${index + 1}:</label>
        <input type="number" id="peso${index}" placeholder="Peso (%)" required>
        <input type="number" id="maximo${index}" placeholder="Máximo puntaje compañeros" required>
        <input type="number" id="calificacion${index}" placeholder="Tu puntaje" required>
    `;

    container.appendChild(calificacionDiv);
}

document.getElementById('promedioForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const calificaciones = [];
    const pesos = [];
    const maximos = [];

    const numCalificaciones = document.getElementById('calificacionesContainer').children.length;

    for (let i = 0; i < numCalificaciones; i++) {
        const peso = parseFloat(document.getElementById(`peso${i}`).value);
        const maximo = parseFloat(document.getElementById(`maximo${i}`).value);
        const calificacion = parseFloat(document.getElementById(`calificacion${i}`).value);

        pesos.push(peso / 100);
        maximos.push(maximo);
        calificaciones.push(calificacion);
    }

    const promedio = calcularPromedio(calificaciones, pesos, maximos);
    document.getElementById('resultado').innerText = `El promedio ponderado final es: ${promedio.toFixed(2)}`;
});

function calcularPromedio(calificaciones, pesos, maximos) {
    let sumaPonderada = 0;
    const totalPesos = pesos.reduce((a, b) => a + b, 0);

    for (let i = 0; i < calificaciones.length; i++) {
        const porcentaje = calificaciones[i] / maximos[i];
        sumaPonderada += porcentaje * pesos[i];
    }

    const promedio = (sumaPonderada / totalPesos) * 10;
    return promedio;
}
