import {StyleSheet, Text,View, TouchableOpacity,ImageBackground, Image,StatusBar,Keyboard,Platform,NativeModules,BackHandler} from 'react-native';
import React, { PropTypes } from 'react'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen';

import { getConfiguration , setConfiguration} from '../../utils/configuration';
 import { authorize, refresh, revoke, prefetchConfiguration } from 'react-native-app-auth';
 import { Page, Button, ButtonContainer, Form, FormLabel, FormValue, Heading } from '../../../components';
 import axios from 'react-native-axios';
 import CryptoJS from "react-native-crypto-js";
 import Buffer from 'buffer';
//import { decrypt } from '@reactspring/-cihper';

//var Aes = NativeModules.Aes



const algorithm = 'aes-256-cbc';
const password = '4AE0FcDXwLyy'; 
const salt = '$!rl@$b!'; 
const iv = 'e675f725e675f725';


  const config = {
    issuer: 'https://accounts.bharti-axalife.com',
    //clientId: 'Bj4ppdGozkaf4fOTeYameOExlfIa',
    clientId: '7Io_iFf5oiq3P2KjUqXbStKmKpYa',
    redirectUrl: 'com.bhartiaxa.virtualoffice://oauth',
    scopes: ['openid'],
    serviceConfiguration: {
      authorizationEndpoint: 'https://accounts.bharti-axalife.com/oauth2/authorize',
      tokenEndpoint: 'https://accounts.bharti-axalife.com/oauth2/token',
     // revocationEndpoint: 'https://demo.identityserver.io/connect/revoke'Bj
    }
  };


  



 //const generateKey = (password, salt, cost, length) => Aes.pbkdf2(password, salt, cost, length)
 
// const encryptData = (text, key) => {
//     return Aes.randomKey(256).then(iv => {
//         return Aes.encrypt(text, key, iv).then(cipher => ({
//             cipher,
//             iv,
//         }))
//     })
// }

// const encryptDataIV = (text, key, iv) => {
//   return Aes.encrypt(text, key, iv).then((cipher) => ({
//     cipher,
//     iv,
//   }))      
// }

// const decryptData = (encryptedData, key) => 
// {
//   return Aes.decrypt(encryptedData, key).then((decryptText) => ({
//     decryptText

//   }))
// }
 
//const decryptData = (encryptedData, key) => Aes.decrypt(encryptedData.cipher, key, encryptedData.iv)

//const decryptData = (encryptedData, key) => Aes.decrypt(encryptedData.cipher, key, encryptedData.iv)
 
// try {
//     generateKey('4AE0FcDXwLyy', '$!rl@$b!', 65536, 256).then(key => {
//         console.log('Key:', key)

    //   let params ={
    //     'Platform':'Android',
    //     'PartnerKey':'VC18APP02SER'
    // }

//         encryptData(JSON.stringify(params), key)
//             .then(({ cipher, iv }) => {
//                 console.log('Encrypted:', cipher)
 
//                 decryptData({ cipher, iv }, key)
//                     .then(text => {
//                         console.log('Decrypted:', text)
//                     })
//                     .catch(error => {
//                         console.log(error)
//                     })
 
//                 // Aes.hmac256(cipher, key).then(hash => {
//                 //     console.log('HMAC', hash)
//                 // })
//             })
//             .catch(error => {
//                 console.log(error)
//             })
//     })
// } catch (e) {
//     console.error(e)
// }

  


export default class Splash extends React.Component  {
       constructor(props) {
      super(props);
      this.state = {
        token: '',
        partnerKey: '',
      
      };

      const { navigation } = props;

 // this.didFocusListener = navigation.addListener(
 //   'didFocus',
 //   this.componentDidFocus,
 // );

}


