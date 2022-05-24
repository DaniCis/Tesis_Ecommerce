import jwt_decode from "jwt-decode"
import { v4 as uuidv4 } from 'uuid'

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
  const id = uuidv4()
    const exp = Date.now() + (3600 * 1000 * 24)
    if(!localStorage.getItem('ID')){
      localStorage.setItem('ID',id)
      localStorage.setItem('ID_exp',exp)
    }
  return localStorage.removeItem('token')
}