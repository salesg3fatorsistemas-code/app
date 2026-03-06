import { Component } from '@angular/core';
import { LoginService } from '../services/login-service';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-menu',
  imports: [RouterOutlet],
  templateUrl: './menu.html',
  styleUrl: './menu.css',
})
export class Menu {
  
  constructor(
    public sessao: LoginService
  ){ }

}
