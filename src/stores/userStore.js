import {defineStore} from "pinia";

export const useUserStore = defineStore('userStore', {
    id: 'userStore',
    state: () => ({
        _currentUsername: localStorage.getItem('username') ?? null,
        _currentEmail: localStorage.getItem('email') ?? null
    }),
    getters: {
        currentUsername: state => state._currentUsername,
        currentEmail: state => state._currentEmail,
    },
    actions: {
        setUser(username, email) {
           this._currentUsername = username;
           this._currentEmail = email;
        },
        logout() {
            this._currentUsername = null;
            this._currentEmail = null;
        },
        hasStoredUser(){
            console.log(this._currentUsername, " return: ", this._currentUsername == null);
            return this._currentUsername == null;
        }
    }
});