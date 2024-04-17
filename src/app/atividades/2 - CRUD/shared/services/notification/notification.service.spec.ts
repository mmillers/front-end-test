/* tslint:disable:no-unused-variable */

import { TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { of } from 'rxjs';
import { NotificationService } from './notification.service';

describe('Service: Notification', () => {
  let notificationService: NotificationService;
  let snackBar: MatSnackBar;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: MatSnackBar,
          useValue: {
            open: () => of({}),
          }
        }],
    });
    notificationService = TestBed.inject(NotificationService);
    snackBar = TestBed.inject(MatSnackBar);
  });

  it('should create', () => {
    expect(notificationService).toBeDefined();
  })

  it('should trigger open from snackBar when showNotification called ', () => {
    const spy = spyOn(snackBar, 'open').and.callThrough();
    notificationService.showNotification('test');
    expect(spy).toHaveBeenCalled();
  });
});
