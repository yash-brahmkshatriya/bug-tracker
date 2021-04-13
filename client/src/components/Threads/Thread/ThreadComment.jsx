import React from "react";
import moment from "moment";
import { useStyles } from "../threadStyles";
import {
  Box,
  Grid,
  Typography,
  Paper,
  Divider,
  Avatar,
  useTheme,
} from "@material-ui/core";
import { getRandomColor } from "../../Project/projDetStyles";
import StyledChip from "./../../Utils/StyledChip";
import PersonIcon from "@material-ui/icons/Person";
import CodeIcon from "@material-ui/icons/Code";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import { userTypeColor } from "./../../../shared/misc";
function ThreadComment({ comment }) {
  const css = useStyles();
  return (
    <Paper square={false} className={css.customBorderRadius}>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="flex-start"
        className={css.customBorderRadiusBox}
        // padding="8px"
      >
        <PersonDetails comment={comment} />

        <Box flex={1} padding="8px">
          {comment.comment}
        </Box>
      </Box>
    </Paper>
  );
}

const PersonDetails = ({ comment }) => {
  const css = useStyles();
  const person = comment.author;
  const theme = useTheme();
  let names = person.name.split(" ");
  let initials = names[0].charAt(0).toUpperCase();
  if (names.length > 1)
    initials += names[names.length - 1].charAt(0).toUpperCase();

  const avatarStyles = {
    color: theme.palette.getContrastText(getRandomColor()),
    backgroundColor: getRandomColor(),
  };
  let icon = <PersonAddIcon />;
  let bgcolor = userTypeColor.cont;
  if (comment.role === "Developer") {
    icon = <CodeIcon />;
    bgcolor = userTypeColor.dev;
  }
  if (comment.role === "ProjectManager") {
    icon = <PersonIcon />;
    bgcolor = userTypeColor.pm;
  }

  return (
    <Box className={css.commentPersonDetails}>
      <Box display="flex" justifyContent="flex-start" alignItems="center">
        <Avatar style={avatarStyles}>{initials}</Avatar>
        <Typography variant="body1" style={{ marginLeft: "8px" }}>
          <b> {person.name} </b>
        </Typography>
        <Typography variant="body1" style={{ marginLeft: "8px" }}>
          commented {moment(comment.createdAt).fromNow()}
        </Typography>
      </Box>
      <Box display="flex" alignItems="center">
        <StyledChip
          icon={icon}
          color="secondary"
          bgcolor={bgcolor}
          label={comment.role}
          key="isClosed"
          size="small"
          //  style={{ marginBottom: "0px", marginLeft: "0px" }}
          className={css.chipComment}
        />
      </Box>
    </Box>
  );
};

function getDateTimeString(ISOString) {
  let date = new Date(ISOString);
  return `${date.toDateString()}`;
}
export default ThreadComment;
