const expect = require('chai').expect;
const fs = require('fs');

describe('app', function () {
  it('renders without crashing', function () {
    browser.url('http://localhost:8080/');
    expect(browser.getUrl()).to.equal('http://localhost:8080/inbox');
    expect(browser.$('.md-list--drawer').$$('li')[0].getText()).to.equal('All');
  });
  it('can add a task to the inbox', function () {
    const input = $('#add-item-input');
    input.setValue('Task in inbox @tag');
    $('#add-tag').click();
    input.addValue('tag2');
    $('#add-item-submit').click();
    const listItem = $('main').$('.md-list').$('.md-list-item');
    const textElement = listItem.$('.md-tile-text--primary');
    const chipContainer = listItem.$('.Item-chip-container');
    const chips = chipContainer.$$('.md-chip');
    expect(textElement.getText()).to.equal('Task in inbox');
    expect(chips[0].$('span').getText()).to.equal('@tag');
    expect(chips[1].$('span').getText()).to.equal('@tag2');
    let performance;
    try {
      performance = browser.log('performance');
    } catch (e) {
      console.log(e); // eslint-disable-line no-console
    }
    if (performance) {
      fs.writeFileSync(`${new Date().toString()}-${Math.random()}-timeline.json`, performance);
    }
  });
});
