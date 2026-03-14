import { Component } from '@angular/core';
import { IColunaGrid, IFormCampo, Motor } from '../../shared/motor/motor';

@Component({
  selector: 'app-produtos',
  imports: [Motor],
  templateUrl: './produtos.html',
  styleUrl: './produtos.css',
})
export class Produtos {

  colunasGrid: IColunaGrid[] = [
    {field: 'CD_PRODUTO', header: 'Código:', width: '15%'},
    {field: 'NM_PRODUTO', header: 'Produto:', width: '50%'},
    {field: 'NM_CATEGORIA', header: 'Categoria:', width: '15%'},
    {field: 'SN_ATIVO', header: 'Ativo:', width: '20%'},
  ]

  formCampos: IFormCampo[] = [
    {
      nome: 'CD_PRODUTO',
      label: 'Código:',
      width: '8rem',
      tipo: 'text',
      required: true
    },
    {
      nome: 'NM_PRODUTO',
      label: 'Produto:',
      width: '40rem',
      tipo: 'text',
      required: true
    },
    {
      nome: 'ID_CATEGORIA',
      label: 'Categoria:',
      width: '16rem',
      tipo: 'lookup',
      required: true,
      lookup: {
        tabela: 'CATEGORIA',
        colunas: [
          {header: 'Código:', field:'CD_CATEGORIA', 'width': '30%'},
          {header: 'Nome:', field:'NM_CATEGORIA', 'width': '70%'},
        ],
        display: 'NM_CATEGORIA'
      }
    },
    {
      nome: 'SN_ATIVO',
      label: 'Ativo:',
      width: '2rem',
      tipo: 'checkbox',
      required: true
    },
    {
      nome: 'HISTORICO',
      label: 'Histórico:',
      width: '100%',
      tipo: 'textarea',
      required: false
    },
  ]

  dataRow: any = {
    SN_ATIVO: true
  }

  dataView: any = {
    NM_CATEGORIA: ''
  }
}
