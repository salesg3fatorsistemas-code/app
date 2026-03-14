import { Component } from '@angular/core';
import { IColunaGrid, Motor } from '../../shared/motor/motor';

@Component({
  selector: 'app-servico',
  imports: [Motor],
  templateUrl: './servico.html',
  styleUrl: './servico.css',
})
export class Servico {

  colunasGrid: IColunaGrid[] = [
  ]
}
