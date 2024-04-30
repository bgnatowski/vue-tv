import {ref} from "vue";

const minutes = ref(12345)
function minutesToText(minutes) {
    let days = Math.floor(minutes / (60 * 24));
    let hours = Math.floor((minutes % (60 * 24)) / 60);
    let restMinutes = minutes % 60;

    let text = [];

    if (days > 0) {
        text.push(days === 1 ? `${days} dzień` : `${days} dni`);
    }
    if (hours > 0 || days > 0) { // Dodajemy "0h" jeśli są dni, ale nie ma godzin
        text.push(`${hours} h`);
    }
    if (restMinutes > 0 || (!days && !hours)) { // Dodajemy minuty jeśli są lub gdy dni i godziny wynoszą zero
        text.push(`${restMinutes} min`);
    }

    return text.join(' ');
}

export default minutesToText