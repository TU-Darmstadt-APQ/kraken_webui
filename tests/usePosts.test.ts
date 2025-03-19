import { filterBoolean } from "@/hooks/usePosts";
import { tinkerforgeDTO } from "@/models/zTinkerforgeSensor.schema";

describe("filterBoolean", () => {
  test("should return true for 'on', 'enabled', 'true' when post.enabled is true", () => {
    const post: tinkerforgeDTO = { enabled: true } as tinkerforgeDTO;

    expect(filterBoolean("on", post)).toBe(true);
    expect(filterBoolean("enabled", post)).toBe(true);
    expect(filterBoolean("true", post)).toBe(true);
  });

  test("should return true for 'off', 'disabled', 'false' when post.enabled is false", () => {
    const post: tinkerforgeDTO = { enabled: false } as tinkerforgeDTO;

    expect(filterBoolean("off", post)).toBe(true);
    expect(filterBoolean("disabled", post)).toBe(true);
    expect(filterBoolean("false", post)).toBe(true);
  });

  test("should return false for unsupported query values", () => {
    const post: tinkerforgeDTO = { enabled: true } as tinkerforgeDTO;

    expect(filterBoolean("yes", post)).toBe(false);
    expect(filterBoolean("no", post)).toBe(false);
    expect(filterBoolean("randomText", post)).toBe(false);
  });

  test("should return false if the query matches but the post.enabled state does not", () => {
    const postTrue: tinkerforgeDTO = { enabled: true } as tinkerforgeDTO;
    const postFalse: tinkerforgeDTO = { enabled: false } as tinkerforgeDTO;

    expect(filterBoolean("off", postTrue)).toBe(false);
    expect(filterBoolean("enabled", postFalse)).toBe(false);
    expect(filterBoolean("undefined", postTrue)).toBe(false);
  });
});
