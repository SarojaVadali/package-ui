import { Component,ViewChild,ElementRef,Inject,OnInit } from '@angular/core';
import { DatePipe} from '@angular/common';
import { FormControl,FormGroup,FormBuilder, Validators} from '@angular/forms';
import { IPackage,Ifile} from '../packages/IPackage';
import { PackageapiService } from '../services/packageapi.service';
import { MatDialogRef,MAT_DIALOG_DATA} from "@angular/material/dialog";
// import { NgToastService} from 'ng-angular-popup';
declare var $:any;
declare var Lobibox: any;

@Component({
  selector: 'app-packagedialog',
  templateUrl: './packagedialog.component.html',
  styleUrls: ['./packagedialog.component.css']
})
export class PackagedialogComponent implements OnInit {
  packageForm !:FormGroup; 
  actionBtn:string="Save";
  createdOn:any;
  public fileDataSource:Ifile[] =[]; 
  files=[];
  multipleFiles=[];
  public fileCount:number;
  fileAttr:string = 'Choose File';

  @ViewChild("fileUpload", {static: false}) fileUpload: ElementRef;

  constructor(private formBuilder:FormBuilder,private api:PackageapiService,
    private dialogRef: MatDialogRef<PackagedialogComponent>,
    public datepipe:DatePipe,@Inject(MAT_DIALOG_DATA) public editData:any) { }

  ngOnInit():void {
    this.packageForm= this.formBuilder.group({
      PackageId :[],
      Buyer1Name : ['',Validators.required],
      Buyer1Email : ['',Validators.required],
      Buyer2Name : ['',Validators.required],
      Buyer2Email : ['',Validators.required],
      BrokerName : ['',Validators.required],
      BrokerEmail : ['',Validators.required],
      //UploadedFiles : [],
      DocCount:[],
      DocPath:[],
      CreatedBy:[],
      ModifiedBy:[],
      FileAttr:['Upload Documents']
    });

    console.log(this.editData);
    if(this.editData){
      this.actionBtn="Update";
      this.packageForm.controls['PackageId'].setValue(this.editData.PackageId);
      this.packageForm.controls['Buyer1Name'].setValue(this.editData.Buyer1Name);
      this.packageForm.controls['Buyer1Email'].setValue(this.editData.Buyer1Email);
      this.packageForm.controls['Buyer2Name'].setValue(this.editData.Buyer2Name);
      this.packageForm.controls['Buyer2Email'].setValue(this.editData.Buyer2Email);
      this.packageForm.controls['BrokerName'].setValue(this.editData.BrokerName);
      this.packageForm.controls['BrokerEmail'].setValue(this.editData.BrokerEmail);
      this.packageForm.controls['DocCount'].setValue(this.editData.DocCount);
    }
  }

