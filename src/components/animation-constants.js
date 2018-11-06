/** @type {{(id: string, payload: { buildIn?: object, actions: object[], buildOut?: object }, fn: (actionId: string | number) => void): function(): void}} */
// @ts-ignore
export const REGISTER = Symbol('register')
