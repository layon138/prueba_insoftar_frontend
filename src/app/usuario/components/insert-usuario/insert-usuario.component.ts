import { Component, EventEmitter, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Usuario } from '../../interfaces/usuario';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-insert-usuario',
  templateUrl: './insert-usuario.component.html',
  styleUrls: ['./insert-usuario.component.css']
})
export class InsertUsuarioComponent implements OnInit {

  public myform: FormGroup
  public validation_messages = {
    nombre: [
      { type: 'required', message: 'Falta informacion.' },
      { type: 'maxlength', message: 'Maximo 25 caracteres' },
    ],
    apellido: [
      { type: 'required', message: 'Falta informacion.' },
      { type: 'maxlength', message: 'Maximo 25 caracteres' },
    ],
    cedula: [
      { type: 'required', message: 'Falta informacion.' },
      { type: 'minlength', message: 'Minimo 7 caracteres' },
      { type: 'maxlength', message: 'Maximo 13 caracteres' },
      { type: 'pattern', message: 'No es numerico.' }
    ],
    correo: [
      { type: 'required', message: 'Falta informacion.' },
      { type: 'pattern', message: 'No es un correo valido.' }
    ],
    telefono: [
      { type: 'required', message: 'Falta informacion.' },
      { type: 'minlength', message: 'Son 12 caracteres' },
      { type: 'maxlength', message: 'Son 12 caracteres' },
      { type: 'pattern', message: 'No es numerico.' }
    ]
  }
  public operacion:string="Insertar"
  constructor(private messageService: MessageService, public formbuilder: FormBuilder, private usur_servicio: UsuarioService) {
    this.myform = this.formbuilder.group({
      nombre: new FormControl('', [
        Validators.required,
        Validators.maxLength(25)
      ]),
      apellido: new FormControl('', [
        Validators.required,
        Validators.maxLength(25)
      ]),
      cedula: new FormControl('', [
        Validators.required,
        Validators.pattern("^[0-9]*$"),
        Validators.minLength(7),
        Validators.maxLength(13)
      ]),
      telefono: new FormControl('', [
        Validators.required,
        Validators.pattern("^[0-9]*$"),
        Validators.minLength(10),
        Validators.maxLength(11)
      ]),
      correo: new FormControl('', [
        Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
      ]),
    });
  }

  ngOnInit(): void {
    
  }

  asingar_usaurio() {
    console.log("cambio")
    this.operacion="Editar"
    this.myform.get('nombre').setValue(this.usur_servicio.usuario_editar.nombres)
    this.myform.get('apellido').setValue(this.usur_servicio.usuario_editar.apellidos)
    this.myform.get('cedula').setValue(this.usur_servicio.usuario_editar.cedula)
    this.myform.get('telefono').setValue(this.usur_servicio.usuario_editar.telefono)
    this.myform.get('correo').setValue(this.usur_servicio.usuario_editar.email)
  }

  showSuccess(mensaje: string) {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: mensaje });
  }


  showError(error: string) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: error });
  }

  insertar(usuarioinsertar: Usuario) {
    this.usur_servicio.insertar_usuarios(usuarioinsertar).subscribe((val) => {
      if (val.codigo === 1) {
        this.showSuccess(val.mensaje)
        this.usur_servicio.consultar_usuarios().subscribe((val) => {
          this.usur_servicio.lista_usuarios = val
          this.limpiar_form()
        }
        )
      } else {
        this.showError(val.mensaje)
      }
    }
    )
  }

  limpiar_form(){
    this.usur_servicio.editar_usuario=false
    this.operacion="Insertar"
    this.myform.get('nombre').setValue('')
    this.myform.get('apellido').setValue('')
    this.myform.get('cedula').setValue('')
    this.myform.get('telefono').setValue('')
    this.myform.get('correo').setValue('')
  }

  editar(usuarioinsertar: Usuario) {
    usuarioinsertar.id=this.usur_servicio.usuario_editar.id
    console.log(usuarioinsertar)
    this.usur_servicio.editar_usuarios(usuarioinsertar).subscribe((val) => {
      if (val.codigo === 1) {
        this.showSuccess(val.mensaje)
        this.usur_servicio.consultar_usuarios().subscribe((val) => {
          this.usur_servicio.lista_usuarios = val
          this.usur_servicio.editar_usuario=false
          this.limpiar_form()
        }
        )
      } else {
        this.showError(val.mensaje)
      }
    }
    )
  }


  guardar_cuenta() {
    console.log("entro")
    if (this.myform.valid) {
      let usuarioinsertar: Usuario = {
        apellidos: this.myform.get('apellido').value,
        nombres: this.myform.get('nombre').value,
        cedula: this.myform.get('cedula').value,
        telefono: this.myform.get('telefono').value,
        email: this.myform.get('correo').value,
      }
      console.log(usuarioinsertar)
      if (this.usur_servicio.editar_usuario) {
        this.editar(usuarioinsertar)
      } else {
        this.insertar(usuarioinsertar)
      }

    } else {
      this.showError("formulario incompleto")
    }
  }

}
