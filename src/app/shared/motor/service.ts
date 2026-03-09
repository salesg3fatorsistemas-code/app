import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { LoginService } from '../../services/login-service';

@Injectable({
  providedIn: 'root',
})
export class Service {

  constructor(private sessao: LoginService){ }
  
  async codigoRegistro(tabela: string){

    let request = await fetch(environment.API + tabela + '/' + this.sessao.ID_ENTIDADE + '/codigo', {
      method: "GET",
      headers: environment.headers
    })

    let data = await request.json()

    return data[0]
  }

}
