export abstract class Repository<T> {
  objects: T[] = [];
  abstract create(body: any): T;
  abstract exists(body: any): T | undefined;
}
