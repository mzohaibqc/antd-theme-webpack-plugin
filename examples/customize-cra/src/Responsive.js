import React from 'react';
import Responsive from 'react-responsive';
 
const XXL = props => <Responsive {...props} minWidth={1601} />;
const XL = props => <Responsive {...props} minWidth={1200} maxWidth={1600} />;
const Desktop = props => <Responsive {...props} minWidth={992} />;
const Tablet = props => <Responsive {...props} minWidth={768} maxWidth={991} />;
const Mobile = props => <Responsive {...props} maxWidth={575} />;
const Default = props => <Responsive {...props} minWidth={576} />;

export {
  XXL,
  XL,
  Desktop,
  Tablet,
  Mobile,
  Default
};
