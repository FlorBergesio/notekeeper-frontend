import { createContext, useMemo, useState } from 'react';

const defaultValue = {
    _id: null,
    name: null,
};

export const NotebookContext = createContext(defaultValue);

export const NotebookContextProvider = ( { children } ) => {
    const [ notebook, setNotebook ] = useState( defaultValue );

    const value = useMemo( () => ({
        notebook,
        setNotebook,
    }), [ notebook ]);

    console.log(notebook);

    return (
        <NotebookContext.Provider value={ value } >
            { children }
        </NotebookContext.Provider>
    );
};
