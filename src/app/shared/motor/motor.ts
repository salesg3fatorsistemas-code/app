import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../../services/login-service';
import { Service } from './service';

@Component({
  selector: 'app-motor',
  imports: [CommonModule, FormsModule],
  templateUrl: './motor.html',
  styleUrl: './motor.css',
})
export class Motor {

  @Input() titulo: string = ''
  @Input() colunas: Array<any> = []
  @Input() dataGrid: Array<any> = []
  @Input() formCampos: Array<any> = []
  @Input() dataRow: any = {}
  @Input() tabela: string = ''

  telaRegistro : boolean = false

  constructor(
    private sessao: LoginService  ,
    private service: Service
  ){ }

  async incluirRegistro(){
    let data = await this.service.codigoRegistro(this.tabela)
    this.telaRegistro = true
  }
  
  salvarRegistro(){
    
  }
}
