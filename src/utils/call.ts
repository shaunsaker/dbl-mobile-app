import {
  call as sagaCall,
  CallEffect,
  SagaReturnType,
} from 'redux-saga/effects';

export function call<Ctx, Fn extends (this: Ctx, ...args: any[]) => any>(
  ctxAndFn: [Ctx, Fn],
  ...args: Parameters<Fn>
): Generator<CallEffect, SagaReturnType<Fn>, SagaReturnType<Fn>>;

export function call<Fn extends (...args: any[]) => any>(
  fn: Fn,
  ...args: Parameters<Fn>
): Generator<CallEffect, SagaReturnType<Fn>, SagaReturnType<Fn>>;

export function* call<Fn extends (...args: any[]) => any>(
  fn: Fn,
  ...args: Parameters<Fn>
): Generator<CallEffect, SagaReturnType<Fn>, SagaReturnType<Fn>> {
  return yield sagaCall(fn, ...args);
}
