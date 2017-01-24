import { SupersedPage } from './app.po';

describe('supersed App', function() {
  let page: SupersedPage;

  beforeEach(() => {
    page = new SupersedPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
