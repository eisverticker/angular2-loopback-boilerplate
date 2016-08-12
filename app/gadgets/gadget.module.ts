import { NgModule } from '@angular/core';

//components
import { DeleteButtonComponent } from './delete-button.component';
import { ResultPieChartComponent } from './result-pie-chart.component';

//directives
import { CHART_DIRECTIVES } from 'ng2-charts/ng2-charts';

//modules
import { BrowserModule  } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';

@NgModule({
    declarations: [
      DeleteButtonComponent,
      ResultPieChartComponent,
      CHART_DIRECTIVES
    ],
    imports:      [BrowserModule, FormsModule],
    bootstrap:    [],
    providers: []
})
export class GadgetModule {}
