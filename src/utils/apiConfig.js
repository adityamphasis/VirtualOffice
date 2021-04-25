
const BASE_URL = 'https://online.bharti-axalife.com/';

const PATH = 'MiscServices/'

// const MCUSTOMER_URL = 'https://bharti-axa-auth-qa.qa3.tothenew.net/api/v1/auth/externalLogin'; //AQ3
// const MCUSTOMER_URL = 'https://tpfrdk01sc.execute-api.ap-south-1.amazonaws.com/public/api/v1/auth/externalLogin'; //DEV
// const MCUSTOMER_URL = 'https://id2hs3de2e.execute-api.ap-south-1.amazonaws.com/uat/api/v1/auth/externalLogin'; //UAT
const MCUSTOMER_URL = 'https://sidlce25m2.execute-api.ap-south-1.amazonaws.com/public/api/v1/auth/externalLogin'; //PROD

const I_SERVICE_URL = 'https://online.bharti-axalife.com/BAL_DSS_PREPROD/Login.aspx?VO=1';
const SUPPORT_RAISE_TICKET = 'https://bhartiaxagi.symphonysummit.com/';
const HELP_URL = 'http://d2zbgc97r2t7yn.cloudfront.net/guidlines.html';

const UAT = false;

//uat urls
// const apiConfig = {
//     TOKEN_CODE: BASE_URL + PATH + 'JWT_CheckAgentRESTServiceUAT/Service1.svc/CheckAgentCodeJWT',
//     VERSION_STATUS: BASE_URL + PATH + 'VersionControlRestServiceUAT/Service1.svc/GetVersionControlDetails',
//     VALIDATE_JWT: BASE_URL + PATH + 'JWTAgentRESTServiceNewUAT/Service1.svc/ValidateJWT',
//     I_WIN: BASE_URL + PATH + 'iwin-uat-web/api/compass-sso-wrapper/login',
//     EMPLOYEE: BASE_URL + PATH + 'DarwinHierarchyRESTServiceUAT/Service1.svc/DarwinboxHierarchyDetailsEncrypted',
//     AGENT: BASE_URL + PATH + 'AgentHierarchyRESTWebServiceUAT/Service1.svc/AgentHierarchyDetails',
// }


//prod urls
const apiConfig = {
    TOKEN_CODE: BASE_URL + PATH + 'JWTAgentRESTServiceNew/Service1.svc/CheckAgentCodeJWT',
    VERSION_STATUS: BASE_URL + PATH + 'VersionControlRestService/Service1.svc/GetVersionControlDetails',
    VALIDATE_JWT: BASE_URL + PATH + 'JWTAgentRESTServiceNew/Service1.svc/ValidateJWT',
    I_WIN: BASE_URL + PATH + 'iwin-uat-web/api/compass-sso-wrapper/login',
    EMPLOYEE: BASE_URL + PATH + 'DarwinHierarchyRESTService/Service1.svc/DarwinboxHierarchyDetailsEncrypted',
    AGENT: BASE_URL + PATH + 'AgentHierarchyRESTWebService/Service1.svc/AgentHierarchyDetails'
}

export { apiConfig, MCUSTOMER_URL, I_SERVICE_URL, SUPPORT_RAISE_TICKET, HELP_URL, UAT };