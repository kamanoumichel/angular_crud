import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { EmployeeModel } from './models/employee-model';
import { NgIf } from "../../node_modules/@angular/common/types/_common_module-chunk";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ReactiveFormsModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {

  employeeFrom: FormGroup=new FormGroup({});
  emplObj: EmployeeModel=new EmployeeModel();
  employeeList: EmployeeModel[]=[];


  constructor(){
    this.createForm();
    debugger;
    const oldData = localStorage.getItem("employeeData");
    if(oldData!=null){
      const parseData = JSON.parse(oldData);
      this.employeeList= parseData;
    }
  }


  createForm(){
    this.employeeFrom=new FormGroup({
      empId: new FormControl(this.emplObj.empId),
      name: new FormControl(this.emplObj.name,[Validators.required]),
      city: new FormControl(this.emplObj.city),
      address: new FormControl(this.emplObj.address),
      contactNo: new FormControl(this.emplObj.contactNo),
      emailId: new FormControl(this.emplObj.emailId),
      state: new FormControl(this.emplObj.state),

    })
  }
  onSave(){
    debugger;
    const oldData = localStorage.getItem("employeeData");
    if(oldData!=null){
      const parseData = JSON.parse(oldData);
      this.employeeFrom.controls['empId'].setValue(parseData.length+1);
      this.employeeList.unshift(this.employeeFrom.value);
    }
    else{
      this.employeeList.unshift(this.employeeFrom.value);
    
    }
      localStorage.setItem("employeeData",JSON.stringify(this.employeeList))
  }
  onEdit(i: EmployeeModel){
    this.emplObj=i;
    this.createForm();
  }
  onUpdate(){
    const record = this.employeeList.find(m=>m.empId==this.employeeFrom.controls['empId'].value);
    if(record!=undefined){
      record.address=this.employeeFrom.controls['address'].value;
      record.name=this.employeeFrom.controls['name'].value;
      record.contactNo=this.employeeFrom.controls['contactNo'].value;
    }
    localStorage.setItem("employeeData",JSON.stringify(this.employeeList))
    this.emplObj= new EmployeeModel();
    this.createForm()

  }
  onDelete(id : number):void{
    const index=this.employeeList.findIndex(m=>m.empId==id);
    this.employeeList.splice(index,1);
    localStorage.setItem("employeeData",JSON.stringify(this.employeeList));
   // this.employeeList.filter(b=>b.empId===id);
    //localStorage.setItem("employeeData",JSON.stringify(this.employeeList))


  }
}
