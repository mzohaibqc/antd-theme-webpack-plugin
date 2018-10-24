import React from 'react';
import PropTypes from 'prop-types';
import {
  connect
} from 'dva';

import styles from './page02.less';

import Main from '../layouts/main.jsx';

function Page02({
  location
}) {
  return (
    <Main location={location}>
      <div className={styles.normal}>
        Route Component: Page02
      </div>
    </Main>
  );
}

Page02.propTypes = {
  location: PropTypes.object.isRequired
};

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(Page02);
