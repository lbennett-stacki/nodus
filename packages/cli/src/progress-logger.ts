import {Observable} from 'rxjs'

export type ProgressLoggerCallback = (progressLogger: ProgressLogger) => Promise<void>;

export class ProgressLogger {
  constructor(private readonly observable: Observable) {}

  log(message: string): void {
    this.observable.next(message)
  }

  complete(): void {
    this.observable.complete()
  }

  static observe(callback: ProgressLoggerCallback): Observable {
    const observable = new Observable(async observable => {
      const logger = new ProgressLogger(observable)
      await callback(logger)
      logger.complete()
    })

    return observable
  }
}
