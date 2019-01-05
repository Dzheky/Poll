import React from 'react';
import {shuffle} from './PollModel';

describe('shuffle', () => {
  it('shuld return shuffled array', () => {
    const arr = [1, 2, 3, 4, 5];
    const shuffledArr = shuffle(arr);

    expect(arr).not.toEqual(shuffledArr);
  });
});

