import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class LoginService {

  async loginRequest(dataRow: object){

    let request = await fetch(environment.API + 'login', {
      method: "POST",
      headers: {
        "Content-Type":"application/json",
        TOKEN: environment.TOKEN 
      },
      body: JSON.stringify(dataRow)
    })

    let data = await request.json()

    return data
  }
}
