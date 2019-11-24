/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */

import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import Item from './Item';
import css from './HorizontalList.module.scss';

import './slick-arrow.css';

class HorizontalList extends PureComponent {
  render() {
    const settings = {
      dots: false,
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      centerMode: true,
      centerPadding: '20px',
      variableWidth: true,
    };
    const { schools, allowCategory, onChangeAddressType } = this.props;
    const schoolType = allowCategory === 1 ? 'públicas' : 'particulares';
    return (
      <div>
        <div className={css.info}>
          <div className={css.title}>
            <Typography variant="h4" component="h3">
              {`Escolas ${schoolType}`}
            </Typography>
            <Typography variant="subtitle1" component="h4">
              Texto de descrição
            </Typography>
          </div>

          <Button onClick={() => onChangeAddressType(allowCategory)} variant="contained" className={css.show_all}>
            <Link to="/list" style={{ textDecoration: 'none', color: 'initial' }}>{`Ver todas as escolas ${schoolType}`}</Link>
          </Button>

        </div>
        <Slider {...settings} className={css.slider}>
          { schools.filter((school) => school.category_id === allowCategory).map((school) => <Item key={school.id} school={school} />)}
        </Slider>
      </div>
    );
  }
}

export default HorizontalList;
