import MockDate from 'mockdate';
import { DUE_DATE } from '../getNextDueDate';
import processItem from '../processItem';

describe('processItem(value, type)', () => {
  it('returns null if the value is empty', () => {
    expect(processItem('', false)).toEqual(null);
  });
  it('returns null if the value only contains spaces', () => {
    expect(processItem('      ', false)).toEqual(null);
  });
  it('returns null if the value only contains tags', () => {
    expect(processItem('@tag @tag2', false)).toEqual(null);
  });
  it('returns a object with isProject === true if the isProject value passed is false', () => {
    expect(processItem('Some Task', false).isProject).toEqual(false);
  });
  it('returns a object with isProject === false if the isProject value passed is false', () => {
    expect(processItem('Some Project', true).isProject).toEqual(true);
  });
  it('returns an object with a name and tags if it is passed the type Task with a value containing a name and tags', () => {
    expect(processItem('Some Task @tag', false)).toEqual({
      isProject: false,
      name: 'Some Task',
      tags: ['@tag'],
      isCompleted: false,
      dates: [],
    });
  });
  it('returns an object with a name and tags if it is passed the type Task with a value containing a name and tags', () => {
    expect(processItem('Some Project @tag', true)).toEqual({
      isProject: true,
      name: 'Some Project',
      tags: ['@tag'],
      isCompleted: false,
      children: [],
      dates: [],
    });
  });
  it('returns an object with a name and an empty array for tags if it is passed the type Task with a value containing a name without tags', () => {
    expect(processItem('Some Task', false)).toEqual({
      isProject: false,
      name: 'Some Task',
      tags: [],
      isCompleted: false,
      dates: [],
    });
  });
  it('trims off white space', () => {
    expect(processItem(' Some Task @tag ', false)).toEqual({
      isProject: false,
      name: 'Some Task',
      tags: ['@tag'],
      isCompleted: false,
      dates: [],
    });
  });
  it('returns an object without a date with an invalid date in the name if an invalid date is in the value', () => {
    expect(
      processItem('Some Task with a !some invalid date! @tag', false)
    ).toEqual({
      isProject: false,
      tags: ['@tag'],
      isCompleted: false,
      dates: [],
      name: 'Some Task with a !some invalid date!',
    });
  });
  it('returns an object with a date if a valid date is in the input', () => {
    MockDate.set('2017-04-02T00:00:00.000Z');
    expect(
      processItem(
        'Some Task with a due date !Tue, 04 Apr 2017 07:00:00 GMT! @tag',
        false
      )
    ).toEqual({
      isProject: false,
      tags: ['@tag'],
      isCompleted: false,
      dates: [
        {
          dateType: DUE_DATE,
          value: '2017-04-04T07:00:00.000Z',
        },
      ],
      name: 'Some Task with a due date',
    });
  });
});
