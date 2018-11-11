import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms'


@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {
  employeeForm: FormGroup;
  fullNameLength: 0;
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    // this.employeeForm = new FormGroup({
    //   fullName: new FormControl(),
    //   email: new  FormControl(),
    //   // Create Skill Fomr Group
    //   skills: new FormGroup({
    //     skillName: new FormControl(),
    //     experienceInYear: new FormControl(),
    //     proficiency: new FormControl()
    //   })
    // });

    //Using Form Builder.

    this.employeeForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(10)]],
      email: [''],
      skills: this.fb.group({
        skillName: [''],
        experienceInYear: [''],
        proficiency: ['advanced']
      })
    })

    // this.employeeForm.get('fullName').valueChanges.subscribe((value:string) => {
    //   this.fullNameLength = value.length;
    // });

    // this.employeeForm.valueChanges.subscribe((value: any) => {
    //   console.log(JSON.stringify(value));
    // });

    // this.employeeForm.get('skills').valueChanges.subscribe((value: any) => {
    //   console.log(JSON.stringify(value));
    // });
  }

  // onLoadDataClick(): void {
  //   //use setVallue to update all form control.

  //   this.employeeForm.setValue(
  //     {
  //       fullName: "Karthikeyan Sakthi",
  //       email: "sakthikeyan@gmail.com",
  //       skills: {
  //         skillName: "ASP.NET MVC",
  //         experienceInYear: "6",
  //         proficiency: "advanced"
  //       }
  //     }
  //   )
  //   //use patchValue to update sub set of controlsin the form.
  //   // this.employeeForm.patchValue(
  //   //   {
  //   //     fullName: "Karthikeyan Sakthi",
  //   //     email: "sakthikeyan@gmail.com",
  //   //     // skills: {
  //   //     //   skillName: "ASP.NET MVC",
  //   //     //   experienceInYear: "6",
  //   //     //   proficiency: "advanced"
  //   //     // }
  //   //   }
  //   // )
  // }

  onLoadDataClick(): void {
    this.logKeyValuePairs(this.employeeForm);
  }

  logKeyValuePairs(group: FormGroup): void {
    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.get(key);
      if (abstractControl instanceof FormGroup) {
        //Recursively call the method to loop through nested formgroup.
        this.logKeyValuePairs(abstractControl);
      }
      else {
        //console.log('key=' + key + ' value=' + abstractControl.value);
        //abstractControl.disable();
        abstractControl.markAsDirty();
      }
    })
  }
  onSubmit(): void {
    // console.log(this.employeeForm.controls.fullName.value)
    // console.log(this.employeeForm.get('fullName').value)
    // console.log(this.employeeForm.touched);
    // console.log(this.employeeForm.value);
  }
}
