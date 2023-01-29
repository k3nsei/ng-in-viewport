import { InViewportDirection } from '../enums';

import { Config, checkFnId, configHash } from './config';

describe('GIVEN Config', () => {
  it('todo', () => {
    expect(1).toBe(1);
  });

  describe('WHEN created with nullable options', () => {
    let instance: Config;

    beforeEach(() => {
      instance = new Config(undefined);
    });

    it('THEN instance should exists', () => {
      expect(instance).toBeTruthy();
    });

    it('THEN hash should match', () => {
      expect(instance[configHash]).toBe(
        'Y2hlY2tGbjppbi12aWV3cG9ydC1lbXB0eS1jaGVjay1mbiU3Q2RpcmVjdGlvbjp2ZXJ0aWNhbCU3Q3BhcnRpYWw6dHJ1ZSU3Q3Jvb3RNYXJnaW46MHB4JTIwMHB4JTIwMHB4JTIwMHB4JTdDdGhyZXNob2xkOiU1QjAsMSU1RA=='
      );
    });
  });

  describe('WHEN created with valid options', () => {
    let instance: Config;
    let node: HTMLDivElement;

    beforeEach(() => {
      node = Object.assign(document.createElement('div'), {
        classname: `c-${Date.now()}`,
      });

      instance = new Config({
        root: node,
        rootMargin: '1px 2px 3px 4px',
        threshold: [0, 0.24, 0.5, 0.75, 1],
        partial: false,
        direction: InViewportDirection.HORIZONTAL,
      });
    });

    it('THEN instance should exists', () => {
      expect(instance).toBeTruthy();
    });

    it('THEN root should match provided node', () => {
      expect(instance.root).toBe(node);
    });

    it('THEN hash should match', () => {
      expect(instance[configHash]).toBe(
        'Y2hlY2tGbjppbi12aWV3cG9ydC1lbXB0eS1jaGVjay1mbiU3Q2RpcmVjdGlvbjpob3Jpem9udGFsJTdDcGFydGlhbDpmYWxzZSU3Q3Jvb3RNYXJnaW46MXB4JTIwMnB4JTIwM3B4JTIwNHB4JTdDdGhyZXNob2xkOiU1QjAsMC4yNCwwLjUsMC43NSwxJTVE'
      );
    });

    it('THEN checkFnId should match', () => {
      expect(instance[checkFnId]).toBe('in-viewport-empty-check-fn');
    });
  });

  describe('WHEN created with valid options and custom check fn', () => {
    let instance: Config;
    let node: HTMLDivElement;

    beforeEach(() => {
      node = Object.assign(document.createElement('div'), {
        classname: `c-${Date.now()}`,
      });

      instance = new Config({
        root: node,
        rootMargin: '1px 2px 3px 4px',
        threshold: [0, 0.24, 0.5, 0.75, 1],
        partial: false,
        direction: InViewportDirection.HORIZONTAL,
        checkFn: jest.fn(),
      });
    });

    it('THEN instance should exists', () => {
      expect(instance).toBeTruthy();
    });

    it('THEN root should match provided node', () => {
      expect(instance.root).toBe(node);
    });

    it('THEN hash should match', () => {
      expect(instance[configHash]).toBe(
        'Y2hlY2tGbjppbi12aWV3cG9ydC1jaGVjay1mbi0zJTdDZGlyZWN0aW9uOmhvcml6b250YWwlN0NwYXJ0aWFsOmZhbHNlJTdDcm9vdE1hcmdpbjoxcHglMjAycHglMjAzcHglMjA0cHglN0N0aHJlc2hvbGQ6JTVCMCwwLjI0LDAuNSwwLjc1LDElNUQ='
      );
    });

    it('THEN checkFnId should match', () => {
      expect(instance[checkFnId]).toBe('in-viewport-check-fn-4');
    });
  });
});
