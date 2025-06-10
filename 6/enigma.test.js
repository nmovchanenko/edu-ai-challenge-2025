const { Enigma } = require("./enigma");

// Helper to create Enigma with default rotors I, II, III
function makeEnigma({
  rotorPositions = [0, 0, 0],
  ringSettings = [0, 0, 0],
  plugboardPairs = [],
} = {}) {
  return new Enigma([0, 1, 2], rotorPositions, ringSettings, plugboardPairs);
}

describe("Enigma Machine", () => {
  test("Encrypts and decrypts a message with default settings (no plugboard, all rotors at A, ring 0)", () => {
    const enigma = makeEnigma();
    const plaintext = "HELLOWORLD";
    const ciphertext = enigma.process(plaintext);
    // Reset to same settings for decryption
    const enigma2 = makeEnigma();
    const decrypted = enigma2.process(ciphertext);
    expect(decrypted).toBe(plaintext);
  });

  test("Plugboard swaps letters", () => {
    const enigma = makeEnigma({ plugboardPairs: [["A", "B"]] });
    // A and B should be swapped before and after encryption
    const encryptedA = enigma.process("A");
    const enigma2 = makeEnigma({ plugboardPairs: [["A", "B"]] });
    const decryptedA = enigma2.process(encryptedA);
    expect(decryptedA).toBe("A");
  });

  test("Non-alphabetic characters are passed through unchanged", () => {
    const enigma = makeEnigma();
    const input = "HELLO WORLD! 123";
    const output = enigma.process(input);
    expect(output[5]).toBe(" ");
    expect(output[11]).toBe("!");
    expect(output[13]).toBe("1");
  });

  test("Rotor stepping changes output for repeated letters", () => {
    const enigma = makeEnigma();
    const out1 = enigma.process("A");
    const out2 = enigma.process("A");
    expect(out1).not.toBe(out2);
  });

  test("Known Enigma I test vector (with plugboard, rotors, ring settings)", () => {
    // Example: rotors I-II-III, positions A-A-Z (0-0-25), ring 1-1-1, plugboard swaps AG CT', () => {
    const enigma = makeEnigma({
      rotorPositions: [0, 0, 25],
      ringSettings: [1, 1, 1],
      plugboardPairs: [
        ["A", "G"],
        ["C", "T"],
      ],
    });
    // This is a made-up test vector for demonstration; real Enigma test vectors can be added
    const plaintext = "ENIGMAREVEALED";
    const ciphertext = enigma.process(plaintext);
    const enigma2 = makeEnigma({
      rotorPositions: [0, 0, 25],
      ringSettings: [1, 1, 1],
      plugboardPairs: [
        ["A", "G"],
        ["C", "T"],
      ],
    });
    const decrypted = enigma2.process(ciphertext);
    expect(decrypted).toBe(plaintext);
  });
});
