import { create } from 'zustand';
import { User } from '../global/types';

const initialUser: User = {
    id: 0,
    username: 'Guest',
    role: 'Guest',
};
interface AppSoreType{
    currentUser: User | null;
    setCurrentUser: (user: User | null) => void;
    logout: () => void;
}
export const useAppStore = create < AppSoreType>(( set ) => ({
    currentUser: initialUser,
    setCurrentUser: (user) => set({ currentUser: user }),
    logout: () => set({currentUser: initialUser}),
}))