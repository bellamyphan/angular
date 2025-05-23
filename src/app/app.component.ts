import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './service/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  title = 'angular-frontend';
  username: string | null = null;

  constructor(
    private router: Router,
    private authService: AuthenticationService // Assuming you have an AuthenticationService to manage tokens
  ) {}

  ngOnInit(): void {
    // Subscribe to the username$ Observable to update username dynamically
    this.authService.username$.subscribe((username) => {
      this.username = username;
    });
  }

  toggleLoginLogout(): void {
    if (this.username) {
      // If the user is logged in, log them out
      this.authService.logout();
      alert('You have been logged out successfully!'); // Show alert for logout
      this.router.navigate(['/main-menu']); // Navigate to the main menu after logout
    } else {
      // If no user is logged in, navigate to the login page
      this.router.navigate(['/user-login']); // Navigate to the login page if not logged in
    }
  }
}
