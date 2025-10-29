import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private toastController: ToastController;

  constructor(toastController: ToastController) {
    this.toastController = toastController;
  }

   async showToast(message: string, duration: number = 2000, position: 'bottom', color: string) {
    const toast = await this.toastController.create({
      message,
      duration,
      position,
      color,
    });
    await toast.present();
  }
}