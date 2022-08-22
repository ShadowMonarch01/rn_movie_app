import React,{createContext, useState} from 'react';
// import auth from '@react-native-firebase/auth'
// import firestore from '@react-native-firebase/firestore';
// import { error } from 'react-native-gifted-chat/lib/utils';

export const AuthContext = createContext();

export const AuthProvider = ({children}) =>{
    const [user, setUser] = useState(null);
    const [status, setStatus] = useState(true);
    const [dLoad,setDload] = useState(true);
    const [admStats,setAdmStats] = useState(true);

    const [duserName,setDuserName] = useState('');
    const [dEmail,setDemail] = useState('');

    const [actType,setActType] = useState('');
    const [actDuration,setActDuration] = useState('');


    return(
        <AuthContext.Provider
            value={{
                user,
                setUser,
                status,
                setStatus,
                dLoad,
                setDload,
                admStats,
                setAdmStats,
                actType,
                setActType,
                actDuration,
                setActDuration,
                duserName,
                setDuserName,
                dEmail,
                setDemail,
                signIn: () => {
                    // setAdmStats(false)
                    // setDload(false)
                    // setDuserName('')
                    // setDemail('')
                    // setActType('')
                    // setActDuration('')
                    setStatus(true)
                  },
                signOut: () => {
                    setStatus(false)
                  },
                // login: async (email,password) =>{
                //     try{
                //         await auth().signInWithEmailAndPassword(email,password)
                        
                //     } catch(e){
                //         console.log(e);
                //     }
                // },
                // register: async (name,email, password) =>{
                //     try{
                //         await auth().createUserWithEmailAndPassword(email, password)
                //         .then(()=>{

                //             firestore().collection('users').doc(auth().currentUser.uid)
                //             .set({
                //                 name:'',
                //                 about:'',
                //                 userImage:null,
                //                 email:email,
                //                 createdAt:firestore.Timestamp.fromDate(new Date())

                //             })
                //             .catch(error =>{
                //                 console.log('Error creating user in firestore: ', error);
                //             })
                //         })

                //         .catch(error =>{
                //             console.log('something went wrong signing up: ', error);
                //         });
                //     } catch(e){
                //         console.log(e);
                //     }
                // },
                // logout: async () => {
                //     try{
                //         await auth().signOut();
                //     } catch(e){
                //         console.log(e)
                //     }
                // }

            }}
        >
            {children}
        </AuthContext.Provider>
    );
}
