import jwt_decode from "jwt-decode";

export function getAccessToken(){
  return localStorage.getItem('token')     
}

export function getDecoded(){
  if(getAccessToken()){
    let token_decoded = jwt_decode(getAccessToken()) 
    return token_decoded
  }else
    return null
}

export function getUser(){
  let decoded = getDecoded()
  if(decoded == null)
    return null
  else{
    let user = decoded.nombre_usuario
    return user
  }
}

export function quitSession(){
  return localStorage.removeItem('token')
}