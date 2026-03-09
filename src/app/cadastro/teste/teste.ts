import { Component } from '@angular/core';
import { Motor } from '../../shared/motor/motor';

@Component({
  selector: 'app-teste',
  imports: [Motor],
  templateUrl: './teste.html',
  styleUrl: './teste.css',
})
export class Teste {
  
  colunasGrid = [
    {header: 'Código', field: "CD_TESTE", width: "20%" },
    {header: 'Nome', field: "NM_TESTE", width: "60%"},
    {header: 'Ativo', field: "SN_ATIVO", width: "20%" },
  ]

  dataGrid = [
    {CD_TESTE: '1', NM_TESTE: 'Testando 1', SN_ATIVO: 'Sim'},
    {CD_TESTE: '2', NM_TESTE: 'Testando 2', SN_ATIVO: 'Não'},
  ]

  formCampos = [
    {width: '8rem', nome: 'CD_TESTE:', label:'Código', tipo: 'text'},
    {width: '40rem', nome: 'NM_TESTE', label:'Nome:', tipo: 'text'},
    {width: '12rem', nome: 'SN_ATIVO:', label:'Ativo:', tipo: 'select', opcoes: [{value: 'S', label: 'Sim'}, {value: 'N', label: 'Não'}]}
  ]

  dataRow = {}
}
