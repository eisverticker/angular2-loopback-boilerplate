import { Injectable } from '@angular/core';

import { ConfigurationService } from '../config/configuration.service';

@Injectable()
export class BackendHelper{
  constructor(
    private config: ConfigurationService
  ){}

  public authUrl(ressourceUri: string, token:string){
    return this.config.get('backendApiUrl',"http://localhost:3001/api/")+
    ressourceUri+
    "?access_token="+token;
  }

  public unAuthUrl(ressourceUri: string): string{
    return this.config.get('backendApiUrl',"http://localhost:3001/api/")+ressourceUri;
  }

}
