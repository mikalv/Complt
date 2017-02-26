const expect = require('chai').expect;

describe('app', function () {
  it('renders without crashing', function () {
    browser.url('http://localhost:8080/');
    expect(browser.getUrl()).to.equal('http://localhost:8080/inbox');
    expect(browser.$('.md-list--drawer').$$('li')[0].getText()).to.equal('All');
  });
});