  componentDidMount() {
    this.getData()
    //this.ShowAlertWithDelay();
   // this.JWTTokenValidation();

   // this.JWTTokenValidation();
 
   //this.AESKey()

//    let encr = "0N8i5mV248eTflXzyhQQqOYYi4PgOa18c1iptmMa99KMELXpNZQKtsJc50T2yqT52XmdUb7Vj/oySQTO2g9wRKlXS/yyDSi/efNT2eYV4wpHBWGWvaXp0Emldg87tItvTJn2cf4mMLYoyxqzeewBheU1nVjwMIcHp3+vNSZuSr4/ajLsSZgM0WPiGessdW4FaTjUwQU9YVtCk/D8PyqtFsYjeCV+gTkkjIel2mUeNFcjYqo/CcR1XHxJrz0i1PP8EP57bcM8CVDgtV5bRixnyqOQjBWxOqGvSJGTl4FXm7X6q4Xx7vsziLGV0UaljoJBhy4QeCJWyAu41iS/47H7nMnOITurYiqKG5zcJxfI2KYAXR0UQ7Ylvq7heUWufbPig1yWRCNjjyBBA2DEi+W9lRHtyI8OlLac8sNo3n1xS2JSS2uPNBG0CQX+gRsCB53eqmsGQD0wMDG2yQCNlnE7csQmM95YPzzxkcbQGt+/84MbO0fOmGNXJsdkVanqTdKVC5WCe3UXKhkhCS+o0hwEiFpT6KCe/KJFEvP/UirH9znC8qwnjH/e4niS4SYXhGHX0L1v+xnn1trSN1uHeIFQohWodgcZOXbdBNx14UkPGpL1fICP/JoBv9T3IxZV+z2jOul7XEJlCR+cAUnIqqWJJdzRltU26GFg77Az5gco1BXFWnmtEQuxz4XaBl4cAbUxQKVo5y8zZPLQhhJ2QlOAD9IyW891ORYoTKtgkfjqXHU="
// encr="0N8i5mV248eTflXzyhQQqOYYi4PgOa18c1iptmMa99KMELXpNZQKtsJc50T2yqT52XmdUb7Vj/oySQTO2g9wRKlXS/yyDSi/efNT2eYV4wpHBWGWvaXp0Emldg87tItvTJn2cf4mMLYoyxqzeewBheU1nVjwMIcHp3+vNSZuSr4/ajLsSZgM0WPiGessdW4FaTjUwQU9YVtCk/D8PyqtFsYjeCV+gTkkjIel2mUeNFcjYqo/CcR1XHxJrz0i1PP8EP57bcM8CVDgtV5bRixnyqOQjBWxOqGvSJGTl4FXm7X6q4Xx7vsziLGV0UaljoJBhy4QeCJWyAu41iS/47H7nMnOITurYiqKG5zcJxfI2KYAXR0UQ7Ylvq7heUWufbPig1yWRCNjjyBBA2DEi+W9lRHtyI8OlLac8sNo3n1xS2JSS2uPNBG0CQX+gRsCB53eF6Ls0W74iYPVCReoSXL4blGUryMsrr3LFJIKweV+L1VwQ0JSnE3EGqBqm+jXuQLoa/90hijMUs1bSRT80EE0VknHTrbdybmyGzUR2fGdofpUtpGaSTnNlfVJ01+ylRlT6lcdRRcc14kGiYjIEIqcoOPA2rrPuyPuKNPfgw6HeoYShfmcFfnLCVEGnGNG08woY7rFFYuGCw0coD72I1cIQgreVk0nJ1ecFyhfztGjge8"
// console.log("dcrypted text",this.decrypt(encr));
   

 }

  componentWillUnmount() {

    
   
  }

//    decrypt(text) {
//     let encryptedText = Buffer.from(text,"base64");
//     let decipher = CryptoJS.createDecipheriv(algorithm, 
//     CryptoJS.pbkdf2Sync(Buffer.from(password,"utf-8"), Buffer.from(salt,"utf-8"), 65536, 256/8, 'sha1'),
//     Buffer.from(iv));
//     let decrypted = decipher.update(encryptedText);
//     console.log(decrypted.toString())
//     decrypted = Buffer.concat([decrypted, decipher.final()]);
//     return decrypted.toString();
//  }


