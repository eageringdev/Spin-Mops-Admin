import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataCollectorService {

  public productObject: any;
  public orderObject: any;
  public cleanerTimeSheetObj: any;

  public filterProducts: any = false;
  public filterCategoryKey: any;

  public editCleaner: any = false;
  public cleanerObject: any;

  public editDrivers: any = false;
  public driverObject: any;


  public editCleaningService: any = false;
  public cleaningServiceObject: any;

  public editProduct = false;
  public editProductObject: any;


  constructor() {

  }
}
