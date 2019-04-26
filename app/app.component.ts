import { Component,OnInit } from '@angular/core';
import {FormGroup,FormControl,Validators,FormArray} from '@angular/forms';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnInit {
  genders=['male','female'];
  SignupForm:FormGroup;
  forbiddenUserNames=['geetha','puja'];

  ngOnInit(){
    this.SignupForm = new FormGroup({
      'userData': new FormGroup({
          'username':new FormControl(null,[Validators.required,this.forbiddenNames.bind(this)]),
          'email':new FormControl(null,[Validators.required,Validators.email],this.forbiddenEmails),
      }),
      'gender':new FormControl('female'),
      'hobbies':new FormArray([])
    });

    this.SignupForm.setValue({
      'userData':{
        'username':'geetha',
        'email':'geetha@gmail.com'
      },
      'gender':'female',
      'hobbies':[]
    })
  }

  onSubmit(){
    console.log(this.SignupForm);
  }

  onAddHobby(){

    const control=new FormControl(null,Validators.required);
    (<FormArray>this.SignupForm.get('hobbies')).push(control);
  }

  forbiddenNames(control: FormControl):{[s: string]: boolean}
  {
    if(this.forbiddenUserNames.indexOf(control.value)!=-1)
    {
      return {'nameisForbidden':true};
    }

    return null;
  }

  forbiddenEmails(control: FormControl): Promise<any>|Observable<any>
  {
    const promise= new Promise<any>((resolve,reject)=>{
      setTimeout(()=>{
        if(control.value==='test@test.com')
        {
          resolve({'emailIsForbidden':true});
        }
        else{
               resolve(null);
        }
       
      },1500);
    });
    return promise;
  }
}


// angular form is group of controls
