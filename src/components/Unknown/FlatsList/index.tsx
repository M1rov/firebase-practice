import React, { useCallback, useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import {
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import SearchIcon from '@mui/icons-material/Search';
import { useFirestore, useFirestoreCollection } from 'reactfire';
import { Formik } from 'formik';
import { useHistory } from 'react-router-dom';
import { Flat } from '../../../../types';
import FlatCard from './FlatCard';
import useQuery from './useQuery';

const FlatsList: React.FC = () => {
  const flatsRef = useFirestore().collection('flats');
  const { data: flatsData } = useFirestoreCollection(flatsRef);
  const [flats, setFlats] = useState<Flat[] | null>(null);

  const params = useQuery();

  const fetchFlats = useCallback(
    async (query?: string) => {
      const data = await (query
        ? flatsRef.where('cityName', '==', query).get()
        : flatsData);
      setFlats(
        data?.docs
          ?.map((doc) => {
            const flatData = doc.data();
            return {
              id: doc.id,
              address: flatData.address,
              latitude: flatData.latitude,
              longitude: flatData.longitude,
              cityName: flatData.cityName,
              description: flatData.description,
              dailyPriceUsd: flatData.dailyPriceUsd,
              photoUrl: flatData.image,
              publishedAt: flatData.publishedAt,
            };
          })
          .sort((flat1, flat2) => flat2.publishedAt - flat1.publishedAt)
          .slice(0, 20),
      );
    },
    [flatsData, flatsRef],
  );

  useEffect(() => {
    if (!flats) {
      const query = params.get('query');
      if (query) {
        fetchFlats(query);
      } else {
        fetchFlats();
      }
    }
  }, [fetchFlats, flats, params]);

  const history = useHistory();

  const formHandler = (query?: string) => {
    if (query) {
      const newParams = new URLSearchParams({ query });
      history.replace({
        pathname: window.location.pathname,
        search: newParams.toString(),
      });
    }
    fetchFlats(query);
  };

  return (
    <Box width={650} marginRight="auto">
      <Container fixed>
        <Grid container marginTop={3}>
          <Grid item xs={12} marginBottom={6}>
            <Formik
              initialValues={{ query: params.get('query') || '' }}
              onSubmit={(values) => formHandler(values.query)}
            >
              {({ handleSubmit, handleChange, initialValues }) => (
                <form onSubmit={handleSubmit}>
                  <TextField
                    defaultValue={initialValues.query}
                    type="text"
                    name="query"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      handleChange(e);
                    }}
                    fullWidth
                    variant="filled"
                    label="City"
                    placeholder="Type something"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="start">
                          <IconButton type="submit">
                            <SearchIcon />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </form>
              )}
            </Formik>
          </Grid>
          <Grid item xs={12} marginBottom={6}>
            <Typography variant="h5" fontWeight={600}>
              Flats to rent
            </Typography>
          </Grid>
          <Grid item xs={12}>
            {flats?.map((flat) => (
              <FlatCard key={flat.id} flat={flat} />
            ))}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default FlatsList;
