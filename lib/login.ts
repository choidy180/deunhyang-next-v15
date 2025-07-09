import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "./firebase"

export const loginWithEmail = async (email: string, password:string) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        console.log('로그인 성공: ', user);
    } catch(error:any) {
        console.error('로그인 실패: ', error.message);
        throw error;
    }
}