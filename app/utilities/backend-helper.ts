import { Injectable } from '@angular/core';

@Injectable()
export class BackendHelper{

  public authUrl(ressourceUri: string, token:string){
    return "http://localhost:3001/api/"+
    ressourceUri+
    "?access_token="+token;
  }

  public unAuthUrl(ressourceUri: string): string{
    return 'http://localhost:3001/api/'+ressourceUri;
  }

}
