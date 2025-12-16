import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';

// Angular Material Modules
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-c-popup',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './c-popup.html',
  styleUrls: ['./c-popup.scss']
})
export class CPopup implements OnInit {
  form: FormGroup;
  formKeys: string[] = [];

  constructor(
    public dialogRef: MatDialogRef<CPopup>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public dialogData: { mode: 'create' | 'edit' | 'delete', data: any }
  ) {
    // Initialize formKeys and form in constructor
    if (this.dialogData.data) {
      this.formKeys = Object.keys(this.dialogData.data);
    }
    this.form = this.fb.group({});
  }

  ngOnInit(): void {
    // Build the form controls based on the data keys
    if (this.dialogData.mode !== 'delete') {
      const controls: { [key: string]: any } = {};
      this.formKeys.forEach(key => {
        const value = this.dialogData.data[key];
        const control = this.fb.control({ value: value, disabled: key === 'id' }, Validators.required);
        controls[key] = control;
      });
      this.form = this.fb.group(controls);
    }
  }

  onClose(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.form.valid) {
      this.dialogRef.close(this.form.getRawValue());
    }
  }

  onDelete(): void {
    this.dialogRef.close(true);
  }
}