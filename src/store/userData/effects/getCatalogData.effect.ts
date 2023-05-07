import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { map, switchMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import * as dataLoadAction from '../actions/getCatalogData.action';
import { getCatalogDataService } from './../../../app/services/userService/getCatalogData.service';
@Injectable()
export class ProductEffects {
  constructor(
    private actions: Actions,
    private getCatalogData: getCatalogDataService
  ) {}

  loadProductData = createEffect(() =>
    this.actions.pipe(
      ofType(dataLoadAction.ActionTypes.DataLoadBegin),
      switchMap(() => {
        return this.getCatalogData.getProductData().pipe(
          map((data) => new dataLoadAction.DataLoadSuccess({ data: data })),
          catchError((error) =>
            of(new dataLoadAction.DataLoadFailure({ error: error }))
          )
        );
      })
    )
  );
}
