
import React, { PureComponent } from 'react';

import HorizontalList from './components/HorizontalList';

class Main extends PureComponent {
  render() {
    const { schools, onChangeAddressType } = this.props;
    return (
      <section id="main">
        <HorizontalList
          onChangeAddressType={onChangeAddressType}
          schools={schools}
          allowCategory={1}
        />
        <HorizontalList
          onChangeAddressType={onChangeAddressType}
          schools={schools}
          allowCategory={2}
        />
      </section>
    );
  }
}

export default Main;
