const dynogels = require('dynogels-promisified');
const Joi = require('joi');

dynogels.AWS.config.update({ region: 'us-east-1' });

const Item = dynogels.define('Item', {
  hashKey: 'owner',
  rangeKey: 'id',
  timestamps: true,
  schema: {
    name: Joi.string().required(),
    isProject: Joi.boolean().required(),
    tags: Joi.array(),
    owner: Joi.string().required(),
    id: dynogels.types.uuid(),
    isCompleted: Joi.boolean(),
    projectType: Joi.string().regex(/(seq|para)/),
    children: Joi.array(),
  },
});

const Inbox = dynogels.define('Inbox', {
  hashKey: 'owner',
  rangeKey: 'id',
  timestamps: true,
  tableName: 'items',
  schema: {
    isProject: Joi.boolean().default(true),
    owner: Joi.string().required(),
    id: Joi.string().regex(/inbox/).default('inbox'),
    projectType: Joi.string().regex(/inbox/).default('inbox'),
    children: Joi.array(),
  },
});

const Root = dynogels.define('Root', {
  hashKey: 'owner',
  rangeKey: 'id',
  timestamps: true,
  tableName: 'items',
  schema: {
    isProject: Joi.boolean().default(true),
    owner: Joi.string().required(),
    id: Joi.string().regex(/root/).default('root'),
    projectType: Joi.string().regex(/root/).default('root'),
    children: Joi.array(),
  },
});

module.exports = {
  Item,
  Inbox,
  Root,
};
