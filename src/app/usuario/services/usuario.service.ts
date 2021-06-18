import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { respuesta } from '../interfaces/respuesta';
import { Usuario } from '../interfaces/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  protected url="http://localhost:8090/"
  public lista_usuarios:Usuario[]=[]
  public editar_usuario=false
  public usuario_editar:Usuario=null
  constructor(private http:HttpClient) {

  }

  consultar_usuarios(){
    return this.http.get<Usuario[]>('usuarios/getall')
  }
  

  insertar_usuarios(usuario_insertar:Usuario){
    return this.http.post<respuesta>('usuarios/insert',usuario_insertar)
  }

  editar_usuarios(usuario_editar:Usuario){
    return this.http.post<respuesta>('usuarios/edit',usuario_editar)
  }

}
