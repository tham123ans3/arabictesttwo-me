import { getAuth } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc, deleteDoc, updateDoc } from "firebase/firestore";
import { setActiveFirebase, getActiveFirebase, getActiveDb } from './FirebaseEmail';

class FirebaseAccessLayer {
    static async create(collection, id, data) {
        try {
            const db = getActiveDb();
            await setDoc(doc(db, collection, id), data);
            return { success: true };
        } catch (error) {
            return { success: false, error };
        }
    }

    static async read(collection, id) {
        try {
            const db = getActiveDb();
            const document = doc(db, collection, id);
            const documentData = await getDoc(document);

            if (documentData.exists()) {
                return { success: true, data: documentData.data() };
            } else {
                return { success: false, error: "Document does not exist" };
            }
        } catch (error) {
            return { success: false, error };
        }
    }

    static async update(collection, id, data) {
        try {
            const db = getActiveDb();
            const document = doc(db, collection, id);
            await updateDoc(document, data);
            return { success: true };
        } catch (error) {
            return { success: false, error };
        }
    }

    static async delete(collection, id) {
        try {
            const db = getActiveDb();
            await deleteDoc(doc(db, collection, id));
            return { success: true };
        } catch (error) {
            return { success: false, error };
        }
    }
}

export default FirebaseAccessLayer;