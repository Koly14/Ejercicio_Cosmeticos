import {Component, inject} from '@angular/core';
import {NgbPagination} from "@ng-bootstrap/ng-bootstrap";
import {CosmeticService} from "../../services/cosmetic.service";
import {Cosmetico, Info} from "../../common/interfaceApi";
import {CurrencyPipe} from "@angular/common";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {faEdit, faTrash} from "@fortawesome/free-solid-svg-icons";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-cosmetic-list',
  standalone: true,
  imports: [
    NgbPagination,
    CurrencyPipe,
    FaIconComponent,
    RouterLink
  ],
  templateUrl: './cosmetic-list.component.html',
  styleUrl: './cosmetic-list.component.css'
})
export class CosmeticListComponent {
  private readonly cosmeticService:CosmeticService = inject(CosmeticService);
  cosmeticos!:Cosmetico[];
  info!:Info;
  page:number = 1;
  pageSize:number = 6;
  totalPage!:number;
  protected readonly faEdit = faEdit;
  protected readonly faTrash = faTrash;


  constructor() {
    this.loadCosmeticos();
  }

  protected loadCosmeticos() {
    return this.cosmeticService.getCosmeticos(this.page,this.pageSize).subscribe(
      {
        next: value => {
          this.cosmeticos = value.cosmeticos.cosmeticos;
          this.totalPage = value.cosmeticos.info.total; // Para el pagination (Saber el total de páginas)
        },
        error:error => console.log(error),
        complete: () => console.log("Carga completada")
      }
    )
  }

  deleteItem(_id: string) {
    this.cosmeticService.deleteCosmetico(_id).subscribe(
      {
        next: value => console.log(value),
        error: err => console.log(err),
        complete : () => console.log("Deleted")
      }
    )
  }
}
