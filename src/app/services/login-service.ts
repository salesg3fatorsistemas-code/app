import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class LoginService {

  urlApi : string = environment.API + 'sessao/'

  ID_ANO: number = 0
  ID_MES: number = 0
  DS_MES: string = ''

  ID_ENTIDADE : number = 0
  NM_ENTIDADE : string = ''
  ID_USUARIO  : number = 0
  NM_USUARIO  : string = ''

  async consultarEntidade(alias: string | null){

    let request = await fetch(this.urlApi + alias + '/entidade', {
      method: "GET",
      headers: environment.headers
    })

    let data = await request.json()

    this.ID_ENTIDADE = data.entidade.ID_ENTIDADE
    this.NM_ENTIDADE = data.entidade.NM_ENTIDADE
    
    return data
  }

  async loginRequest(dataRow: object){

    let request = await fetch(this.urlApi + this.ID_ENTIDADE + '/userlogin', {
      method: "POST",
      headers: environment.headers,
      body: JSON.stringify(dataRow)
    })

    let data = await request.json()

    if(data.sucesso){
      this.ID_USUARIO = data.ID_USUARIO
      this.NM_USUARIO = data.NM_USUARIO
      this.ID_MES = data.ID_MES
      this.ID_ANO = data.ID_ANO
      this.DS_MES = data.DS_MES
    }

    return data
  }
}
