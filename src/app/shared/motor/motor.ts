import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
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
  termoBusca: string = ''

  constructor(private service: Service, private cdr: ChangeDetectorRef){ }

  async dadosGrid(){
    this.dataGrid = await this.service.dadosGrid(this.tabela, this.termoBusca, this.colunas)
  }

  async incluirRegistro(){
    let data = await this.service.codigoRegistro(this.tabela)

    this.dataRow = data
    this.telaRegistro = true
    this.cdr.detectChanges()
  }
  
  async salvarRegistro(){
    let data = await this.service.salvarRegistro(this.tabela, this.dataRow)

    alert(data.mensagem)
  }
}
