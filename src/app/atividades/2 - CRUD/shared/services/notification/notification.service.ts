import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private snackBar: MatSnackBar) {}

  showNotification(message: string) {
    this.snackBar.open(message, 'x', {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: 5000,
    })
  }

}
