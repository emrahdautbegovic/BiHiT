import { BihitWebPage } from './app.po';

describe('bihit-web App', () => {
  let page: BihitWebPage;

  beforeEach(() => {
    page = new BihitWebPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
