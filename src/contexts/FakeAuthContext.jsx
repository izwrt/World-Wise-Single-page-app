import { createContext, useContext, useReducer } from "react";

const AuthContext = createContext();

const intialState = {
    user: null,
    isAutheniticated: false,
}

function reducer(state,action) {
    switch(action.type) {
        case 'loading':
            return {...state, user: action.payload, isAutheniticated: true}

        case 'logout':
            return {...state, user: null, isAutheniticated: false}
        
        default:
            throw new Error("Unknow action")
    }
}

const FAKE_USER = {
    name: "Jack",
    email: "jack@example.com",
    password: "qwerty",
    avatar: "https://i.pravatar.cc/100?u=zz",
}; 

function AuthProvider({children}) {

    const [{user,isAutheniticated},dispatch] = useReducer(reducer,intialState)

    function login(email, password) {
        if (email === FAKE_USER.email && password === FAKE_USER.password ) {
            dispatch({type:"login",payload: FAKE_USER})
        }
    }

    function logout(){
        dispatch({type: "logout", payload: null})
    }

    return (
        <AuthContext.provider values = {{user,isAutheniticated,login,logout}}>
        {children}
        </AuthContext.provider>
    );
}

function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined){
        throw new Error("AuthContext was used outside AuthProvider");
    }
    return context;
}

export {AuthProvider,useAuth}