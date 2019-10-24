export const setUserName = userName => {
window.sessionStorage.setItem('userName', userName );
};

export const setAuthToken = authToken => {
window.sessionStorage.setItem('authToken', authToken );
};

export const getAuthToken = () => {
const authToken = window.sessionStorage.getItem('authToken');
return authToken;
}; 


export const getUserName = () => {
const  userName  = window.sessionStorage.getItem('userName');
return userName   ;
}; 