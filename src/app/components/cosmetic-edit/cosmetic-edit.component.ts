import {Component, inject, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {CosmeticService} from "../../services/cosmetic.service";
import {Cosmetico} from "../../common/interfaceApi";
import {Router} from "@angular/router";

@Component({
  selector: 'app-cosmetic-edit',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './cosmetic-edit.component.html',
  styleUrl: './cosmetic-edit.component.css'
})
export class CosmeticEditComponent implements OnInit{
  // Input que traigo desde otro sitio
  @Input('id') id!:string;
  private readonly cosmeticService:CosmeticService = inject(CosmeticService);
  // Formulario
  private readonly formBuilder:FormBuilder = inject(FormBuilder);
  cosmetico!:Cosmetico;
  editar:boolean = false;
  formCosmeticos:FormGroup = this.formBuilder.group(
    {
      _id: [],
      name: ["", [Validators.required, Validators.minLength(3)]],
      image: ["", [Validators.required]],
      type: ["", [Validators.required, Validators.minLength(2)]],
      brand: ["", [Validators.required, Validators.minLength(2)]],
      price: ["", [Validators.required]],
    }
  );
  private readonly router:Router = inject(Router);

  // GETTERS

  get name (){
    return this.formCosmeticos.get("name");
  }
  get image (){
    return this.formCosmeticos.get("image");
  }
  get type (){
    return this.formCosmeticos.get("type");
  }
  get brand (){
    return this.formCosmeticos.get("brand");
  }
  get price (){
    return this.formCosmeticos.get("price");
  }


  ngOnInit() {
    this.loadEditCosmetico();
  }

  private loadEditCosmetico() {
    if (this.id){
      // Estamos editando
      this.editar = true;
      this.cosmeticService.getOneCosmetico(this.id).subscribe(
        {
          next: value => {
            this.cosmetico = value;
            // Necesario para cargar los inputs (y es más corto y sencillo que el de ApiJuguetes)
            this.formCosmeticos.setValue(value);
          },
          error: err => console.log(err),
          complete:() => console.log("Loaded item")
        }
      );
    } else {
      // Estamos añadiendo nuevo
      this.editar = false;
      this.formCosmeticos.reset();
      this.cosmetico = this.formCosmeticos.getRawValue(); // Esto es para que no se quede en el Loading...
    }
  }

  onSubmit() {
    if (this.id){
      // Insert edit

      /** IMPORTANTE
      * Cuando tienes que hacer update o insertar - El objeto que pasamos es el nuevo
      * que rellenamos en el formulario
      * this.formCosmeticos.getRawValue()
      */

      this.cosmeticService.updateCosmetico(this.id, this.formCosmeticos.getRawValue()).subscribe(
        {
          next: value => {
            console.log(value);
            this.router.navigateByUrl("/cosmetic/list");
            },
          complete: () => {console.log("Update complete")},
          error: err => console.log(err.message()),
        }
      );

    } else {
      // insert New

      /** IMPORTANTE
      * Cuando tienes que hacer update o insertar - El objeto que pasamos es el nuevo
      * que rellenamos en el formulario
      * this.formCosmeticos.getRawValue()
      */

      this.cosmeticService.insertCosmetico(this.formCosmeticos.getRawValue()).subscribe(
        {
          next: value => {
            console.log(value);
            this.router.navigateByUrl("/cosmetic/list");
            },
          complete: () => {console.log("Inserted complete")},
          error: err => console.log(err.message()),
        }
      )
    }
  }
}
