const [ Lazy ] = require('..')

test('Lazy should create a new lazy instance', () => {
  const result = Lazy(() => 2)
  expect(result).toBeInstanceOf(Lazy);
})
