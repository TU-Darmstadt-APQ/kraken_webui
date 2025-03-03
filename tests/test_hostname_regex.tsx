function testHostnameRegex(hostname: string): boolean {
  const hostnameRegex =
    /^(?=.{1,255}$)([0-9A-Za-z](?:(?:[0-9A-Za-z]|-){0,61}[0-9A-Za-z])?(?:\.[0-9A-Za-z](?:(?:[0-9A-Za-z]|-){0,61}[0-9A-Za-z])?)*\.?)$/;
  return hostnameRegex.test(hostname);
}

// Test with valid hostnames
const validHostnames = [
  { input: "example.com", expected: true },
  { input: "sub.example.com", expected: true },
  { input: "my-domain.com", expected: true },
  { input: "a", expected: true }, // Single character domain
  { input: "a.b.c", expected: true }, // Short labels
  { input: "123.com", expected: true }, // Numeric start is valid for hostnames
];

// Test with invalid hostnames
const invalidHostnames = [
  { input: "domain..com", expected: false }, // Double dots
  { input: "-domain.com", expected: false }, // Starting with hyphen
  { input: "domain-.com", expected: false }, // Label ending with hyphen
  { input: "domain_name.com", expected: false }, // Underscore (invalid in hostnames)
  { input: "a".repeat(256), expected: false }, // Too long (>255 chars)
];

// Test with invalid IPv4 addresses to see if the hostname regex accepts them
const invalidIPv4s = [
  { input: "192.168.1", expected: false }, // Incomplete IPv4
  { input: "192.168.1.256", expected: false }, // Invalid octet (>255)
  { input: "192.168.01.1", expected: false }, // Should not be accepted as hostname with leading zeros
  { input: "192.168.1.1.5", expected: false }, // Too many segments
  { input: "192.168.1.a", expected: false }, // Non-numeric component
];

// Run valid hostname tests
console.log("\n=== VALID HOSTNAME TESTS ===");
validHostnames.forEach((test) => {
  const result = testHostnameRegex(test.input);
  console.log(
    `Testing "${test.input}": ${result === test.expected ? "PASS" : "FAIL"} (got ${result}, expected ${test.expected})`,
  );
});

// Run invalid hostname tests
console.log("\n=== INVALID HOSTNAME TESTS ===");
invalidHostnames.forEach((test) => {
  const result = testHostnameRegex(test.input);
  console.log(
    `Testing "${test.input}": ${result === test.expected ? "PASS" : "FAIL"} (got ${result}, expected ${test.expected})`,
  );
});

// Run invalid IPv4 tests
console.log(
  "\n=== INVALID IPV4 TESTS (should not be accepted as hostnames) ===",
);
invalidIPv4s.forEach((test) => {
  const result = testHostnameRegex(test.input);
  console.log(
    `Testing "${test.input}": ${result === test.expected ? "PASS" : "FAIL"} (got ${result}, expected ${test.expected})`,
  );
});
