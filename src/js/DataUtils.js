
const formatGenres = (genres) => {
    if(!genres.length){
        return 'Brak informacji'
    }
    return genres.map((genre) => genre.name).join(", ");
}

const formatSearchGenres = (genres) => {
    if(!genres.length){
        return 'Brak informacji'
    }
    return genres.join(", ");
}


export {formatGenres, formatSearchGenres}