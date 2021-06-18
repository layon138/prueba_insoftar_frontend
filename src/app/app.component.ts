import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PrimeNGConfig } from 'primeng/api';
import { matchOtherValidator } from './validators';
interface operacion {
  name: string,
  code: number
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  public myform: FormGroup
  public validation_messages = {
    numeroa: [
      { type: 'required', message: 'Falta informacion.' },
    ],
    numerob: [
      { type: 'required', message: 'Falta informacion.' },
      { type: 'matchOther', message: 'No coinciden las contraseñas' },
    ],
    numeron: [
      { type: 'required', message: 'Falta informacion.' },
      { type: 'matchOther', message: 'los numeros A y B no puede ser mayor a N' },
    ],
    operacion: [
      { type: 'required', message: 'Falta informacion.' },
    ]
  }
  operaciones: operacion[];
  public modulo = ""
  public error_form:string=""
  constructor(public formbuilder: FormBuilder, private primengConfig: PrimeNGConfig) {
    this.operaciones = [
      { name: 'Adicion', code: 1 },
      { name: 'Sustracion', code: 2 },
      { name: 'Producto', code: 3 },
      { name: 'Division', code: 4 }
    ];
    this.myform =  this.formbuilder.group({
      numeroa: new FormControl('', [
        Validators.required,
        Validators.pattern("^[0-9]*$"),
       
      ]),
      numerob: new FormControl('', [
        Validators.required,
        Validators.pattern("^[0-9]*$"),
      ],),
      numeron: new FormControl('', [
        Validators.required,
        Validators.pattern("^[0-9]*$"),
        matchOtherValidator('numeroa','numerob')
      ],),
      operacion: new FormControl('', [
        Validators.required,
      ]),
    });
  }

  ValidateOrigin(control: AbstractControl): {[key: string]: boolean} | null {
    if (control.value < this.myform.get('numerob').value && control.value > this.myform.get('numeroa').value) {
      return { invalidOrigin: true };
    } else {
      return null;
    }
  }

  ngOnInit() {
    this.primengConfig.ripple = true;
   
  }



  //se elije que operacion se quiere realizar
  cambiar_operacion() {

    if(this.myform.valid){
      this.error_form=""
      this.modulo=""
      console.log(this.myform.get('operacion').value)
      switch (this.myform.get('operacion').value) {
        case 1:
          this.suma()
          break;
        case 2:
          this.resta()
          break;
        case 3:
          this.multiplicacion()
          break;
        case 4:
          this.division()
        break;
      }
    }else{
      this.error_form="no se a terminado el formulario"
      this.modulo=""
    }
   
  }

  suma() {
    console.log(this.myform.get('numeroa').value + this.myform.get('numerob').value)
    var valor = (Number.parseInt(this.myform.get('numeroa').value) +Number.parseInt(this.myform.get('numerob').value) ) % Number.parseInt(this.myform.get('numeron').value)
    console.log(valor)
    this.modulo = valor.toString()
  }


  resta() {
    var respuesta=0
    for (let index = 0; index < this.myform.get('numeron').value; index++) {
     if((index+Number.parseInt(this.myform.get('numerob').value))%Number.parseInt(this.myform.get('numeron').value)===Number.parseInt(this.myform.get('numeroa').value) ){
      respuesta=index
     }
    }
    console.log(respuesta)
    this.modulo = respuesta.toString()
  }

  division() {
   /* var valor = (this.numeroa.value % this.numerob.value) % this.numeron.value
    console.log(valor)
    this.modulo = valor.toString()*/
    for (let index = 0; index < this.myform.get('numeron').value; index++) {
      if((index*Number.parseInt(this.myform.get('numerob').value))%Number.parseInt(this.myform.get('numeron').value)===1) {
        var valor = (index*Number.parseInt(this.myform.get('numeroa').value) ) % Number.parseInt(this.myform.get('numeron').value)
        console.log(valor)
        this.modulo = valor.toString()
      }
     }
     if(this.modulo==""){
      this.error_form="El numero no es invertible"
     }
  }

  multiplicacion() {
    var valor = (Number.parseInt(this.myform.get('numeroa').value) *Number.parseInt(this.myform.get('numerob').value) ) % Number.parseInt(this.myform.get('numeron').value)
    console.log(valor)
    this.modulo = valor.toString()
  }

  



}