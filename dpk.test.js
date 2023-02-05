const {
  deterministicPartitionKey,
  MAX_PARTITION_KEY_LENGTH,
} = require("./dpk");

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });

  it("Returns the literal '0' when given falsy inputs", () => {
    expect(deterministicPartitionKey(false)).toBe("0");
    expect(deterministicPartitionKey(undefined)).toBe("0");
    expect(deterministicPartitionKey(null)).toBe("0");
    expect(deterministicPartitionKey("")).toBe("0");
    expect(deterministicPartitionKey(0)).toBe("0");
    expect(deterministicPartitionKey(-0)).toBe("0");
    expect(deterministicPartitionKey(NaN)).toBe("0");
  });

  it("Returns the event.partitionKey when present and valid", () => {
    let event = {
      foo: "bar",
      partitionKey:
        "23c8dddfb3ef7ae5d6411aa66363c168a3fa3d762aaaa3d4d33a263492d197eec2a4122974dc950d73e63f2162fe2267443e453f61f8b7f037f5425009bbc82b",
    };
    const trivialKey = deterministicPartitionKey(event);
    expect(trivialKey).toBe(event.partitionKey);
    expect(typeof trivialKey).toBe("string");
    expect(trivialKey.length).toBeGreaterThanOrEqual(1);
    expect(trivialKey.length).toBeLessThan(MAX_PARTITION_KEY_LENGTH);
  });

  it("Returns the event.partitionKey when present but invalid", () => {
    let event = {
      foo: "bar",
      partitionKey:
        "23c8dddfb3ef7ae5d6411aa66363c168a3fa3d762aaaa3d4d33a263492d197eec2a4122974dc950d73e63f2162fe2267443e453f61f8b7f037f5425009bbc82b23c8dddfb3ef7ae5d6411aa66363c168a3fa3d762aaaa3d4d33a263492d197eec2a4122974dc950d73e63f2162fe2267443e453f61f8b7f037f5425009bbc82bb",
    };
    const trivialKey = deterministicPartitionKey(event);
    expect(typeof trivialKey).toBe("string");
    expect(trivialKey.length).toBeGreaterThanOrEqual(1);
    expect(trivialKey.length).toBeLessThan(MAX_PARTITION_KEY_LENGTH);
  });

  it("Partition Key to be less than 256 characters in length but greater than or equal to 1", () => {
    let event = {
      foo: "bar",
    };
    const trivialKey = deterministicPartitionKey(event);
    expect(trivialKey.length).toBeLessThan(MAX_PARTITION_KEY_LENGTH);
    expect(trivialKey.length).toBeGreaterThanOrEqual(1);
  });

  it("Partition Key type is string", () => {
    let event = {
      foo: "bar",
    };
    const trivialKey = deterministicPartitionKey(event);
    expect(typeof trivialKey).toBe("string");
  });
});
