import { AppPage } from './app.po';

describe('workout-tracker App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Employee Skill Set Tracker - Dashboard');
  });
});
