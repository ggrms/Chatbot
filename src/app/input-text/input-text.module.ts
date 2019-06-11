// Angular Imports
import { NgModule } from '@angular/core';

// This Module's Components
import { InputTextComponent } from './input-text.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [FormsModule],
  declarations: [InputTextComponent],
  exports: [InputTextComponent]
})
export class InputTextModule {}
