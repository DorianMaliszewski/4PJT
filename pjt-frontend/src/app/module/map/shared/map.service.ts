import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  ipaddress: [
    "91.207.208.153",
    "91.210.208.153"
  ];

  constructor(private httpClient: HttpClient) { }
/*
  getIpList(){
    return this.httpClient.get("");
  }*/
}
