// This file is just used for tests.
export default [
  {
    isProject: false,
    name: 'task',
    isCompleted: false,
    tags: ['@tag'],
    _id: '7e8fb257-327a-4d8d-b99a-598185176258',
  },
  {
    isProject: false,
    name: 'task',
    isCompleted: false,
    tags: ['@tag2'],
    _id: '17a46d0e-bc94-4398-ad26-893e6a8ca3bd',
  },
  {
    isProject: true,
    children: [
      '7e8fb257-327a-4d8d-b99a-598185176258',
      '17a46d0e-bc94-4398-ad26-893e6a8ca3bd',
    ],
    _id: 'inbox',
  },
  {
    isProject: false,
    name: 'task',
    isCompleted: false,
    tags: ['@tag3'],
    _id: '6c4c2b5f-71cd-4194-994f-da42a9d275c3',
  },
  {
    isProject: true,
    name: 'project',
    children: [],
    isCompleted: false,
    tags: ['@tag3'],
    _id: '58aa7f62-d5fa-4c8e-aa3a-87b9e4e82ba3',
  },
  {
    isProject: true,
    children: [
      '6c4c2b5f-71cd-4194-994f-da42a9d275c3',
      '58aa7f62-d5fa-4c8e-aa3a-87b9e4e82ba3',
    ],
    _id: 'root',
  },
];
