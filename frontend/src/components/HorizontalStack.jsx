import * as React from 'react';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "transparent",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: "#AEAEAE",
}));

export default function HorizontalStack() {
  return (
    <div style={{margin: "0 40px 0 auto"}}>
      <Stack
        direction="row"
        divider={<Divider sx={{bgcolor: "#FFFFFF"}} orientation="vertical" flexItem />}
        spacing={2}
      >
        <Item>489K+<br/>Active Users</Item>
        <Item>76K+<br/>Collections</Item>
        <Item>243K+<br/>Artworks</Item>
      </Stack>
    </div>
  );
}
