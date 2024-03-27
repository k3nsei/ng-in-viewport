import { generateRandomUID } from './generate-random-uid';

describe('GIVEN generateRandomUID', () => {
  describe('WHEN generating UID`', () => {
    it('THEN result should be a string', () => {
      const id = generateRandomUID();
      expect(typeof id).toBe('string');
    });
  });

  describe('WHEN generating multiple UIDs', () => {
    it('THEN it should generate a unique ID each time it is called', () => {
      const id1 = generateRandomUID();
      const id2 = generateRandomUID();
      expect(id1).not.toEqual(id2);
    });
  });

  describe('WHEN getting UID with prefix set to `test-`', () => {
    it('THEN it should include the specified prefix', () => {
      const prefix = 'test-';
      const id = generateRandomUID(prefix);
      expect(id.startsWith(prefix)).toBe(true);
    });
  });

  describe('WHEN specifying a length and prefix', () => {
    it('THEN it should generate an UID of the correct length when a prefix is specified', () => {
      const prefix = 'test-';
      const length = 10;
      const id = generateRandomUID(prefix, length);
      // Total length = prefix length + specified length
      expect(id.length).toBe(prefix.length + length);
    });
  });

  describe('WHEN specifying just length', () => {
    it('THEN it should generate an ID of the correct length when no prefix is specified', () => {
      const length = 10;
      const id = generateRandomUID('', length);
      expect(id.length).toBe(length);
    });
  });
});
