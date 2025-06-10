# Enigma Machine Bug and Fix Description

## Bug

The Enigma implementation only applied the plugboard swaps before the rotors and reflector. In the historical Enigma machine, the plugboard must be applied both before and after the main rotor/reflector path. This omission caused encryption and decryption to fail, especially when plugboard swaps were used, resulting in incorrect output and failed tests.

## Fix

The code was updated to apply the plugboard swap a second time, after the signal passes through the rotors and reflector, just before returning the character in the `encryptChar` method. This restores historically accurate Enigma behavior and ensures that encryption and decryption are correct when using plugboard swaps.

A code comment was added to clarify this fix in the implementation.