  AESKey () {
    try {
      generateKey('4AE0FcDXwLyy', '$!rl@$b!', 65536, 256).then((key) => {
        //encrypt_key = key;

        console.log("fdhvbhvb",key);

        this.AESEncrypt()

      })
    } catch (e) {
        console.error(e)
    }    
  }
 
   AESEncrypt () {
    //const key = encrypt_key;

    let params = {
      "DecodeJWT":"eyJ4NXQiOiJNell4TW1Ga09HWXdNV0kwWldObU5EY3hOR1l3WW1NNFpUQTNNV0kyTkRBelpHUXpOR00wWkdSbE5qSmtPREZrWkRSaU9URmtNV0ZoTXpVMlpHVmxOZyIsImtpZCI6Ik16WXhNbUZrT0dZd01XSTBaV05tTkRjeE5HWXdZbU00WlRBM01XSTJOREF6WkdRek5HTTBaR1JsTmpKa09ERmtaRFJpT1RGa01XRmhNelUyWkdWbE5nX1JTMjU2IiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiJzYWxlczEzOTQ5MCIsImF1dCI6IkFQUExJQ0FUSU9OX1VTRVIiLCJhdWQiOiJXT24wX0tTOEtCbzhIejNYWTFla2N0bl9RdHNhIiwibmJmIjoxNjEzMTI0ODM0LCJhenAiOiJXT24wX0tTOEtCbzhIejNYWTFla2N0bl9RdHNhIiwic2NvcGUiOiJvcGVuaWQiLCJpc3MiOiJodHRwczpcL1wvbG9jYWxob3N0Ojk0NDNcL29hdXRoMlwvdG9rZW4iLCJleHAiOjE2MTMxMjg0MzQsImlhdCI6MTYxMzEyNDgzNCwianRpIjoiZjdkNjAyNjMtZTljMS00ZjlkLWIzYzEtN2EzNTMzZTQ2Njg2In0.pFcc6f4cMJopwTiAUaMTQIkjqgS6TB3hPQq03Bjv-1gcmIOEOJx4aTC-w50Tm0c_8KBSvjfY8I9Jyg2YEygSh2rN8QalGpv333d3BiDOabLcsbMMFXLdNK8T8cQjmW_ICX2XXQ5sggRebbxpOW9fmE5idxpNAAjx_y2_CQ_Zz4I6gOe1yn0nlfzXSjw0Ptd_-U7VSwCjIde3VxVwwEtqTc91LjLhRn5_ORvm4FP1yxc7jECkB6_rw3zHOseUgs8o-EIbqt7jB02zauA4Bw0ccySrDMphXz5jQMPlkhJHtH_YdD2Q-p_snu216UG8eFtI7H0HuHmySUXUy1i2VbHQHQ","PartnerKey":"JWT12SER02"
  }
 
    try {
      encryptDataIV(JSON.stringify(params), 'b3d1c086cbe693fc9e5739aa5e91f0ef6d798e2e9890c4d53c660db698d15fac', 'e675f725e675f725').then(({ cipher, iv }) => {

    console.log("data after encrypt",cipher);

    this.AESDecrypt()

        // encrypt_iv = iv;
        // encrypt_string = cipher;
      }).catch((error) => {})
    } catch (e) {
        console.error(e)
    }
  }
  
