import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import {GithubUsers} from '../../providers/github-users/github-users';
import {UserDetailsPage} from '../user-details/user-details';

/*
  Generated class for the UsersPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/users/users.html',

  // Add the GithubUsers provider as part of our page component
  providers: [GithubUsers]
})

export class UsersPage {
  users = [];
  constructor(private navCtrl: NavController, private githubUsers: GithubUsers) {
    // Test whether the github provider returns data
    githubUsers
      .load()
      .then(users => this.users = users);

      /*.then(function (users) {
        // Log the returned github users
        console.log(users)
      });*/

    // Test if our seach function works.
    /*githubUsers
      .searchUsers('ganga')
      .then(users => console.log(users));*/
  }

  goToDetails(event, login) {
    this.navCtrl.push(UserDetailsPage, {
      login: login
    });
  }

  // Search for user's from github  
  // Handle input event from search bar

  search(searchTerm) {
    let term = searchTerm.target.value;

    // We will only perform the search if we have 3 or more characters
    if (term.trim() == '' || term.trim().length < 3) {
      // Get github users and assign to local user's variable
      this.githubUsers
        .load()
        // Load original users in this case
        .then(users => this.users = users)
    }
    else {
      // Get the searched users from github
      this.githubUsers.searchUsers(term)
        .then(users => this.users = users)
    }
  }

}
