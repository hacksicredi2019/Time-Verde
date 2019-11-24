/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-access-state-in-setstate */
import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import isEmpty from 'lodash/isEmpty';

import css from './App.module.scss';
import Routes from './routes';
import Header from './components/Header';
import HeaderHome from './components/HeaderHome';
import api from './services/api';

const theme = createMuiTheme({
  palette: {
    primary: { main: '#F2B90F', contrastText: '#000000' },
    secondary: { main: '#11cb5f' },
    text: {
      primary: '#000000',
    },
  },
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filters: [],
      schools: [],
      addressType: null,
      address: '',
    };
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition((position) => {
      api
        .get(`/geo-lat?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}&limit=30`)
        .then((response) => {
          this.setState({ schools: response.data });
        })
        .catch((err) => console.log(err.msg));
    });

    if (isEmpty(this.state.schools)) {
      api
        .get('/schools?limit=40')
        .then((response) => {
          this.setState({ schools: response.data });
        })
        .catch((err) => console.log(err.msg));
    }

    api
      .get('/school-types')
      .then((response) => {
        const newFilters = response.data.map((filter) => ({
          id: filter.id,
          name: filter.category,
          type: 'Ensino',
          filter: 'types',
          value: false,
        }));
        this.setState({ filters: [...this.state.filters, ...newFilters] });
      })
      .catch((err) => console.log(err.msg));

    api
      .get('/school-categories')
      .then((response) => {
        const newFilters = response.data.map((filter) => ({
          id: filter.id,
          name: filter.category,
          type: 'Categoria',
          filter: 'categories',
          value: false,
        }));
        this.setState({ filters: [...this.state.filters, ...newFilters] });
      })
      .catch((err) => console.log(err.msg));

    api
      .get('/school-foods')
      .then((response) => {
        const newFilters = response.data.map((filter) => ({
          id: filter.id,
          name: filter.category,
          type: 'Alimentação',
          filter: 'foods',
          value: false,
        }));
        this.setState({ filters: [...this.state.filters, ...newFilters] });
      })
      .catch((err) => console.log(err.msg));

    api
      .get('/school-infraestructures')
      .then((response) => {
        const newFilters = response.data.map((filter) => ({
          id: filter.id,
          name: filter.category,
          type: 'Infraestrutura',
          filter: 'infraestructures',
          value: false,
        }));
        this.setState({ filters: [...this.state.filters, ...newFilters] });
      })
      .catch((err) => console.log(err.msg));

    api
      .get('/school-extra-activities')
      .then((response) => {
        const newFilters = response.data.map((filter) => ({
          id: filter.id,
          name: filter.category,
          type: 'Extracurriculares',
          filter: 'extra-activities',
          value: false,
        }));
        this.setState({ filters: [...this.state.filters, ...newFilters] });
      })
      .catch((err) => console.log(err.msg));
  }

  handleClick = (name) => {
    let { filters } = this.state;
    filters = filters.map((filter) => ({
      ...filter,
      value: filter.name === name ? !filter.value : filter.value,
    }));
    this.setState({ filters });
  }

  onChangeAddress = (e) => {
    this.setState({ address: e.target.value });
  }

  onChangeAddressType = (type) => {
    this.setState({ addressType: type });
  }

  submitAddress= () => {
    const { address } = this.state;
    api
      .get(`/geo-address?address=${address}&limit=30`)
      .then((response) => {
        this.setState({ schools: response.data });
      })
      .catch((err) => console.log(err.msg));
  }

  render() {
    const {
      filters, schools, address, addressType,
    } = this.state;
    return (
      <div className={css.App}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <Container className={css.container} maxWidth="lg">
              <Switch>
                <Route exact path="/">
                  <HeaderHome filters={filters} />
                </Route>
                <Route>
                  <Header
                    address={address}
                    onChangeAddress={this.onChangeAddress}
                    filters={filters}
                    handleClick={this.handleClick}
                    submitAddress={this.submitAddress}
                  />
                </Route>
              </Switch>
              <Routes
                filters={filters}
                onChangeAddressType={this.onChangeAddressType}
                addressType={addressType}
                schools={schools}
              />
            </Container>
          </BrowserRouter>
        </ThemeProvider>
      </div>
    );
  }
}

export default App;
