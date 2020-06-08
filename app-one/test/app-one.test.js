import { html, fixture, expect } from '@open-wc/testing';

import '../src/containers/main-app.js';

describe('MainApp', () => {
  let element;
  beforeEach(async () => {
    element = await fixture(html`
        <main-app></main-app>
    `);
  });

  it('renders a user profile', () => {
    const userProfile = element.shadowRoot.querySelector('user-profile');
    expect(userProfile).to.exist;
  });

});
