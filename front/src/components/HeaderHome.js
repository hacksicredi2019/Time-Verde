/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';

import css from './HeaderHome.module.scss';
import logo from '../imgs/grupo.png';

class HeaderHome extends Component {
  constructor(props) {
    super(props);
  }

  toggleDialogFilter = () => this.setState((prevState) => ({ openFilter: !prevState.openFilter }));


  render() {
    const {
      filters,
    } = this.props;

    return (
      <>
        <div className={css.bannerHome}>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <img src={logo} alt="Logo Escola Ideal" />
          </Link>
          <Paper className={css.form}>
            <Typography variant="h6">
            Descubra escolas e o que elas oferecem para seus filhos
            </Typography>
            <FormControl variant="outlined" className={css.formControl}>
              <InputLabel htmlFor="outlined-age-native-simple">
            Escolha o tipo de escola
              </InputLabel>
              <Select
                native
                inputProps={{
                  name: 'type',
                }}
              >
                <option value="" />
                { filters.filter((filter) => filter.filter === 'categories')
                  .map((filter) => <option value={filter.id}>{filter.name}</option>) }
              </Select>
            </FormControl>
            <FormControl variant="outlined" className={css.formControl}>
              <InputLabel htmlFor="outlined-age-native-simple">
              Escolha o tipo de ensino
              </InputLabel>
              <Select
                native
                inputProps={{
                  name: 'education',
                }}
              >
                <option value="" />
                { filters.filter((filter) => filter.filter === 'types')
                  .map((filter) => <option value={filter.id}>{filter.name}</option>) }
              </Select>
            </FormControl>
            <Button variant="contained" color="primary" className={css.button}> Pesquisar por escolas </Button>
          </Paper>
        </div>
        <hr className={css.hr} />
      </>
    );
  }
}

export default HeaderHome;
