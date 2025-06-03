import { Component, OnInit, Input } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})

/**
 * Shows the user info stored in database
 * @user data of specific user
 * @favorites an array of favorite movies from the user
 * 
 */
export class UserProfileComponent implements OnInit {

  userData: any = {};

  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar) {

    let user = JSON.parse(localStorage.getItem("user") || "");
    this.userData.userName = user.userName;
    this.userData.firstName = user.firstName;
    this.userData.lastName = user.lastName;
    this.userData.email = user.email;
    this.userData.birthDate = new Date(user.birthDate).toISOString().split('T')[0];
    this.userData.password = null;
  }

  ngOnInit(): void {
  }

  /**
   * the updatedUser object is stored in the database
   */
  updateUser(): void {
    let user: any = {};
    user.userName = this.userData.userName;
    user.firstName = this.userData.firstName;
    user.lastName = this.userData.lastName;
    if (this.userData.password) {
      user.password = this.userData.password;
    }
    user.birthDate = this.userData.birthDate;

    this.fetchApiData.editUser(user).subscribe((result) => {
      this.snackBar.open('Profile updated', 'OK', {
        duration: 2000
      });
    }, (result) => {
      this.snackBar.open(result, 'OK', {
        duration: 2000
      });
    });
  }
}
