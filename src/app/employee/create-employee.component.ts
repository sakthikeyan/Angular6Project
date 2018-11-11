import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms'


@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {
  employeeForm: FormGroup;
  constructor() { }

  ngOnInit() {
    this.employeeForm = new FormGroup({
      fullName: new FormControl(),
      email: new FormControl(),
      // Create Skill Fomr Group
      skills: new FormGroup({
        skillName: new FormControl(),
        experienceInYear: new FormControl(),
        proficiency: new FormControl()
      })
    });
  }

  onLoadDataClick(): void {
    //use setVallue to update all form control.
    // this.employeeForm.setValue(
    //   {
    //     fullName: "Karthikeyan Sakthi",
    //     email: "sakthikeyan@gmail.com",
    //     skills: {
    //       skillName: "ASP.NET MVC",
    //       experienceInYear: "6",
    //       proficiency: "advanced"
    //     }
    //   }
    // )

    //use patchValue to update sub set of controlsin the form.
    this.employeeForm.patchValue(
      {
        fullName: "Karthikeyan Sakthi",
        email: "sakthikeyan@gmail.com",
        // skills: {
        //   skillName: "ASP.NET MVC",
        //   experienceInYear: "6",
        //   proficiency: "advanced"
        // }
      }
    )
  }
  onSubmit(): void {
    // console.log(this.employeeForm.controls.fullName.value)
    // console.log(this.employeeForm.get('fullName').value)
    // console.log(this.employeeForm.touched);
    // console.log(this.employeeForm.value);
  }
}
