/**
 * 修补 `Array.prototype.filter(Boolean)` 的推断问题，见
 * https://github.com/microsoft/TypeScript/issues/16655
 *
 * 例如下方 `bar` 可正确推断为 `string[]`：
 *
 *  const foo: (string | null | undefined)[] = [];
 *  const bar = foo.filter(Boolean);
 *
 * 相关定义见 https://github.com/microsoft/TypeScript/blob/master/src/lib/es5.d.ts
 *
 * 原许可：
 *  - https://github.com/microsoft/TypeScript/blob/master/LICENSE.txt
 *  - https://stackoverflow.com/help/licensing
 */

/** 见 https://stackoverflow.com/a/51390763/1470607 */
type Falsy = false | 0 | "" | null | undefined

interface Array<T> {
  /**
   * 返回数组中通过回调测试的元素。
   * @param predicate 最多三个参数；对每个元素调用一次。
   * @param thisArg 回调中 `this`；省略则为 undefined。
   */
  filter<S extends T>(predicate: BooleanConstructor, thisArg?: any): Exclude<S, Falsy>[]
}
