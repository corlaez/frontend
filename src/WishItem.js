import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

export default function MediaCard(props) {
  const classes = useStyles();

  return (
    <Card className="wish_item" >
      <CardActionArea>
        {/* <CardMedia
          className={classes.media}
          image="/images/dress.png"
          title="Contemplative Reptile"
        /> */}

        <img  src={props.imageUrl} />

        <CardContent>
          <Typography gutterBottom component="h2" color="textSecondary">
            {props.itemName}
          </Typography>
          <Typography color="textPrimary" className = "price" >
            ${props.price}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
