<template>
    <div class="sidebar">
        <button class="sidebar-button">
            <img src="@/resources/home.png" alt="Strona główna"> 
            <span class="button-text">Strona główna</span>
        </button>
        <button class="sidebar-button">
            <img src="@/resources/video.png" alt="Filmy obejrzane">
            <span class="button-text">Filmy obejrzane</span>
        </button>
        <button class="sidebar-button">
            <img src="@/resources/watching-a-movie.png" alt="Filmy do obejrzenia">
            <span class="button-text">Filmy do obejrzenia</span>
        </button>
        <button class="sidebar-button">
            <img src="@/resources/friends.png" alt="Znajomi">
            <span class="button-text">Znajomi</span>
        </button>
        <button class="sidebar-button">
            <img src="@/resources/invitation.png" alt="Zaproszenia do znajomych">
            <span class="button-text">Zaproszenia do znajomych</span>
        </button>
    </div>
</template>

<style>
img {
    height: 3vh;
    margin-right: 10px;
}
.sidebar {
    height: 100%; 
    width: 100%; 
    background-color: white;
    margin-right: 5vw;
}
.sidebar-button {
    display: block;
    width: 90%;
    padding: 15px;
    margin: 0;
    border: none;
    background-color: transparent;
    color: black;
    cursor: pointer;
    transition: text-decoration 0.3s;
    display: flex;
    align-items: center;
    text-decoration: none; 
}

.sidebar-button:hover {
    text-decoration: underline; 
}

.sidebar-button i {
    margin-right: 10px;
}

.button-text {
    display: inline-block;
}

@media (max-width: 767px) {
    .button-text {
        display: none;
    }
    .sidebar {
    height: 100%; 
    width: 25px; 
    background-color: white;
    margin-right: 5vw;
}
}
</style>
