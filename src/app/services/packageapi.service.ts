import { HttpClient, HttpEvent,HttpRequest,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable,} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PackageapiService {

  constructor(private _http:HttpClient) { }
  _baseUrl ="http://localhost:3000/";
  headers=new Headers({'Content-Type':'application/json'});

  GetAllPackages() {
    return this._http.get<any>(this._baseUrl+'packageapi/GetAllPackages');
    // .pipe(map(res => res.()) );
 }  

  AddPackage(formData:any){
    return this._http.post<any>(this._baseUrl+'packageapi/AddPackage',formData)
  }

  UpdatePackage(data:any){
    return this._http.put<any>(this._baseUrl+'packageapi/UpdatePackage',data)
  }

  DeletePackageById(id:any){
    return this._http.delete<any>(this._baseUrl+'packageapi/DeletePackageById/'+id);
  }

//   GetPackage() {
//     return this.http.post($(baseurl)+'profileapi/GetPublisherProfiles', {headers: this.headers})
//       .map(res => res.json());
//  }  

//   public uploadFiles(formData) {
//     return this.httpClient.post<any>(this.serverUrl, formData, {
//       reportProgress: true,
//       observe: 'events'
//     });
// }

  UploadFiles(formData:any) {
     //const req = new HttpRequest('POST', `${this._baseUrl}/upload`, formData, {
      return this._http.post<any>(this._baseUrl+'packageapi/UploadFiles',formData);
    //return this._http.request(req);
  }

  getFiles(): Observable<any> {
    return this._http.get(`${this._baseUrl}/files`);
  }


}
