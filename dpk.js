const crypto = require("crypto");

const MAX_PARTITION_KEY_LENGTH = 256;

exports.MAX_PARTITION_KEY_LENGTH = MAX_PARTITION_KEY_LENGTH;

exports.deterministicPartitionKey = (event) => {
  const TRIVIAL_PARTITION_KEY = "0";

  let candidate = TRIVIAL_PARTITION_KEY;

  if (!event) {
    return candidate;
  }

  if (event && event.partitionKey) {
    candidate = event.partitionKey;

    if (typeof candidate !== "string") {
      candidate = JSON.stringify(candidate);
    }
    if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
      candidate = crypto.createHash("sha3-512").update(candidate).digest("hex");
    }
    return candidate;
  }

  const data = JSON.stringify(event);
  candidate = crypto.createHash("sha3-512").update(data).digest("hex");

  return candidate;
};

exports.deterministicPartitionKey();
