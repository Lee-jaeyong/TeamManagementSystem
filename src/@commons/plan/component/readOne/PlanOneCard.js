import React,{memo} from "react";
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';

const PlanOneCard = memo(({ plan,customStyle }) => {
  console.log(plan);
  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar>
          <ImageIcon />
        </Avatar>
      </ListItemAvatar>
      <ListItemText primary={plan['tag']} secondary={plan['start'] + "~" + plan['end']} />
    </ListItem>
  );
});

export default PlanOneCard;
