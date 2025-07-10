import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "./firebase"
import { toast } from "react-toastify";

export const loginWithEmail = async (email: string, password:string) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log(123);
        const user = userCredential.user;
        toast.success('로그인 성공! 🎉');
    } catch (error: any) {
        if (error.code === 'auth/user-not-found') {
            toast.error('해당 이메일로 등록된 사용자가 없습니다.');
        } else if (error.code === 'auth/wrong-password') {
            toast.error('비밀번호가 틀렸습니다.');
        } else {
            toast.error('로그인에 실패했습니다.');
        }
    }
}