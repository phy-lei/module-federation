import { VNode } from 'vue';

declare global {
  type PromiseReturnType<T extends (...args: any[]) => any> = ReturnType<T> extends Promise<infer R>
    ? R
    : ReturnType<T>;
  type JSXElement = () => VNode;
}
