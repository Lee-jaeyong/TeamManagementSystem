import React,{memo} from "react";
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';

const PlanOneCard = memo(({ plan,customStyle }) => {
  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar src={"data:image/png;base64,"+plan['user']['myImg']}/>
      </ListItemAvatar>
      <ListItemText primary={plan['tag']} secondary={plan['start'] + "~" + plan['end']} />
    </ListItem>
  );
});

export default PlanOneCard;
