import { Component, ViewChild,OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup} from '@angular/forms';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import {MatDialog} from '@angular/material/dialog';
//import {IPackage,Ifile} from '../packages/IPackage';
import { PackagedialogComponent } from '../packagedialog/packagedialog.component';
import { PackageapiService } from '../services/packageapi.service';
// import { NgToastService} from 'ng-angular-popup';
declare var $: any;
declare var Lobibox: any;

@Component({
  selector: 'app-packages',
  templateUrl
  : './packages.component.html',
  styleUrls: ['./packages.component.css']
})

export class PackagesComponent implements OnInit {
  //package : IPackage= {} as IPackage;
  //public fileDataSource:Ifile[] =[];
  file:any;
  packageForm: FormGroup;
  displayedColumns: string[] = ['BrokerName', 'BrokerEmail','Buyer1Name', 'Buyer1Email','DocCount','CreatedOn','PackageStatus','action'];
  packageDataSource! : MatTableDataSource<any>;
  public popoverTitle:string="Delete Confirmation";
  public  popoverMessage:string="Are you sure to delete this package ?";
  public confirmClicked:boolean=false;
  public cancelClicked:boolean=false;

  @ViewChild(MatTable,{static:true}) table: MatTable<any>;  
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

constructor(private http:HttpClient,private fb: FormBuilder,
private dialog:MatDialog,private api:PackageapiService ) { }
ngOnInit(): void {
  this.getAllPackages();
}

openPackageDialog() {
    this.dialog.open(PackagedialogComponent, {      
        width:'45%'
    }).afterClosed().subscribe(val=>{
      if(val=='save'){
        this.getAllPackages();
      }
    })
}

getAllPackages(){
  this.api.GetAllPackages()
  .subscribe({
    next:(res)=>{
      console.log(res);
      this.packageDataSource=  new MatTableDataSource(res.data);
      this.packageDataSource.paginator=this.paginator;
      this.packageDataSource.sort=this.sort;
    },
    error:(err)=>{
      Lobibox.notify("error", {
        size: 'mini',
        rounded: true,
        msg: "Error while fetching the records !",
        position: 'top right',
        });
      //this.toast.error({detail:"Error Message",summary:"Error while fetching the records !",duration:5000})
      //alert("Error while fetching the records !!");
    }
  })
}

EditPackage(row:any){
  this.dialog.open(PackagedialogComponent,{
    width:'45%',
    height:'95%',
    data:row
  }).afterClosed().subscribe(val=>{
    if(val=='update'){
      this.getAllPackages();
    }
  })
}

DeletePackageById(id:number){
this.api.DeletePackageById(id)
.subscribe({
  next:(res)=>{
    if(res.message == "success"){
    Lobibox.notify("success", {
      size: 'mini',
      rounded: true,
      msg: "Package deleted successfully !",
      position: 'top right'
      });
    //this.toast.success({detail:"Success Message",summary:"Package deleted successfully !",duration:5000})
    //alert("Package deleted successfully !");
    this.getAllPackages();
    }
    else{
      Lobibox.notify("error", {
        size: 'mini',
        rounded: true,
        msg: "Error while deleting the package !",
        position: 'top right',
        });
    }
  },
  error:()=>{
    Lobibox.notify("error", {
      size: 'mini',
      rounded: true,
      msg: "Error while deleting the package !",
      position: 'top right',
      });
   // this.toast.error({detail:"Error Message",summary:"Error while deleting the package !",duration:5000})
    //alert("Error while deleting the package");
  }
})
}

applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.packageDataSource.filter = filterValue.trim().toLowerCase();

  if (this.packageDataSource.paginator) {
    this.packageDataSource.paginator.firstPage();
  }
}

}