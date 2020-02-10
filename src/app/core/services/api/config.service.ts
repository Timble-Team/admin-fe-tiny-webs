import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})

export class AppConfigService {
	static settings: any;

  constructor(
		private api: ApiService
	) {}

	load() {
		AppConfigService.settings = window['config'];
    return window['firebase_config'];
	}
}
