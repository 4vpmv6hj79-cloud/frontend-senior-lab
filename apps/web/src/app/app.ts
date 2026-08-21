import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { WatermarkComponent } from './shared/components/watermark/watermark';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, WatermarkComponent],
  templateUrl: './app.html',
})
export class App {}
