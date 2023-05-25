import {useState, useEffect} from "react";
import {getAuth, onAuthStateChanged} from 'firebase/auth';

// interface UserState {
//     user: User|null,
//     isLoading: Boolean;
// }

const useUser = () => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(getAuth(), user => {
            setUser(user);
            setIsLoading(false);
        });

        return unsubscribe;
    }, []);

    console.log(`returning user: ${user} and isLoading: ${isLoading}`);
    return { user, isLoading };
}

export default useUser;