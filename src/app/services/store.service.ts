import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../utils/firebase.config";

export default async function UploadImage(file: File, nameFolder: string): Promise<string | null> {
    try {
        if (!file) return null;
        const storageRef = ref(storage, `${nameFolder}/` + file.name);
        const snapshot = await uploadBytes(storageRef, file);
        const url = await getDownloadURL(snapshot.ref);
        return url;
    } catch (error) {
        console.log(error);
        return null;
    }
}
