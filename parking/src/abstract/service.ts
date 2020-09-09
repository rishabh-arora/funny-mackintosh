export abstract class Service<T> {
  repo: T | undefined;
  setRepo = (repo: T): void => {
    this.repo = repo;
  };
}
