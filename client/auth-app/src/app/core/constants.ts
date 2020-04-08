import { AuthSvcVer } from './models/auth-svc-ver.enum';

export class Constants {
    // Auth service version -> v1: angular-oauth2-oidc | v2: oidc-client based
    public static authSvcVer: AuthSvcVer = AuthSvcVer.V1; 
    
    private static realmName = 'corpauth';
    public static webRoot = 'http://localhost:4200';
    public static idmRoot = 'http://localhost:8080';
    public static authUrl = `${Constants.idmRoot}/auth/realms/${Constants.realmName}`;
    public static redirectV1Uri = `${Constants.webRoot}/todos`;
    public static redirectV2Uri = `${Constants.webRoot}/signin`;
    public static signoutV2Uri = `${Constants.webRoot}/signout`;
    public static userInfoEpUri = `${Constants.authUrl}/protocol/openid-connect/userinfo`;
    public static clientId = 'spa-todos';
    public static scope = 'openid profile email roles';
    public static responseType = 'code'; // CodeFlow + PKCE
}
