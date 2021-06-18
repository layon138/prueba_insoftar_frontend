import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Usuario } from '../../interfaces/usuario';
import { UsuarioService } from '../../services/usuario.service';
import { InsertUsuarioComponent } from '../insert-usuario/insert-usuario.component';

@Component({
  selector: 'app-lista-usuario',
  templateUrl: './lista-usuario.component.html',
  styleUrls: ['./lista-usuario.component.css']
})
export class ListaUsuarioComponent implements OnInit {

  @Input() com1ref:InsertUsuarioComponent;
  constructor(public usur_servicio:UsuarioService) { }

  ngOnInit(): void {
    this.consultar_usuarios()
  }

  consultar_usuarios(){
    this.usur_servicio.consultar_usuarios().subscribe((val)=>{
      console.log(val)
      this.usur_servicio.lista_usuarios=val
    }
    )
  }

  Editar_usuario(usuario:Usuario){
    console.log(usuario)
    
    this.usur_servicio.editar_usuario=true
    this.usur_servicio.usuario_editar=usuario
   this.com1ref.asingar_usaurio()
  
  }
}
