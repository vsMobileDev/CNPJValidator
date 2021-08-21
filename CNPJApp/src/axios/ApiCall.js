import Axios from 'axios'

export function APICall(cnpjString,callback){
    console.log(cnpjString)
    Axios.get(`https://public.fluxoresultados.com.br/v1/cnpj/${cnpjString}`).then((response)=>{
        callback(response.data)
    })
    .catch(function (error) {
        // handle error
        console.log(JSON.stringify(error.response));
      })
}