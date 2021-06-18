import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-page-usuario',
  templateUrl: './page-usuario.component.html',
  styleUrls: ['./page-usuario.component.css']
})
export class PageUsuarioComponent implements OnInit {

  public editar_usuario=false
  constructor(public usur_servicio:UsuarioService) { }

  ngOnInit(): void {
  }

}
