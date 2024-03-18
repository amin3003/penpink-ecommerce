import React from 'react';
const state = {
  zoom: 1,
  pages: 3,
  sections: 3,

  top: React.createRef<number>() as React.MutableRefObject<number>,
};

export default state;
