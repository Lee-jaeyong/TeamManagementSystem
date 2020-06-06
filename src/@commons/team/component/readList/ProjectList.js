import React, { memo } from "react";
//프로젝트의 리스트를 불러옴(프로젝트명, 시작일~종료일, )
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import LinkIcon from "@material-ui/icons/Link";

const ProjectList = memo(({ teamList }) => {
  return (
    <List>
      {teamList
        ? teamList.map((data, idx) => (
            <ListItem button key={idx}>
              <ListItemIcon>
                <LinkIcon />
              </ListItemIcon>
              <ListItemText primary={data["name"]} />
            </ListItem>
          ))
        : null}
      <ListItem button>
        <ListItemIcon>
          <LinkIcon />
        </ListItemIcon>
        <ListItemText primary="d아니야이거" />
      </ListItem>
    </List>
  );
});

export default ProjectList;
