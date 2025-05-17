import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('jwt_token') || sessionStorage.getItem('jwt_token');
  const newReq = token ? req.clone({ headers: req.headers.set('Authorization', `Bearer ${token}`) }) : req;
  console.log('Intercepted request:', newReq);
  return next(newReq);
};
