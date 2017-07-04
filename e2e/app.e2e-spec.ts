import { SupersedPage } from './app.po';

describe('supersed App', () => {
  let page: SupersedPage;

  beforeEach(() => {
    page = new SupersedPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
