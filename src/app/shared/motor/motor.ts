import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Service } from './service';

@Component({
  selector: 'app-motor',
  imports: [CommonModule, FormsModule],
  templateUrl: './motor.html',
  styleUrl: './motor.css',
})
export class Motor implements OnInit {

  @Input() titulo: string = ''
  @Input() colunas: Array<any> = []
  @Input() formCampos: Array<any> = []
  @Input() dataRow: any = {}
  @Input() tabela: string = ''
  @Input() dataView: any = {}

  telaRegistro : boolean = false
  dialogSucesso: boolean = false
  modoConsulta : boolean = false
  modoEditando : boolean = false
  termoBusca: string = ''
  dialogMensagem: string = ''
  dataRowLimpo: any = { }
  dataViewLimpo: any = { }
  dataGrid : Array<any> = []
  
  dataLookup: Array<any> = []
  campoLookup: any = null;
  colunasLookup: any[] = [];

  @ViewChild('dialog') dialogRef!: ElementRef<HTMLDialogElement>;
  @ViewChild('lookup') lookup!: ElementRef<HTMLDialogElement>;

  constructor(private service: Service, private cdr: ChangeDetectorRef){ }

  ngOnInit(): void {
    this.dataRowLimpo = { ... this.dataRow}
    this.dataViewLimpo = { ... this.dataView}
  }

  async dadosGrid(){
    this.dataGrid = await this.service.dadosGrid(this.tabela, this.termoBusca, this.colunas)
    this.cdr.detectChanges()
  }

  async incluirRegistro(){
    let data = await this.service.codigoRegistro(this.tabela)

    this.dataRow = { ...this.dataRowLimpo, ...data}
    this.dataView = { ... this.dataViewLimpo }
    this.telaRegistro = true
    this.modoConsulta = false
    this.cdr.detectChanges()
  }
  
  async salvarRegistro(){
    let data = await this.service.salvarRegistro(this.tabela, this.dataRow)

    this.dialogSucesso = data.sucesso
    this.dialogMensagem = data.mensagem
    this.dialogRef.nativeElement.showModal()

    if(data.sucesso){
      this.dadosGrid()
      this.telaRegistro = false
    }

    this.cdr.detectChanges()
  }

  async consultarRegistro(){
    let data = await this.service.consultarRegistro(this.tabela, this.dataRow['ID_' + this.tabela])

    this.dataRow = data

    for(let campo of this.formCampos){
      if(campo.tipo == 'lookup'){
        let item = this.dataLookup.find(item => item[campo.nome] == this.dataRow[campo.nome])
        this.dataView[campo.lookup.display] = item[campo.lookup.display]
      }
    }

    this.telaRegistro = true
    this.modoConsulta = true
    
    this.cdr.detectChanges()
  }

  async alterarRegistro(){
    let data = await this.service.consultarRegistro(this.tabela, this.dataRow['ID_' + this.tabela])

    this.dataRow = data
    this.telaRegistro = true
    this.modoEditando = true

    this.cdr.detectChanges()
  }

  async salvarAlteracao(){
    let data = await this.service.alterarRegistro(this.tabela, this.dataRow)

    this.dialogSucesso = data.sucesso
    this.dialogMensagem = data.mensagem
    this.dialogRef.nativeElement.showModal()

    if(data.sucesso){
      this.cancelarRegistro()
      this.dadosGrid()
    }

    this.cdr.detectChanges()
  }

  async deletarRegistro() {
    if (!confirm('Tem certeza que deseja excluir este registro?')) {
        return;
    }

    let data = await this.service.excluirRegistro(this.tabela, this.dataRow['ID_' + this.tabela]);

    this.dialogSucesso = data.sucesso;
    this.dialogMensagem = data.mensagem;
    this.dialogRef.nativeElement.showModal();

    if (data.sucesso){
      this.dadosGrid()
      this.dataRow = this.dataRowLimpo
      this.cancelarRegistro()
    }

    this.cdr.detectChanges();
  }

  cancelarRegistro(){
    this.dataRow = { ['ID_' + this.tabela]: this.dataRow['ID_' + this.tabela], ... this.dataRowLimpo, }
    this.telaRegistro = false
    this.modoConsulta = false
    this.modoEditando = false
    this.dataView = this.dataViewLimpo
    this.cdr.detectChanges()
  }

  fecharDialog(){
    this.dialogSucesso = false
    this.dialogMensagem = ''
    this.dialogRef.nativeElement.close()
  }

  async abrirLookup(campo: any) {
    this.campoLookup = campo;
    this.colunasLookup = campo.lookup.colunas;

    let colunas = campo.lookup.colunas.map((c: any) => c.field);

    this.dataLookup = await this.service.consultarLookup(campo.lookup.tabela, colunas);

    console.log(this.dataView)


    this.cdr.detectChanges()
    this.lookup.nativeElement.showModal();
  }

  selecionarLookup(row: any) {
    this.dataRow[this.campoLookup.nome] = row[this.campoLookup.nome];
    this.dataView[this.campoLookup.lookup.display] = row[this.campoLookup.lookup.display];

    console.log(this.dataView)

    this.cdr.detectChanges()
    this.fecharModalLookup();
  }

  fecharModalLookup() {
    this.lookup.nativeElement.close();
  }
}

export interface IColunaGrid {
  field: string;
  header: string;
  width: string;
}

export interface IFormCampo {
  nome: string;
  label: string;
  tipo: 'text' | 'number' | 'checkbox' | 'lookup' | 'textarea' | 'select';
  required: boolean;
  width: string;
  
  // Opcional: Já deixando preparado para quando você for criar selects/combobox genéricos
  opcoes?: { label: string, value: any }[];
  lookup?:{
    tabela: string;
    colunas: IColunaGrid[];
    display: string;
  }
}


