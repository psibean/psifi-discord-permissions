
export default class RequestError extends Error {
  public code: number;

  public constructor(code: number, message: string) {
    super(message);
    this.code = code;
  }
}