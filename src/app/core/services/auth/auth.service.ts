import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CommonService } from '../common.service';

@Injectable()
export class AuthService {

  referralRoute: string;
  jwtHelper = new JwtHelperService();

  constructor(
    private router: Router,
    private common: CommonService,
    private location: Location
  ) {}

  isLoggedIn(): Boolean {
    if (localStorage.getItem('AGENCY_ID') && localStorage.getItem('USER_ID')) {
      return true;
    } else {
      return false;
    }
  }

  getAccessToken(): string {
    return localStorage.getItem('ACCESS_TOKEN');
  }

  /**
   * Reusable logic for checking expiration of a token
   * @param {string} key The key of the token that used in localStorage
   */
  private isTokenExpired(key: string): boolean {
    if (this.isTokenInvalid(key)) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * Checking the structure of the a token whether it's a valid JWT or not.
   * @param key The key of the token that used in localStorage
   */
  private isTokenInvalid(key: string) {
    const token = localStorage.getItem(key);
    if (!token) {
      return true;
    }
    return false;
  }

  logout() {
    localStorage.removeItem('AGENCY_ID');
    localStorage.removeItem('USER_ID');
    this.common.setCurrentUser(null);
    this.common.setCurrentAgencies(null);
    this.router.navigateByUrl('/auth/login');
  }
}
