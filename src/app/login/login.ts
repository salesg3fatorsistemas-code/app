import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login-service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnInit{
  
  dataRow = {
    NM_ENTIDADE:  ''  ,
    CD_USUARIO:   ''  ,
    HS_SENHA:     ''  ,
    ID_ANO: 0         ,
    ID_MES: 0
  }

  acessoAnos : Array<any> = []

  CD_ALIAS : string | null = ''

  constructor(
    private sessao: LoginService,
    private router: Router,
    private acRoute: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ){ }

  async ngOnInit() {
    this.CD_ALIAS = this.acRoute.snapshot.paramMap.get('alias')
    
    let data = await this.sessao.consultarEntidade(this.CD_ALIAS)

    this.dataRow.NM_ENTIDADE = data.entidade['NM_ENTIDADE']
    this.acessoAnos = data.anos

    this.cdr.detectChanges()
  }

  async userLogin(){
    let data = await this.sessao.loginRequest(this.dataRow)

    if(data.sucesso){
      this.cdr.detectChanges()
      this.router.navigate([`${this.CD_ALIAS}/dashboard`])
    }
    else{
      alert(data.message)
    }
  }
}
