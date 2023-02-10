import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthRegisterService } from 'src/app/services/auth-register.service';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  username:string =''
  formData:any;
  submitted=false;
  toastText:any = ''
  constructor(private router:Router,private fb:FormBuilder,private regservice:AuthRegisterService,private signInAuth:AuthServiceService) {
    this.formData= this.fb.group({
      name:["",[Validators.required, Validators.minLength(3),Validators.maxLength(30)]],
      email:["", [Validators.required, Validators.email]],
      password:["", [Validators.required,Validators.pattern('[a-zA-Z0-9]{8,30}$')]],
    })
  }
  showToast() {
    document?.getElementById("myToast")?.classList.remove("hidden");
    setTimeout(function () {
        document?.getElementById("myToast")?.classList.add("hidden");
    }, 5000);
  }
  get name() {
    return this.formData.get("name");
  }
  get password() {
    return this.formData.get("password");
  }
  get email() {
    return this.formData.get("email");
  }
  submit(){
    alert()
    this.submitted=true;
    this.regservice.signUp(this.formData.value).subscribe((response)=>{
    this.submitted=false;
    console.log(response);
    if (response.status == 'success') {
      this.toastText = response.message
      document?.getElementById('toastBtn')?.click()
      this.regservice.setUser(response.details)
      this.signInAuth.signIn()
      setTimeout(() => {
        this.router.navigate(['/profile'])
      }, 4000);

    }
    }, (error)=>{
      alert(error.message)
      this.submitted=false;
    })
  }
  ngOnInit(): void {
    window?.scrollTo(0,0)
  }

}
