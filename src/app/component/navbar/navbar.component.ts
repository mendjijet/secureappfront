import {Component, Input} from '@angular/core';
import {UserService} from "../../service/user.service";
import {Router} from "@angular/router";
import {User} from "../../interface/user";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  @Input() user: User;

  constructor(private router: Router, private userService: UserService) {}
  logOut(): void {
    this.userService.logOut();
    this.router.navigate(['/login']);
  }
}
