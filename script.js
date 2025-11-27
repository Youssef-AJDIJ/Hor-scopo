import { horoscopos } from './horoscopo.js';


const boton = document.getElementById('boton');
const resultado = document.getElementById('resultado');


console.log(horoscopos['aries'].mesInicio);
console.log(horoscopos['aries'].mesFin);




boton.addEventListener('click', function () {
    let fecha = document.getElementById('fecha');
    fecha = new Date(fecha.value);

    // console.log(fecha);
    const dia = fecha.getDate();
    const mes = fecha.getMonth() + 1;
    const año = fecha.getFullYear();

    // obtener el dia, mes y año de la fecha
    if (fecha.toString() === "Invalid Date") {
        resultado.textContent = 'Debes seleccionar una fecha';
        return;
    }

    let horoscopo = '';
    for (const [key, value] of Object.entries(horoscopos)) {
        // Caso normal: el signo no cruza el año
        if (value.mesInicio <= value.mesFin) {
            if ((mes === value.mesInicio && dia >= value.diaInicio) ||
                (mes === value.mesFin && dia <= value.diaFin) ||
                (mes > value.mesInicio && mes < value.mesFin)) {
                horoscopo = key;
                console.log(horoscopo);
                break;
            }
        }
        // Caso especial: el signo cruza el año (ej: Capricornio)
        else {
            if ((mes === value.mesInicio && dia >= value.diaInicio) ||
                (mes === value.mesFin && dia <= value.diaFin)) {
                horoscopo = key;
                console.log(horoscopo);
                break;
            }
        }
    }

    // Añadir animación al resultado
    resultado.classList.remove('show');

    if (horoscopo === '') {
        resultado.textContent = '❌ No se pudo determinar el signo';
    } else {
        resultado.textContent = '✨ Tu signo es: ' + horoscopo.charAt(0).toUpperCase() + horoscopo.slice(1) + ' ✨';
    }

    // Activar animación
    setTimeout(() => {
        resultado.classList.add('show');
    }, 10);
})