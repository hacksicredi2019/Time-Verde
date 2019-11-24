/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import SendIcon from '@material-ui/icons/Send';
import FilterListIcon from '@material-ui/icons/FilterList';
import Input from '@material-ui/core/Input';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import FormControl from '@material-ui/core/FormControl';
import Chip from '@material-ui/core/Chip';
import Fab from '@material-ui/core/Fab';
import uniq from 'lodash/uniq';
import isEmpty from 'lodash/isEmpty';

import css from './Header.module.scss';
import logo from '../imgs/grupo.png';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openFilter: false,
    };
  }

  toggleDialogFilter = () => this.setState((prevState) => ({ openFilter: !prevState.openFilter }));


  render() {
    const {
      openFilter,
    } = this.state;

    const {
      filters,
      handleClick,
      onChangeAddress,
      address,
      submitAddress,
    } = this.props;

    const filtersSelected = filters.filter((filter) => filter.value);
    return (
      <>
        <Dialog
          onClose={this.toggleDialogFilter}
          aria-labelledby="simple-dialog-title"
          fullWidth
          open={openFilter}
        >
          <DialogTitle>Filtro</DialogTitle>
          <>
            { !isEmpty(filters) && uniq(filters.map((filter) => filter.type)).map((type) => (
              <>
                <Typography align="center" variant="h6">
                  { type }
                </Typography>
                <FormControl className={css.checkboxItem}>
                  { filters
                    .filter((filter) => filter.type === type)
                    .map((filter) => (
                      <Fab
                        name={filter.name}
                        variant="extended"
                        color={filter.value ? 'primary' : 'default'}
                        aria-label="add"
                        onClick={() => handleClick(filter.name)}
                        className={css.checkbox}
                      >
                        {filter.name}
                      </Fab>
                    ))}
                </FormControl>
              </>
            ))}
          </>
          <DialogActions>
            <Button onClick={this.toggleDialogFilter} color="primary">
            Fechar e continuar
            </Button>
          </DialogActions>
        </Dialog>

        <Toolbar className={css.toolbar}>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <img src={logo} alt="Logo Escola Ideal" />
          </Link>
          <div className={css.actionButtons}>
            <Input
              value={address}
              onChange={onChangeAddress}
              className={css.search}
              placeholder="Buscar pelo endereço..."
              type="search"
            />
            { filtersSelected.slice(0, 3).map((filter) => (
              <Chip
                label={filter.name}
                onDelete={() => handleClick(filter.name)}
              />
            ))}
            { filtersSelected.length > 3 && (
              <Chip
                label={`e mais ${filtersSelected.length - 3} filtro(s)`}
                onClick={this.toggleDialogFilter}
              />
            )}
            <IconButton onClick={this.toggleDialogFilter} aria-label="filtrar pesquisa">
              <FilterListIcon />
            </IconButton>
            <IconButton onClick={submitAddress} color="primary" aria-label="enviar pesquisa">
              <SendIcon />
            </IconButton>
          </div>
        </Toolbar>
        <hr className={css.hr} />
      </>
    );
  }
}

export default Header;
