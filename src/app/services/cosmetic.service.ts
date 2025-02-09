import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ApiResponseCosmeticos, Cosmetico, StatusMessage} from "../common/interfaceApi";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CosmeticService {
  private readonly http: HttpClient = inject(HttpClient);
  private readonly urlBase:string = "https://api-cosmeticos.vercel.app/api/v2/cosmeticos";

  constructor() { }

  getCosmeticos(page:number, pageSize:number):Observable<ApiResponseCosmeticos>{
    return this.http.get<ApiResponseCosmeticos>(this.urlBase+"/paged?page="+page+"&limit="+pageSize);
  }
  getOneCosmetico(id:string):Observable<Cosmetico>{
    return this.http.get<Cosmetico>(this.urlBase+"/detail/"+id);
  }

  insertCosmetico(cosmetico:Cosmetico):Observable<StatusMessage>{
    return this.http.post<StatusMessage>(this.urlBase+"/addOne",cosmetico)
  }

  updateCosmetico(id:string, cosmetico:Cosmetico):Observable<StatusMessage>{
    return this.http.patch<StatusMessage>(this.urlBase+'/updateOne/'+id, cosmetico)
  }

  deleteCosmetico (id:string):Observable<StatusMessage> {
    return this.http.delete<StatusMessage>(this.urlBase+"/deleteOne/"+id);
  }

}