  //data after encrypt pJtF2/6y6E0Rdre+IH4nALE84Qu1LK0yh11AgsijRgdviFPT2hh+4TiizCPALijmPcSHknkYPRXbTBGRbmMsBA== e675f725e675f725
   async AESDecrypt () {
    const key = 'b3d1c086cbe693fc9e5739aa5e91f0ef6d798e2e9890c4d53c660db698d15fac';
    const iv = 'e675f725e675f725';
    const cipher = "0N8i5mV248eTflXzyhQQqOYYi4PgOa18c1iptmMa99KMELXpNZQKtsJc50T2yqT52XmdUb7Vj/oySQTO2g9wRKlXS/yyDSi/efNT2eYV4wpHBWGWvaXp0Emldg87tItvTJn2cf4mMLYoyxqzeewBheU1nVjwMIcHp3+vNSZuSr4/ajLsSZgM0WPiGessdW4FaTjUwQU9YVtCk/D8PyqtFsYjeCV+gTkkjIel2mUeNFcjYqo/CcR1XHxJrz0i1PP8EP57bcM8CVDgtV5bRixnyqOQjBWxOqGvSJGTl4FXm7X6q4Xx7vsziLGV0UaljoJBhy4QeCJWyAu41iS/47H7nMnOITurYiqKG5zcJxfI2KYAXR0UQ7Ylvq7heUWufbPig1yWRCNjjyBBA2DEi+W9lRHtyI8OlLac8sNo3n1xS2JSS2uPNBG0CQX+gRsCB53eF6Ls0W74iYPVCReoSXL4blGUryMsrr3LFJIKweV+L1VwQ0JSnE3EGqBqm+jXuQLoa/90hijMUs1bSRT80EE0VknHTrbdybmyGzUR2fGdofpUtpGaSTnNlfVJ01+ylRlT6lcdRRcc14kGiYjIEIqcoOPA2rrPuyPuKNPfgw6HeoYShfmcFfnLCVEGnGNG08woY7rFFYuGCw0coD72I1cIQgreVk0nJ1ecFyhfztGjge8";
 
    try {
      var decrypt_string = await decryptData({ cipher, iv }, key);
 
      console.log ("plain text :ewtetytry " + decrypt_string);
    } catch (e) {
        console.error(e)
    }
  }
//  componentWillMount(){
//   // this.getData()

//   //this.asyncDecrypt('0N8i5mV248eTflXzyhQQqOYYi4PgOa18c1iptmMa99KMELXpNZQKtsJc50T2yqT52XmdUb7Vj/oySQTO2g9wRKlXS/yyDSi/efNT2eYV4wpHBWGWvaXp0Emldg87tItvTJn2cf4mMLYoyxqzeewBheU1nVjwMIcHp3+vNSZuSr4/ajLsSZgM0WPiGessdW4FaTjUwQU9YVtCk/D8PyqtFsYjeCV+gTkkjIel2mUeNFcjYqo/CcR1XHxJrz0i1PP8EP57bcM8CVDgtV5bRixnyqOQjBWxOqGvSJGTl4FXm7X6q4Xx7vsziLGV0UaljoJBhy4QeCJWyAu41iS/47H7nMnOITurYiqKG5zcJxfI2KYAXR0UQ7Ylvq7heUWufbPig1yWRCNjjyBBA2DEi+W9lRHtyI8OlLac8sNo3n1xS2JSS2uPNBG0CQX+gRsCB53eUQu73LCcYPeAk0BgsgW8P8ZUS2NyD40baYXsfiuL5o92TagQ02kQeIlZkH1jS7o+mtcLMRsZaPITBkbraYq/6h+ZDjbxnq3xItXmBQw+e3kNulcjqOmuoY7N06D22ZP3/1rkLYBxdCBiHPAdfwQZ0B0b9hy3B98+LPndTu2NYrgKWrs3VhLrguGM/Wng7AwS/lJKcKIvXBIsQRfw/4uI4QMbufffehBTMi4mlGpfB3c=','e675f725e675f725','6c0ce6669b01b8e918f786f466be6968e70025c573a42753b7efb13cd89d6e5a')

//   }

//   async  asyncDecrypt(cipher, key, iv) {
//     try {
//         var text = await decryptData({ cipher, iv }, key)
//         console.log("fdgfvxhbhfbjn",text)
//         return text
//     } catch (e) {
//         console.error("sfdhvb",e)
//     }
// }
    
  
 
