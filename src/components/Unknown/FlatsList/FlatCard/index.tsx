import React from 'react';
import Grid from '@mui/material/Grid';
import { Card, CardMedia, Typography } from '@mui/material';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { Flat } from '../../../../../types';

interface FlatCardProps {
  flat: Flat;
}

const FlatCard: React.FC<FlatCardProps> = ({ flat }) => {
  const { id, photoUrl, dailyPriceUsd, address, description } = flat;

  return (
    <Card key={id} sx={{ height: 240, mb: 6 }}>
      <Grid container>
        <Grid item width={290} height={240}>
          <CardMedia component="img" image={photoUrl} height="100%" />
        </Grid>
        <Grid item paddingY={4}>
          <Container fixed sx={{ height: '100%' }}>
            <Grid container flexDirection="column" height="100%">
              <Grid item>
                <Typography variant="h6" fontWeight="600">
                  ${dailyPriceUsd} / night
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="subtitle1">{address}</Typography>
              </Grid>
              <Grid item maxWidth="260px" flexGrow={5}>
                <Typography variant="subtitle2">
                  {description?.slice(0, 150) || ''}
                </Typography>
              </Grid>
              <Grid item>
                <Button variant="outlined">DETAILS</Button>
              </Grid>
            </Grid>
          </Container>
        </Grid>
      </Grid>
    </Card>
  );
};

export default FlatCard;
