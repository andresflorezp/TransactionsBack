import React from 'react';
import Box from '@material-ui/core/Box';

const defaultProps = {
  bgcolor: 'background.paper',
  m: 3,
  style: { width: '5rem', height: '5rem' },
  borderColor: 'text.primary',
};

export default function BorderAdditive() {
  return (
    <Box border={1} {...defaultProps} />
     
  
  );
}