  getData = async () => {
    try {
      const result = await authorize(config);
     
      console.log("zbhvhxbcbn",result.accessToken)

      //alert('Alert',result.response)

     // this.checkAuthoken(result.accessToken)
     setConfiguration('token', result.accessToken);
     
     this.props.navigation.navigate('SideMenu',{accessToken:result.accessToken})
      
    } 
    catch (error) {
      console.log(error);
    }
     };

     checkAuthoken(token) {
 
         this.props.checkToken(token)
           .then(() => this.aftervalidating())
         .catch(e => this.showAlert(e.message, 300));
 
       }
 
      aftervalidating() {
     console.log("isBusy value --- ",this.props.isBusy);
     console.log("response value --- ",this.props.response);


     t
 
     
   }

   showAlert(message, duration) {
    //  setTimeout(() => this.setState({ autoLogin: false }), 2000);
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      alert(message);
    }, duration);
  }
 

  JWTTokenValidation = () =>
{

  let url = "https://online.bharti-axalife.com/MiscServices/JWTAgentRESTService/Service1.svc/ValidateJWT"

  // let params ={
  //   'DecodeJWT':'',
  //   'PartnerKey':''
  // }

  let encParams = {

    "request":" wZ41JrpUFxYN657xEboMROidcqi+SuudbDsP9Co2zeTjD6u1YHmdD5IYFReAL4vHAmty0BZVSxyiprqQbcNjZhS0ybG6D1HCTz7tU1CpN/ownifuNlThzFDgG9EHnXcUt5V4F76t4qcoBI6jkyKb37zgt5zRMWg51nECtBXVoYgYV35mYYCPNz8UK+JIjQRdB5trVjZblvfCj1ru4++DxGzr7KF3BY6KVnTAhuObg45O4fjdDQFsAtnG86IG9fMC9MEc+v8bNy1M3al+QmBfmRvYaavleXjbzJNpAS+bVLF0wZgD8SnaqfUFXwJxlgvoy7D7DpscCWonWZMQdKvZO66I/XQXt1fa5rHhfKy38qzki/g8o/GraaRRKjnq6xXxth5KKhG3ZM32PbMEvbYGvhPCSK0ZUb16Y60pdA98eK8qmpSlgm93XvisN/TDojkWRBq9MJKlczwOGocsWY8ih5VPKirjXGUaEEje8GmLKRmQ49OJtQYJUHuujDlblxSMHhHylyaiYUaI4wuhVQPGrqTrbw/2w9wRH/w3SQlcErsXNUOvcMWgPYiQwoQBl7kuhbTdhoEfFY95FNh1n7QQOtViCUIzhorCHKdNLTzbjuNYeiPWFtWl4G17tBz6EwxA"

};
  //console.log("vdgfhhg", decryptData(response.CheckAgentCodeJWTResult,key,salt));

  axios.post(url, encParams,{
    "headers": {

      "content-type": "application/json",
      
      },
    })
    .then(function(response) {
      console.log("vdgf42253465656hhg",response);
    //let decResponse = decryptData("rT/lgzM78o/24AyqFmdOF3/PeVhs6Exj0gXuU6LbWEPyWbe7cbfqZj3YbrmbqV+OQz5deQp4CLj2efcjM/jLyHe2wBSLaS3HVJYT8fj7us/2xOqjJWsDwRwZObUofyUJriGmFXwTtrNolsTW4h4VOWffql3OecJsdELEaSF/I1POKXi2MmEtZKA63glc7MctDg5ApcmpZuKLKKVqxB0YdZ9D6/7/wYDUZJ/MFlLiA23ywwkTdeKnbYeI0kJ0mjFN",'6c0ce6669b01b8e918f786f466be6968e70025c573a42753b7efb13cd89d6e5a','$!rl@$b!')
    //console.log("vdgfhhg",decResponse);
    
    })
    
    .catch(function(error) {
    
    console.log("cvzgvxbhvb",error);
    
    });
    
    
}

