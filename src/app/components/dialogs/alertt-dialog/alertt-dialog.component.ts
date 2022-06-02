import { MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-alertt-dialog',
  templateUrl: './alertt-dialog.component.html',
  styleUrls: ['./alertt-dialog.component.css']
})
export class AlerttDialogComponent implements OnInit {
dialogBaslik: string;
dialogMesaj: string;
dialogIslem: boolean;  

  constructor(
    public dialogRef:MatDialogRef<AlerttDialogComponent>
  ) { }

  ngOnInit() {
  }

}
