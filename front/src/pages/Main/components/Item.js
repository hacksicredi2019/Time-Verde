/* eslint-disable camelcase */
/* eslint-disable react/prop-types */

import React, { PureComponent } from 'react';
import Box from '@material-ui/core/Box';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Rating from '@material-ui/lab/Rating';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import Fab from '@material-ui/core/Fab';
import FavoriteIcon from '@material-ui/icons/Favorite';

import css from './Item.module.scss';

class Item extends PureComponent {
  render() {
    const {
      school: {
        id, address, name, category_id, distance,
      },
    } = this.props;
    return (
      <Box key={id} maxWidth={272} minWidth={272} m={1}>
        <Card className={css.item}>
          <Fab aria-label="like" className={css.like} size="small">
            <FavoriteIcon />
          </Fab>

          <CardActionArea>
            <CardMedia
              component="img"
              alt="Contemplative Reptile"
              height="140"
              image="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcS3rSQKZDG8hiid5Nph69md13-ic5doOkFScsI9gv1qpWON7glr"
              title="Contemplative Reptile"
            />
            <CardContent>
              <Rating name="read-only" value={3} readOnly className={css.stars} size="small" />
              <div className={css.description}>
                { !!distance
                && (
                <Typography variant="body2" className={css.distance} component="h6">
                  { `${distance} Km` }
                </Typography>
                )}
                <Typography variant="caption" color="textSecondary" component="p">
                  Vagas abertas
                </Typography>
                <Typography gutterBottom variant="h5" component="h2">
                  { category_id === 1
                    ? (
                      <Chip
                        label="Publica"
                        color="primary"
                        size="small"
                      />
                    )
                    : (
                      <Chip
                        label="Privada"
                        color="secondary"
                        size="small"
                      />
                    )}
                  {' '}
                  {name}
                </Typography>

                <Typography variant="body2" color="textSecondary" component="p">
                  {address}
                </Typography>
              </div>
            </CardContent>
          </CardActionArea>
        </Card>
      </Box>
    );
  }
}

export default Item;
