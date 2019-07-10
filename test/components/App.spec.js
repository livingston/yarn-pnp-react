import React from 'react';
import { render } from '@testing-library/react';

import App from 'components/App';

describe('App', () => {
  it('should render the component', () => {
    const { container, asFragment } = render(<App />);

    expect(container.firstChild.textContent).toContain('Hello, how are you?');

    expect(asFragment()).toMatchSnapshot();
  });
});
