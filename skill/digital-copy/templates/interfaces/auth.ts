export type TokenPair = {
    accessToken:string;
    refreshToken:string;
}

// what the api client needs from the store to renew an expired access token
export type AuthHandlers = {
    getAccessToken:()=>string;
    getRefreshToken:()=>string;
    saveTokens:(tokens:TokenPair)=>void;
    signOut:()=>void;
}
