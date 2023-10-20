import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProductService } from '../services/product.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoreService } from '../core/core.service';

@Component({
  selector: 'app-product-add-edit',
  templateUrl: './product-add-edit.component.html',
  styleUrls: ['./product-add-edit.component.scss']
})
export class ProductAddEditComponent implements OnInit {
  empForm: FormGroup;

  education: string[] = [
    'Ecatepec',
    'Zaragoza',
    'Madero',
    'Reforma',
    'Izcalli',
  ];

  constructor(
    private _fb: FormBuilder,
    private _prodService: ProductService,
    private _dialogRef: MatDialogRef<ProductService>,
    @Inject(MAT_DIALOG_DATA) public data:any,
    private _coreService: CoreService,
  ) {
    this.empForm = this._fb.group({
      sku: '',
      name: '',
      description: '',
      date: '',
      gender: '',
      store: '',
      color: '',
      size: '',
      quantity: '',
    });
  }
  ngOnInit(): void {
    this.empForm.patchValue(this.data);
  }

  

  onFormSubmit() {
    if (this.empForm.valid) {
      if (this.data) {
        this._prodService
          .updateProduct(this.data.id, this.empForm.value)
          .subscribe({
            next: (val: any) => {
              this._coreService.openSnackBar('Producto Actualizado!');
              this._dialogRef.close(true);
            },
            error: (err: any) => {
              console.error(err);
            },
          });
      } else {
        this._prodService.addProduct(this.empForm.value).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('Producto agregado correctamente');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          },
        });
      }
    }
  }
}

