const expect = require('chai').expect;
const SauceLabs = require('saucelabs');

describe('app', function() {
  it('renders without crashing', function() {
    browser.url('http://localhost:8080/');
    expect(browser.getUrl()).to.equal('http://localhost:8080/inbox');
    expect(
      browser.$('.mdc-toolbar__row').$('.mdc-select__selected-text').getText()
    ).to.equal('All');
  });
  it('can add a task to the inbox', function() {
    const input = $('#add-item-input');
    input.waitForExist(5000);
    input.setValue('Task in inbox @tag');
    // $('#add-tag').click();
    // console.log(input.getValue());
    // input.addValue('tag2');
    $('#add-item-submit').click();
    const listItem = $('main').$('.Item').$('.Item-center');
    const textElement = listItem.$('.Item-name');
    const chipContainer = listItem.$('.Item-chip-container');
    const chips = chipContainer.$$('.chip');
    expect(textElement.getText()).to.equal('Task in inbox');
    expect(chips[0].getText()).to.equal('@tag');
    // expect(chips[1].$('span').getText()).to.equal('@tag2');
  });
  after(function(cb) {
    if (process.env.GITLAB_CI) {
      const sauceLabs = new SauceLabs({
        username: process.env.SAUCE_USERNAME,
        password: process.env.SAUCE_ACCESS_KEY,
      });
      sauceLabs.updateJob(
        browser.session().sessionId,
        { build: process.env.CI_PIPELINE_ID },
        cb
      );
    }
  });
});
