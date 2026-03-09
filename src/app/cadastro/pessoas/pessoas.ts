import { Component } from '@angular/core';
import { Motor } from '../../shared/motor/motor';

@Component({
  selector: 'app-pessoas',
  imports: [Motor],
  templateUrl: './pessoas.html',
  styleUrl: './pessoas.css',
})
export class Pessoas {

  colunasGrid = [
    {header: "Código", field: "CD_PESSOA", width: "15%"},
    {header: "Nome", field: "NM_PESSOA", width: "40%"},
    {header: "CPF/CNPJ", field: "CADASTRO", width: "25%"},
    {header: "Ativo", field: "SN_ATIVO", width: "20%"},
  ]

  formCampos = [
    {width: "6rem", nome: "CD_PESSOA", label: "Código:", tipo: "text", required: true},
    {width: "42rem", nome: "NM_PESSOA", label: "Nome:", tipo: "text", required: true},
    {width: "8rem", nome: "TP_PESSOA", label: "Tipo:", tipo: "select", required: true, opcoes: [
      {label: "Física", value: "F"},
      {label: "Jurídica", value: "J"}
    ]},
    {width: "2.5rem", nome: "SN_ATIVO", label: "Ativo:", tipo: "checkbox", required: false, check: true},
    {width: "10rem", nome: "CADASTRO", label: "CPF/CNPJ:", tipo: "text", required: true},
    {width: "10rem", nome: "CONTATO", label: "Celular:", tipo: "text", required: false},
    {width: "100%", nome: "HISTORICO", label: "Histórico:", tipo: "textarea", required: false},
    
  ]

  dataGrid = []

  dataRow = {}
}
