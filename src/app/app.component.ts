import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProductAddEditComponent } from './product-add-edit/product-add-edit.component';
import { ProductService } from './services/product.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CoreService } from './core/core.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'sku',
    'name',
    'description',
    'date',
    'gender',
    'store',
    'color',
    'quantity',
    'size',
    'action',
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _dialog: MatDialog,
    private _prodService: ProductService,
    private _coreService: CoreService,
  ) {}
  ngOnInit(): void {
    this.getProductList();
  }
  openAddEditProductForm() {
   const dialogRef = this._dialog.open(ProductAddEditComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getProductList();
        }
      },
    });
  }
  getProductList() {
    this._prodService.getProductList().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: console.log,
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  deleteProduct(id: number){
    this._prodService.deleteProduct(id).subscribe({
      next:(res) =>{
        this._coreService.openSnackBar('Producto Eliminado!', 'done');
        this.getProductList();

      },
error: console.log,

    });
    
  }
openEditForm(data: any){
  const dialogRef = this._dialog.open(ProductAddEditComponent,{
    data,
   });

   dialogRef.afterClosed().subscribe({
    next: (val) => {
      if (val) {
        this.getProductList();
      }
    },
  });
}
}
