import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl } from '@angular/forms'
import { CustomValidators } from '../shared/custom.validators';


@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {
  employeeForm: FormGroup;
  //fullNameLength: 0;
  validationMessage = {
    'fullName': {
      'required': 'Full Name is required.',
      'minlength': 'Full name must be greater than 2 character.',
      'maxlength': 'Full name must be less than 10 character'
    },
    'email': {
      'required': 'Email is required.',
      'emailDomain': 'Email domian should be gmail.com'
    },
    'phone': {
      'required': 'Phone is required.'
    },
    'skillName': {
      'required': 'Skill name is required.'
    },
    'experienceInYears': {
      'required': 'Experience is required.'
    },
    'proficiency': {
      'required': 'Proficiency is required.'
    }
  };

  formErrors = {
    'fullName': '',
    'email': '',
    'phone': '',
    'skillName': '',
    'experienceInYears': '',
    'proficiency': ''
  };
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
      contactPreference: ['email'],
      email: ['', [Validators.required, CustomValidators.emailDomain('gmail.com')]],
      phone: [''],
      skills: this.fb.group({
        skillName: ['', Validators.required],
        experienceInYears: ['', Validators.required],
        proficiency: ['', Validators.required]
      })
    })

    this.employeeForm.valueChanges.subscribe((data) => {
      this.logValidationErrors(this.employeeForm);
    });

    this.employeeForm.get('contactPreference').valueChanges.subscribe((data: string) => {
      this.onContactPrefernceChange(data);
    });

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

  // onLoadDataClick(): void {
  //   this.logKeyValuePairs(this.employeeForm);
  // }

  // logKeyValuePairs(group: FormGroup): void {
  //   Object.keys(group.controls).forEach((key: string) => {
  //     const abstractControl = group.get(key);
  //     if (abstractControl instanceof FormGroup) {
  //       //Recursively call the method to loop through nested formgroup.
  //       this.logKeyValuePairs(abstractControl);
  //     }
  //     else {
  //       //console.log('key=' + key + ' value=' + abstractControl.value);
  //       //abstractControl.disable();
  //       abstractControl.markAsDirty();
  //     }
  //   })
  // }
  onSubmit(): void {
    // console.log(this.employeeForm.controls.fullName.value)
    // console.log(this.employeeForm.get('fullName').value)
    // console.log(this.employeeForm.touched);
    // console.log(this.employeeForm.value);
  }


  // onLoadDataClick(): void {
  //   this.logValidationErrors(this.employeeForm);
  //   console.log(this.formErrors);
  // }

  onContactPrefernceChange(selectedValue: string) {
    const phoneControl = this.employeeForm.get('phone');
    if (selectedValue === 'phone') {
      phoneControl.setValidators(Validators.required);
    }
    else {
      phoneControl.clearValidators();
    }
    phoneControl.updateValueAndValidity();
  }



  logValidationErrors(group: FormGroup = this.employeeForm): void {
    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.get(key);
      if (abstractControl instanceof FormGroup) {
        //Recursively call the method to loop through nested formgroup.
        this.logValidationErrors(abstractControl);
      }
      else {
        this.formErrors[key] = '';
        if (abstractControl && !abstractControl.valid && (abstractControl.touched || abstractControl.dirty)) {
          const message = this.validationMessage[key];
          for (const errorkey in abstractControl.errors) {
            if (errorkey) {
              this.formErrors[key] += message[errorkey] + '';
            }
          }
        }
      }
    })
  }
}

// function emailDomain(control: AbstractControl): { [key: string]: any } | null {
//   const email: string = control.value;
//   const domain = email.substring(email.lastIndexOf('@') + 1);
//   if (email === '' || domain.toLowerCase() === 'pragimtech.com') {
//     return null;
//   } else {
//     return { 'emailDomain': true };
//   }
//}


// //Angular reactive form custom validator with parameter
// function emailDomain(domainName: string) {
//   return (control: AbstractControl): { [key: string]: any } | null => {
//     const email: string = control.value;
//     const domain = email.substring(email.lastIndexOf('@') + 1);
//     if (email === '' || domain.toLowerCase() === domainName.toLowerCase()) {
//       return null;
//     } else {
//       return { 'emailDomain': true };
//     }
//   };
// }
