import app from 'firebase/compat/app';
import {
        createUserWithEmailAndPassword,
        getAuth,
        updateProfile,
        signInWithEmailAndPassword,
        signOut} from 'firebase/auth';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
import firebaseConfig from "./config";

class Firebase {
    constructor() {
        if(!app.apps.length) {
            app.initializeApp(firebaseConfig);  
        }              
        this.auth = app.auth(); 
        this.db = app.firestore();
        this.storage = app.storage();
    }
    async registrar(nombre, email, password) {
        const nuevoUsuario = await createUserWithEmailAndPassword(this.auth, email, password);

        return await updateProfile(nuevoUsuario.user, {
            displayName: nombre
        });
    }
    async login(email, password) {
        return signInWithEmailAndPassword(this.auth, email, password);
    }
    async cerrarSesion() {
        signOut(this.auth);
    }
}

const firebase = new Firebase();
export default firebase;
