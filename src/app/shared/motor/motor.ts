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

  telaRegistro : boolean = false
  dialogSucesso: boolean = false
  modoConsulta : boolean = false
  modoEditando : boolean = false
  termoBusca: string = ''
  dialogMensagem: string = ''
  dataRowLimpo: any = { }
  dataGrid : Array<any> = []

  @ViewChild('dialog') dialogRef!: ElementRef<HTMLDialogElement>;

  constructor(private service: Service, private cdr: ChangeDetectorRef){ }

  ngOnInit(): void {
    this.dataRowLimpo = { ... this.dataRow}
  }

  async dadosGrid(){
    this.dataGrid = await this.service.dadosGrid(this.tabela, this.termoBusca, this.colunas)
    this.cdr.detectChanges()
  }

  async incluirRegistro(){
    let data = await this.service.codigoRegistro(this.tabela)

    this.dataRow = { ...this.dataRowLimpo, ...data}
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
    this.cdr.detectChanges()
  }

  fecharDialog(){
    this.dialogSucesso = false
    this.dialogMensagem = ''
    this.dialogRef.nativeElement.close()
  }



  // Referência para a modal no HTML
  @ViewChild('dialogLookup') dialogLookupRef!: ElementRef<HTMLDialogElement>;

  // Variáveis de estado exclusivas para a Modal de Lookup
  dadosGridLookup: any[] = [];
  colunasGridLookupAtuais: any[] = [];
  campoLookupAtual: any = null;

  async abrirModalLookup(campo: any) {
    this.campoLookupAtual = campo;
    this.colunasGridLookupAtuais = campo.lookup.colunas;

    const colunasParaApi = campo.lookup.colunas.map((c: any) => c.field);

    // Chama o serviço que você já criou
    this.dadosGridLookup = await this.service.consultarLookup(campo.lookup.tabela, colunasParaApi);

    this.cdr.detectChanges()
    this.dialogLookupRef.nativeElement.showModal();
  }

  selecionarRegistroLookup(linhaClicada: any) {
    // 1. Alimenta o ID real no dataRow (Ex: ID_CATEGORIA = 5)
    this.dataRow[this.campoLookupAtual.nome] = linhaClicada[this.campoLookupAtual.nome];
    
    // 2. Alimenta a descrição no displayField (Ex: NM_CATEGORIA = 'Eletrônicos')
    this.dataRow[this.campoLookupAtual.lookup.display] = linhaClicada[this.campoLookupAtual.lookup.display];

    this.cdr.detectChanges()
    this.fecharModalLookup();
  }

  fecharModalLookup() {
    this.dadosGridLookup = [];
    this.dialogLookupRef.nativeElement.close();
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


