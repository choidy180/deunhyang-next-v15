import { create } from "zustand";

type Fields = {
    userId: string;              // 아이디
    userDisplayName: string;     // 이름
    userEmail: string;           // 이메일
    userPhotoURL: string;        // 사진
    userGrade: number;           // 등급
    refreshToken: string;        // 토큰
};

// 1. Fields라는 객체 타입의 필드들을 가져와서
// 2. 각 필드에 대해 "set" + 대문자 필드명 형식의 setter 메서드 이름을 자동 생성하고
// 3. 그 메서드의 타입은 해당 필드의 타입을 인자로 받아 반환값이 없는 함수로 구성

type UserState = Fields & {
    [K in keyof Fields as `set${Capitalize<string & K>}`]: (value: Fields[K]) => void;
};

export const useAuthStore = create<UserState>((set) => ({
    userId: '',
    userDisplayName: '',
    userEmail: '',
    userPhotoURL: '',
    userGrade: 0,
    refreshToken: '',
    setUserId: (userId) => set({ userId }),
    setUserDisplayName: (userDisplayName) => set({ userDisplayName }),
    setUserEmail: (userEmail) => set({ userEmail }),
    setUserPhotoURL: (userPhotoURL) => set({ userPhotoURL }),
    setUserGrade: (userGrade) => set({ userGrade }),
    setRefreshToken: (refreshToken) => set({ refreshToken }),
}))