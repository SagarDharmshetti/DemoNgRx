import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
// import { metaReducers, reducers } from 'src/app/reducers';
import { metaReducers, reducers } from '../app/reducers/index';

import { loadingReducer } from './loading/loading.reducer';

// import { LoginEffects } from './login/login.effect';
import { loginReducer } from './login/login.reducer';

export const AppStoreModule = [
  StoreModule.forRoot([]),
  StoreModule.forFeature('loading', loadingReducer),
  StoreModule.forFeature('login', loginReducer),
  EffectsModule.forRoot([]),
  StoreModule.forRoot(reducers, { metaReducers }),
];