checkJwtToken = () =>
{

//   <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/">
//    <soapenv:Header/>
//    <soapenv:Body>
//       <tem:CheckAgentCodeJWT>
//          <!--Optional:-->
//          <tem:request>LwxtRjw9brRKKRgOiXyKUgCZj7a6NEchDOVtTrtDsRjdEM84sxK6/zWMymmwKKiiD8URnPsH9SIHQ1Sl9gFCUhMKu8EJdGUt6U92oFGNrzmFSGVgajvu4OqrF8SBCWWJGj56hIrrleHgtQjZf3VqJ7/4rt7rUY8/ZGv33ccxV/WwPhN06uyefW+wWUHQ5sKHstZf2mSi+8iS87pYm0KTC02ZbWderNtRvR7Rn73rSxEYh0SoimTLfJ3didD2gY6hAXCunVcGA+d7Q6q+Kd7/LUlnCyP0FGonPc7dFEmYzUO4O4nU+H+2NBZM0c2S8DewbvlY5TGJG1WfO2CIdu5h9wfaUXAhBW0NDKb6hE1C6/gdoTj5bOCtQN92K1TfZkjUveDvAvcK3WNqXa6AnjS2aqgCU14U/YYPADhnI2zGOYeCWPRitEfWXuP3b5gYKNwXacB8aI58vma1Hhy9caLFGJknpf/rQIiePeUWbOGqgV0bAtomj18ks6Wbi3yaCknz/tGbov4izs70bKSftxFi6qnzl880NvEeApr2o3mJ/YnudwQoUpyyLEWwQ+Rbj4A8VLM/WE1LCOQ9dO0z7wN+hk2OYUgASrE7RUSjfuDI62GlRRtf3ny78/0x71oexk6oVgVc8+hRa+YbigjPv1hC3idYAdUBCFGrZ213eX4VAzBz+jXurkyNmYcEQ1wUQTX3QxNyrC+228AcN9cw5u9E4tzo5f1xshTGpskhk3r+KrFopjBKJBxGAILm8CHrhYO7mdDzEBxeSen9OrxBSszAqVfpZ3dDXhdCwKNsoQUooaPyERP8mR4h32feO6JPghG9rTLAO8rkGa64pVq4n5CuP+oMz5USoyZnhuWOFmWA8yE58lGlJwjAUsazPZMRzZh84H0wPrG1mwxEPQXMPBFUHgzhjFhb1w4KPj+xtKMZ9k8/lx9Lv+4bUKmg5FW40btyAMK2WEDNHtMo9rvfZTd0Px7tUJzktF1o6S8qWRwhnLYqeoIvKy+ApMnvNQWC9G7SBjHs2jHd64m4ulMV9h/teKSTkdvfoVD7IEmvQDwleRC4E8E5igXvjN3wuVE5DEzIe+1ciBjYLE4035BGABDwkxMv3IXaKVeGQctKmCi5pH56Y1AGAJE3e7k25dHGtqN2l7pocoDWbDjgMYJhF84xL1BFQ8bot1Gz9yj/yGfJusJfQa9njiuKa2djRE43fofIMsZWfRA9C9LPs2UNz+uIXgZgfVn1ss14KQ0oUz5s/MwS1dTSL0J0aSDlZKdG0IBNPWk2T8+MTBW3A9+LJ5oUIuAIZ0gpm6bn+4x4ezU8naRHzjH6Bt4yon4QBzuXw/sGQkh/L7ayfziSjlqqpgSyybwysX8KtLVARsffQW1WzW8uEK7K2zk+PWbgDt8qDxLv</tem:request>
//       </tem:CheckAgentCodeJWT>
//    </soapenv:Body>
// </soapenv:Envelope>
  let xmls='<?xml version="1.0" encoding="UTF-8"?><soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"\
                            xmlns:tem="http://tempuri.org/">\
            <soapenv:Header/>\
            <soapenv:Body>\
            <tem:CheckAgentCodeJWT>\
            <tem:request>LwxtRjw9brRKKRgOiXyKUgCZj7a6NEchDOVtTrtDsRjdEM84sxK6/zWMymmwKKiiD8URnPsH9SIHQ1Sl9gFCUhMKu8EJdGUt6U92oFGNrzmFSGVgajvu4OqrF8SBCWWJGj56hIrrleHgtQjZf3VqJ7/4rt7rUY8/ZGv33ccxV/WwPhN06uyefW+wWUHQ5sKHstZf2mSi+8iS87pYm0KTC02ZbWderNtRvR7Rn73rSxEYh0SoimTLfJ3didD2gY6hAXCunVcGA+d7Q6q+Kd7/LUlnCyP0FGonPc7dFEmYzUO4O4nU+H+2NBZM0c2S8DewbvlY5TGJG1WfO2CIdu5h9wfaUXAhBW0NDKb6hE1C6/gdoTj5bOCtQN92K1TfZkjUveDvAvcK3WNqXa6AnjS2aqgCU14U/YYPADhnI2zGOYeCWPRitEfWXuP3b5gYKNwXacB8aI58vma1Hhy9caLFGJknpf/rQIiePeUWbOGqgV0bAtomj18ks6Wbi3yaCknz/tGbov4izs70bKSftxFi6qnzl880NvEeApr2o3mJ/YnudwQoUpyyLEWwQ+Rbj4A8VLM/WE1LCOQ9dO0z7wN+hk2OYUgASrE7RUSjfuDI62GlRRtf3ny78/0x71oexk6oVgVc8+hRa+YbigjPv1hC3idYAdUBCFGrZ213eX4VAzBz+jXurkyNmYcEQ1wUQTX3QxNyrC+228AcN9cw5u9E4tzo5f1xshTGpskhk3r+KrFopjBKJBxGAILm8CHrhYO7mdDzEBxeSen9OrxBSszAqVfpZ3dDXhdCwKNsoQUooaPyERP8mR4h32feO6JPghG9rTLAO8rkGa64pVq4n5CuP+oMz5USoyZnhuWOFmWA8yE58lGlJwjAUsazPZMRzZh84H0wPrG1mwxEPQXMPBFUHgzhjFhb1w4KPj+xtKMZ9k8/lx9Lv+4bUKmg5FW40btyAMK2WEDNHtMo9rvfZTd0Px7tUJzktF1o6S8qWRwhnLYqeoIvKy+ApMnvNQWC9G7SBjHs2jHd64m4ulMV9h/teKSTkdvfoVD7IEmvQDwleRC4E8E5igXvjN3wuVE5DEzIe+1ciBjYLE4035BGABDwkxMv3IXaKVeGQctKmCi5pH56Y1AGAJE3e7k25dHGtqN2l7pocoDWbDjgMYJhF84xL1BFQ8bot1Gz9yj/yGfJusJfQa9njiuKa2djRE43fofIMsZWfRA9C9LPs2UNz+uIXgZgfVn1ss14KQ0oUz5s/MwS1dTSL0J0aSDlZKdG0IBNPWk2T8+MTBW3A9+LJ5oUIuAIZ0gpm6bn+4x4ezU8naRHzjH6Bt4yon4QBzuXw/sGQkh/L7ayfziSjlqqpgSyybwysX8KtLVARsffQW1WzW8uEK7K2zk+PWbgDt8qDxLv</tem:request>            \
            </tem:CheckAgentCodeJWT>\
            </soapenv:Body>\
          </soapenv:Envelope>';

          console.log('gzdbvcmnv',xmls)

axios.post('http://online.bharti-axalife.com/MiscServices/JWTCheckAgentCodeService/Service1.svc?wsdl',
           xmls,
           {headers:
             {'Content-Type': 'text/xml'}
           }).then(res=>{

            alert('result success')
             console.log("asdxfcgvhn",res);
           }).catch(err=>{
             alert(err)
             console.log(err)
            
            });
}




         

  render() {
      return (

        <Page>
    <View style={{
         backgroundColor: 'transparent',
         width:  wp('100%'),
         height: hp('15%'),
         marginTop:0,
         justifyContent: 'center',
         alignItems: 'center'
        }}>
        <Image resizeMode="stretch"  style= {{ top:0, left: 0, right:0, bottom:0, width: '100%', height: '100%', backgroundColor: 'transparent'}}
                   source = {require('../../../assets/spalsh_logo.png')}
                />

              <Text style={styles.welocmeText}> Welcome to </Text>
      </View>
      
      <ImageBackground  resizeMode="contain" source={require('../../../assets/splash_img3.png')} style={{
         backgroundColor: 'transparent',
         width:  wp('100%'),
         height: hp('85%'),
         marginTop:40,
         
        }}>
        <Image resizeMode="center"  style= {{ alignSelf:'center', width: '40%', height: '40%', backgroundColor: 'transparent'}}
                   source = {require('../../../assets/splash_img2.png')}
                />

              
      </ImageBackground>
    </Page>

   );
  }


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },

     searchTextInput: {
           height: wp('10.33%'),

           paddingHorizontal: 5,
           backgroundColor: 'transparent',
           borderColor: 'gray',
           width: '100%',
           borderRadius: 0,
           fontSize: wp('4%'),

         },
     tileIcon:{
     width: wp('8%'),
     height: wp('10.33%'),
     marginLeft: 10
   },

   tile:{
    backgroundColor: 'white',
    width: 'auto',
    height: wp('16%'),
    marginTop: wp('8%'),
    marginHorizontal: wp('5.33%'),
    alignItems: 'center',
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderColor: '#818e97'
   },
       touchableForgotPassword:{
      backgroundColor: 'transparent',
      position: 'absolute',
      right: 0,
      height: 30


       },
      welocmeText:{
       color: 'black',
       fontSize:25,
       top:20
    //   fontFamily: "CharlieDisplay-Regular"
      },
      forgotTile:{
       backgroundColor: 'transparent',
       width: 'auto',
       height: 40,
       marginTop: 10,
       marginHorizontal: 20,
       alignItems: 'center',
      flexDirection: 'row',
       borderBottomWidth: 0,
       borderColor: '#818e97'
      },
     arrowTile: {
        backgroundColor: 'transparent',
        height: wp('15%'),
        marginTop: wp('7.5%'),
        marginHorizontal: wp('5.33%'),
        flexDirection: 'row',
        borderWidth: 0,
        borderColor: 'blue'
     },
        socialBtnContainer:{
         backgroundColor: 'transparent',
         width: 'auto',
         height: 50,
         marginTop: wp('4%'),
         alignItems: 'center',
         justifyContent: 'center',
        flexDirection: 'row'
      },
      lowerView:{
       backgroundColor: 'white',
       width: wp('100%'),
       height: 'auto',
       justifyContent: 'center',
       marginTop: 0
     },
     headingBG:{
       marginTop: wp('4.8%'),
       width: '90%',
       height: 'auto',
       backgroundColor: 'transparent',
       justifyContent: 'center',
       alignItems: 'center',
       flexDirection: 'row',
      marginHorizontal:'5%'
     },
      arrowIcon:{
      width: wp('10%'),
      height: wp('10%')

    },
       touchableArrow:{
         backgroundColor: '#00B8FB',
         position: 'absolute',
         right: 0,
         bottom: 0,
         height: wp('15%'),
         width: wp('90%'),
         borderRadius: wp('2%'),
         justifyContent: 'center',
         alignItems: 'center'
       },
       signUpTile:{
         position: 'absolute',
         height: wp('10.46%'),
         width: '100%',
         justifyContent: 'center',
         alignItems:'center',
         backgroundColor: 'transparent',
         left: 0,
         bottom: wp('10.33%'),
         flexDirection: 'row'
       }
});
