import { Component } from '@angular/core';
import { shouldNotReference } from "../not-referencing/should-not";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'limehome-full-stack-challenge';
}
shouldNotReference()
