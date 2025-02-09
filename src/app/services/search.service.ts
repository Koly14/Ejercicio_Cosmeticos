import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, Subject, switchMap} from "rxjs";
import {Cosmetico} from "../common/interfaceApi";

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private readonly urlBase:string = "https://api-cosmeticos.vercel.app/api/v2/cosmeticos";
  private readonly http: HttpClient = inject(HttpClient);
  private palabra: Subject<string> = new Subject<string>();
  private productSearched$: Observable<Cosmetico[]> = this.palabra.pipe(
    switchMap(res => {
        return this.http.get<Cosmetico[]>(this.urlBase+'/cosmeticoByName/'+res);
      })
  );

  /**
   *  Monataremos la peticion mediante un Switchmap
   *  Necesitamos un subject que a la vez sea observer y observable
   *  Tendremos la palabra que irá cambiando y tendremos que estar suscritos
   *  a esa palabra para que en funcion de la misma se hagan las peticiones a la API
   */

  constructor() {}

    search(name:string){
      this.palabra.next(name);
    }

    // Para que no nos conectemos directamente a los observables
    start():Observable<Cosmetico[]> {
      return this.productSearched$;
    }

}
