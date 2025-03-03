function testIPv4Regex(ipAddress: string): boolean {
  const ipv4Regex =
    /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
  return ipv4Regex.test(ipAddress);
}

// Test with sample values
const testCases = [
  { input: "192.168.1.1", expected: true },
  { input: "255.255.255.255", expected: true },
  { input: "0.0.0.0", expected: true },
  { input: "192.168.1", expected: false }, // Incomplete
  { input: "192.168.1.256", expected: false }, // Component > 255
  { input: "192.168.01.1", expected: true }, // Leading zero - actually valid in most implementations
  { input: "192.168.1.1.5", expected: false }, // Too many segments
  { input: "192.168.1.a", expected: false }, // Non-numeric component
];

// Run tests
testCases.forEach((test) => {
  const result = testIPv4Regex(test.input);
  console.log(
    `Testing "${test.input}": ${result === test.expected ? "PASS" : "FAIL"} (got ${result}, expected ${test.expected})`,
  );
});
