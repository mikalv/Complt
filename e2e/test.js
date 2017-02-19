const expect = require('chai').expect;

describe('app', function () {
  it('renders without crashing', function () {
    browser.url('/');
    browser.waitForExist('main', 5000);
    expect(browser.getUrl()).to.equal('https://app.complt.xyz/inbox');
    expect(browser.$('.md-list--drawer').$$('li')[0].getText()).to.equal('All');
  });
});
