import { EditUserService } from '../../_services/editUser.service';
import { StateStorageService } from '../../_services/stateStorage.service';
import { UserMemberService } from '../../_services/userMember.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserMemberModel } from '../../_models/UserMemberModel';
import { HttpClient } from '@angular/common/http';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'app-editUsername',
  templateUrl: './editUsername.component.html',
  styleUrls: ['./editUsername.component.scss']
})
export class EditUsernameComponent implements OnInit {
  editForm: FormGroup;
  currentUserData;
  role;
  userMemberModels;

  constructor(
    private userMemberService: UserMemberService,
    private stateStorageService: StateStorageService,
    private editUserService: EditUserService,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient) { }

  ngOnInit() {
    this.userMemberModels = this.stateStorageService.getUserMemberStorage();
    this.CreateForm();
  }

  UpdateUser() {
      this.editUserService.putEditName(
        this.editForm.value.currentUserName,
        this.editForm.value.firstname,
        this.editForm.value.LastName).subscribe(next => {
        alert('update sucessful');
    }, error => {
        console.log(error);
    });
  }

  CreateForm() {
    this.editForm = new FormGroup({
      currentUserName: new FormControl(''),
      firstname: new FormControl(''),
      LastName: new FormControl('')
    });
  }


  loggedIn() {
    const token = localStorage.getItem('token');
    return !!token;
  }

  loggedOut() {
    const token = localStorage.removeItem('token');
    console.log('logged out');
  }

  sendUserButtonClick(id) {
    console.log('button clicked');
  }
}