  AddPackage(){
    if(!this.editData){
      if(this.packageForm.valid){
        this.packageForm.value["PackageId"]=0;
        this.packageForm.value["DocCount"]=this.fileCount;
        this.packageForm.value["DocPath"]='';
        //this.packageForm.value["CreatedOn"] =this.datepipe.transform((new Date), 'MM/dd/yyyy h:mm:ss'); 
        // this.packageForm.value["UploadedFiles"] = this.files;
        this.packageForm.value["CreatedBy"] = 'Christa';
        this.packageForm.value["ModifiedBy"] = '';
        this.packageForm.value["PackageStatus"] = 'In Progress';

        //File-FormData
        const formData = new FormData();
        for(let lstFile of this.multipleFiles){
          formData.append('files', lstFile);
        }
        formData.append('PackageId',  this.packageForm.value["PackageId"]);
        formData.append('Buyer1Name',  this.packageForm.value["Buyer1Name"]);
        formData.append('Buyer1Email',  this.packageForm.value["Buyer1Email"]);
        formData.append('Buyer2Name',  this.packageForm.value["Buyer2Name"]);
        formData.append('Buyer2Email',  this.packageForm.value["Buyer2Email"]);
        formData.append('BrokerName',  this.packageForm.value["BrokerName"]);
        formData.append('BrokerEmail',  this.packageForm.value["BrokerEmail"]);
        formData.append('DocCount',  this.packageForm.value["DocCount"]);
        formData.append('DocPath',  this.packageForm.value["DocPath"]);
        formData.append('PackageStatus',  this.packageForm.value["PackageStatus"]);
        formData.append('CreatedBy',  this.packageForm.value["CreatedBy"]);
        formData.append('ModifiedBy',  this.packageForm.value["ModifiedBy"]);
        
        // this.api.UploadFiles(formData)
        // .subscribe({
        //   next:(res)=>{console.log(res)},
        //   error:()=>{console.log('err')}
        // });

       // this.packageForm.value["UploadedFiles"] = formData;
        //formData.append('params',this.packageForm.value);

       // this.api.AddPackage(this.packageForm.value)
       this.api.AddPackage(formData)
        .subscribe({
          next:(res)=>{
            if(res.message == "success"){
            Lobibox.notify("success", {
              size: 'mini',
              rounded: true,
              msg: "Package added successfully !",
              position: 'top right',
              });
              this.packageForm.reset();
              this.dialogRef.close('save');
            }
              else{
                Lobibox.notify("error", {
                  size: 'mini',
                  rounded: true,
                  msg: "Error while adding the package !",
                  position: 'top right',
                  });
              }
            //this.toast.success({detail:"Success Message",summary:"Package added successfully !",duration:5000})
           // alert("Package added successfully");           
          },
          error:()=>{
            Lobibox.notify("error", {
              size: 'mini',
              rounded: true,
              msg: "Error while adding the package !",
              position: 'top right',
              });
            //this.toast.error({detail:"Error Message",summary:"Error while adding the package !",duration:5000})
            //alert("Error while adding the package");
          }
        })
      }
    }
    else{
      this.UpdatePackage();
    }
  }

  UpdatePackage(){
        this.packageForm.value["DocCount"]=this.fileCount;
        this.packageForm.value["DocPath"]='';
        //this.packageForm.value["CreatedOn"] =this.datepipe.transform((new Date), 'MM/dd/yyyy h:mm:ss'); 
        this.packageForm.value["UploadedFiles"] = this.files;
        this.packageForm.value["CreatedBy"] = '';
        this.packageForm.value["ModifiedBy"] = 'Christa';
    this.api.UpdatePackage(this.packageForm.value)
    .subscribe({
      next:(res)=>{
        debugger;
        if(res.message == "success"){
        Lobibox.notify("success", {
          size: 'mini',
          rounded: true,
          msg: "Package updated successfully !",
          position: 'top right',
          });
        //this.toast.success({detail:"Success Message",summary:"Package updated successfully !",duration:5000})
        //alert("Package updated successfully !");
        this.packageForm.reset();
        this.dialogRef.close('update');
        }
        else{
            Lobibox.notify("error", {
              size: 'mini',
              rounded: true,
              msg: "Error while updating the package !",
              position: 'top right',
            });
        }
      },
      error:()=>{
        Lobibox.notify("error", {
          size: 'mini',
          rounded: true,
          msg: "Error while updating the package !",
          position: 'top right',
          });
        //this.toast.error({detail:"Error Message",summary:"Error while updating the package !",duration:5000})
        //alert("Error while updating package !");
      }
    })
  }

  SelectMultipleFiles(event:any){
    if(event.target.files.length>0){
        this.multipleFiles=event.target.files
    }
    Array.from(event.target.files).forEach((file:any)=>{
      const objFile= {fileName: file.name};
      this.fileDataSource.push(objFile);
      //this.files.push({ data: file});
    });
    this.fileCount=event.target.files.length;
  }

  // sendFile(file) {
  //   const formData = new FormData();
  //   formData.append('file', file.data);
  //   file.inProgress = true;
  //   this.api.uploadFiles(formData).subscribe((event: any) => {
  //       if (typeof (event) === 'object') {
  //         console.log(event.body);
  //       }
  //     });
  // }

  deleteFile(i){debugger;
    this.fileDataSource.splice(i,1);
    this.files.splice(i,1);
    this.fileCount=this.files.length;
  }

}
