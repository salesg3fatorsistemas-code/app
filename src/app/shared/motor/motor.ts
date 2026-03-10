import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, ElementRef, Input, ViewChild } from '@angular/core';
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
  dialogSucesso: boolean = false
  termoBusca: string = ''
  dialogMensagem: string = ''

  @ViewChild('dialog') dialogRef!: ElementRef<HTMLDialogElement>;

  constructor(private service: Service, private cdr: ChangeDetectorRef){ }

  async dadosGrid(){
    this.dataGrid = await this.service.dadosGrid(this.tabela, this.termoBusca, this.colunas)
    this.cdr.detectChanges()
  }

  async incluirRegistro(){
    let data = await this.service.codigoRegistro(this.tabela)

    this.dataRow = data
    this.telaRegistro = true
    this.cdr.detectChanges()
  }
  
  async salvarRegistro(){
    let data = await this.service.salvarRegistro(this.tabela, this.dataRow)

    this.dialogSucesso = data.sucesso
    this.dialogMensagem = data.mensagem
    this.dialogRef.nativeElement.showModal()

    if(data.sucesso){
      this.telaRegistro = false
    }

    this.cdr.detectChanges()
  }

  async consultarRegistro(){
    let data = await this.service.consultarRegistro(this.tabela, this.dataRow['ID_' + this.tabela])

    console.log(data)

    this.dataRow = data
    this.telaRegistro = true

    this.cdr.detectChanges()
  }

  fecharDialog(){
    this.dialogSucesso = false
    this.dialogMensagem = ''
    this.dialogRef.nativeElement.close()
  }
}
