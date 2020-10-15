export function raisesError(cb: Function, message: string) {
  try {
    cb();
  } catch (error) {
    expect(error.message).toEqual(message);
  }
}
