import { MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-confirmm-dialog',
  templateUrl: './confirmm-dialog.component.html',
  styleUrls: ['./confirmm-dialog.component.scss']
})
export class ConfirmmDialogComponent implements OnInit {
  dialogMesaj: string;

  constructor(
    public dialogRef: MatDialogRef<ConfirmmDialogComponent>
  ) { }

  ngOnInit() {
  }

}
