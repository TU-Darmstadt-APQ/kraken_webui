import SetupMongoDBConnection from '../components/SetupMongoDBConnection';

describe('SetupMongoDBConnection', () => {
  it('should not throw any errors when imported and called', () => {
    // Test that the function can be called without errors
    expect(() => {
      SetupMongoDBConnection();
    }).not.toThrow();
  });
});