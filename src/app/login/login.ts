import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login-service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnInit{
  
  dataRow = {
    NM_ENTIDADE:  ''  ,
    CD_USUARIO:   ''  ,
    HS_SENHA:     ''  ,
    ID_ANO: 2026      ,
    ID_MES: 3
  }

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

    this.dataRow.NM_ENTIDADE = data.NM_ENTIDADE

    this.cdr.detectChanges()
  }

  async userLogin(){
    let data = await this.sessao.loginRequest(this.dataRow)

    if(data.sucesso){
      this.sessao.ID_ANO = this.dataRow.ID_ANO
      this.sessao.ID_MES = this.dataRow.ID_MES
      this.router.navigate([`${this.CD_ALIAS}/dashboard`])
    }
    else{
      alert(data.message)
    }
  }
}
