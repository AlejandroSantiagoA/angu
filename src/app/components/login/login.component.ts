import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { User } from '../../interfaces/user';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorService } from '../../services/error.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  username: string = '';
  password: string = '';
  loading: boolean = false;

  constructor(private toastr: ToastrService,
    private _userService: UserService, 
    private router: Router,
    private _errorService: ErrorService
  ){}

  ngOnInit(): void {
    
  }
  login(){
    //validamos que ingresen usuarios
    if(this.username == '' || this.password == ''){
      this.toastr.error('Todos los campos son obligatorios', 'Error');
      return 
    }

    //creamos el body
    const user: User = {
      username: this.username,
      password: this.password,
      email: ''
    }

    this.loading = true;
    this._userService.login(user).subscribe({
      next: (token) =>{
        localStorage.setItem('token', token)
        this.router.navigate(['/dashboard'])
      },
      error: (e: HttpErrorResponse) =>{
        this._errorService.msjError(e)
        this.loading = false;
      }
    })
  }
 
}

