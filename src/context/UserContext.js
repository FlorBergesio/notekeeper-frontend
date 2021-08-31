import { createContext, useMemo, useState } from 'react';

const defaultValue = { name: null };

export const UserContext = createContext(defaultValue);

export const UserContextProvider = ( { children } ) => {
    const [ user, setUser ] = useState( defaultValue );

    const value = useMemo( () => ({
        user,
        setUser,
    }), [ user ]);

    return (
        <UserContext.Provider value={ value } >
            { children }
        </UserContext.Provider>
    );
};
