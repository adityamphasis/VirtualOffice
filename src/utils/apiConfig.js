
const UAT = false;

const UAT_BASE_URL = 'https://online.bharti-axalife.com/';
const AWS_BASE_URL = 'https://online.bhartiaxa.com/';
const PATH = 'MiscServices/'

// aws urls
const BASE_URL = UAT ? UAT_BASE_URL : AWS_BASE_URL;

const AQ_MCUSTOMER_URL = 'https://bharti-axa-auth-qa.qa3.tothenew.net/api/v1/auth/externalLogin'; //AQ3
const DEV_MCUSTOMER_URL = 'https://tpfrdk01sc.execute-api.ap-south-1.amazonaws.com/public/api/v1/auth/externalLogin'; //DEV
const UAT_MCUSTOMER_URL = 'https://id2hs3de2e.execute-api.ap-south-1.amazonaws.com/uat/api/v1/auth/externalLogin'; //UAT
const PROD_MCUSTOMER_URL = 'https://sidlce25m2.execute-api.ap-south-1.amazonaws.com/public/api/v1/auth/externalLogin'; //PROD
const AWS_MCUSTOMER_URL = 'https://sidlce25m2.execute-api.ap-south-1.amazonaws.com/public/api/v1/auth/externalLogin'; //PROD

const MCUSTOMER_URL = UAT ? DEV_MCUSTOMER_URL : AWS_MCUSTOMER_URL;

const I_SERVICE_URL = 'https://online.bharti-axalife.com/BAL_DSS_PREPROD/Login.aspx?VO=1';
const SUPPORT_RAISE_TICKET = 'https://bhartiaxagi.symphonysummit.com/';
const HELP_URL = 'http://d2zbgc97r2t7yn.cloudfront.net/guidlines.html';


//uat urls
const UAT_Urls = {
    SSO_BASE: 'https://uat-accounts.bharti-axalife.com',
    SSO_CLIENT_ID: 'JPVBwQeFbq4NvcHG6VPJ6jHQ9K0a',
    // SSO_CLIENT_ID: '7Io_iFf5oiq3P2KjUqXbStKmKpYa',
    TOKEN_CODE: BASE_URL + PATH + 'JWT_CheckAgentRESTServiceNEWUAT/Service1.svc/CheckAgentCodeJWT',
    VERSION_STATUS: BASE_URL + PATH + 'VersionControlRestServiceUAT/Service1.svc/GetVersionControlDetails',
    VALIDATE_JWT: BASE_URL + PATH + 'JWT_CheckAgentRESTServiceNewUAT/Service1.svc/ValidateJWT',
    I_WIN: BASE_URL + PATH + 'iwin-uat-web/api/compass-sso-wrapper/login',
    EMPLOYEE: BASE_URL + PATH + 'DarwinHierarchyRESTServiceUAT/Service1.svc/DarwinboxHierarchyDetailsEncrypted',
    AGENT: BASE_URL + PATH + 'AgentHierarchyRESTWebServiceUAT/Service1.svc/AgentHierarchyDetails',
    LOGOUT: BASE_URL + PATH + 'iwin-uat-web/api/compass-sso-wrapper/logout',
    LOGOUT_VYMO: BASE_URL + PATH + 'VymoSSOLogout_UAT_WebService/api/VymoSSOWrapper/logout'
}


//prod urls
// const apiConfig = {
//     SSO_BASE:'https://accounts.bharti-axalife.com',
//     SSO_CLIENT_ID:'7Io_iFf5oiq3P2KjUqXbStKmKpYa',
//     TOKEN_CODE: BASE_URL + PATH + 'JWTAgentRESTServiceNew/Service1.svc/CheckAgentCodeJWT',
//     VERSION_STATUS: BASE_URL + PATH + 'VersionControlRestService/Service1.svc/GetVersionControlDetails',
//     VALIDATE_JWT: BASE_URL + PATH + 'JWTAgentRESTServiceNew/Service1.svc/ValidateJWT',
//     I_WIN: BASE_URL + PATH + 'iwin-prod-web/api/compass-sso-wrapper/login',
//     EMPLOYEE: BASE_URL + PATH + 'DarwinHierarchyRESTService/Service1.svc/DarwinboxHierarchyDetailsEncrypted',
//     AGENT: BASE_URL + PATH + 'AgentHierarchyRESTWebService/Service1.svc/AgentHierarchyDetails',
//     LOGOUT: BASE_URL + PATH + 'iwin-prod-web/api/compass-sso-wrapper/logout'
//     LOGOUT_VYMO: BASE_URL + PATH + 'VymoSSOLogout_UAT_WebService/api/VymoSSOWrapper/logout'
// }

//aws urls
const AWS_Urls = {
    SSO_BASE: 'https://accounts.bharti-axalife.com',
    SSO_CLIENT_ID: '7Io_iFf5oiq3P2KjUqXbStKmKpYa',
    TOKEN_CODE: BASE_URL + PATH + 'JWTAgentRESTServiceNew/Service1.svc/CheckAgentCodeJWT',
    VERSION_STATUS: BASE_URL + PATH + 'VersionControlRestService/Service1.svc/GetVersionControlDetails',
    VALIDATE_JWT: BASE_URL + PATH + 'JWTAgentRESTServiceNew/Service1.svc/ValidateJWT',
    I_WIN: BASE_URL + PATH + 'iwin-prod-web/api/compass-sso-wrapper/login',
    EMPLOYEE: BASE_URL + PATH + 'DarwinHierarchyRESTService/Service1.svc/DarwinboxHierarchyDetailsEncrypted',
    AGENT: BASE_URL + PATH + 'AgentHierarchyRESTWebService/Service1.svc/AgentHierarchyDetails',
    LOGOUT: BASE_URL + PATH + 'iwin-prod-web/api/compass-sso-wrapper/logout',
    LOGOUT_VYMO: BASE_URL + PATH + 'VymoSSOLogout_PRODRESTWebService/api/VymoSSOWrapper/logout'
}

const CERTS_SHA = [
    "sha256/JSMzqOOrtyOT1kmau6zKhgT676hGgczD5VMdRMyJZFA=",
    "sha256/zTlCX9pDYzkvadzpWldHQIMtbMA9ZFzGVXeoCsVymq4=",
    "sha256/++MBgDH5WGvL9Bcn5Be30cRcL0f5O+NyoXuWtQdX1aI=",
    "sha256/47DEQpj8HBSa+/TImW+5JCeuQeRkm5NMpJWZG3hSuFU=",
    //for uat
    "sha256/5kJvNEMw0KjrCAu7eXY5HZdvyCS13BbA0VJG1RSP91w=",
    "sha256/zFfoFtZn7Ym1omSjLdmxv/OeXrFGveTv+r8ksRuvoLk=",
    "sha256/r/mIkG3eEpVdm+u/ko/cwxzOMo1bk4TyHIlByibiA5E="
]

const apiConfig = UAT ? UAT_Urls : AWS_Urls;

export { apiConfig, MCUSTOMER_URL, I_SERVICE_URL, SUPPORT_RAISE_TICKET, HELP_URL, UAT, CERTS_SHA };