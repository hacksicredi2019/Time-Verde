import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import Grid from '@material-ui/core/Grid';

import css from './SchoolBanner.module.scss';
import Background from '../../../imgs/champagnat.jpeg';

class SchoolBanner extends Component {
  render() {
    return (
      <>
        <img src={Background} className={css.banner} />
        <Grid container spacing={3}>

          <Grid item xs={12} md={6}>
            <Chip
              label="Privada"
              color="secondary"
              size="small"
            />
            <Typography variant="h4" component="h3">
              Colégio Marista Champagnat
            </Typography>
            <Typography className="address" variant="h6" component="h4">
              Endereço da Escola
            </Typography>
            <Typography
              className={css.organizacao}
              variant="subtitle1"
              component="h4"
            >
              <p>Ensino Fundamental</p>
              <p>Ensino Médio</p>
            </Typography>
            <p className={css.description}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </Grid>
          <Grid item xs={12} md={6} />
        </Grid>
      </>
    );
  }
}

export default SchoolBanner;
