import {useState, useEffect} from "react";
import {getAuth, onAuthStateChanged} from 'firebase/auth';
import { User } from "firebase/auth";

interface UserState {
    user: User|null,
    isLoading: Boolean;
}
let unsubscribe;

function useUser () {
    const [user, setUser] = useState<User|null>(null);
    const [isLoading, setIsLoading] = useState(true);

    unsubscribe = useEffect(() => {
        const unsubscribe = onAuthStateChanged(getAuth(), user => {
            setUser(user as User);
            setIsLoading(false);
        })

        return unsubscribe;
    }, []);

    console.log(`returning user: ${user} and isLoading: ${isLoading}`);
    return { user, isLoading } as const;
};

export default useUser;