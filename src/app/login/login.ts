import { Component } from '@angular/core';
import { LoginService } from '../services/login-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  
  dataRow = {
    CD_USUARIO: ''  ,
    HS_SENHA:   ''
  }

  constructor(private service: LoginService, private router: Router){ }

  async userLogin(){
    let data = await this.service.loginRequest(this.dataRow)

    if(data.sucesso){
      this.router.navigate(['dashboard'])
    }
    else{
      alert(data.message)
    }
  }
}
