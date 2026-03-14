import { Component } from '@angular/core';
import { IColunaGrid, IFormCampo, Motor } from '../../shared/motor/motor';

@Component({
  selector: 'app-categorias',
  imports: [Motor],
  templateUrl: './categorias.html',
  styleUrl: './categorias.css',
})
export class Categorias {

  colunasGrid : IColunaGrid[] = [
    {field: 'CD_CATEGORIA', header: 'Código:',    width: '15%'},
    {field: 'NM_CATEGORIA', header: 'Categoria:', width: '50%'},
    {field: 'TP_CATEGORIA', header: 'Tipo:',      width: '20%'},
    {field: 'SN_ATIVO',     header: 'Ativo:',     width: '15%'}
  ]

  formCampos : IFormCampo[] = [
    {
      nome: 'CD_CATEGORIA'  ,
      label: 'Código:',
      tipo: 'text',
      width: '8rem',
      required: true
    },
    {
      nome: 'NM_CATEGORIA',
      label: 'Categoria:',
      tipo: 'text',
      width: '44rem',
      required: true
    },
    {
      nome: 'TP_CATEGORIA',
      label: 'Tipo:',
      tipo: 'select',
      width: '12rem',
      required: true,
      opcoes: [
        {label: 'Receita', value: 'R'},
        {label: 'Despesa', value: 'D'},
        {label: 'Produto', value: 'P'},
      ]
    },
    {
      nome: 'SN_ATIVO',
      label: 'Ativo:',
      tipo: 'checkbox',
      width: '2rem',
      required: true
    },
    {
      nome: 'HISTORICO',
      label: 'Histórico:',
      tipo: 'textarea',
      width: '100%',
      required: true
    },
  ]

  dataRow : any = {
    SN_ATIVO: true
  }
}
