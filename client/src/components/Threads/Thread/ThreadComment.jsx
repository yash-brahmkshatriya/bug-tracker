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
  useMediaQuery,
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
    <Paper elevation={4} className={css.customBorderRadius} key={comment._id}>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="flex-start"
        className={css.customBorderRadiusBox}
      >
        <PersonDetails comment={comment} />

        <Box
          flex={1}
          p={2}
          textAlign="justify"
          style={{ whiteSpace: "pre-line" }}
        >
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
  const isXSmall = useMediaQuery(theme.breakpoints.down("xs"));
  let names = person.name.split(" ");
  let initials = names[0].charAt(0).toUpperCase();
  if (names.length > 1)
    initials += names[names.length - 1].charAt(0).toUpperCase();

  const avatarStyles = {
    color: theme.palette.getContrastText(getRandomColor()),
    backgroundColor: getRandomColor(),
    transform: "scale(0.8)",
  };
  let bgcolor = userTypeColor.cont;
  let icon = isXSmall ? (
    <PersonAddIcon htmlColor={bgcolor} />
  ) : (
    <PersonAddIcon />
  );

  if (comment.role === "Developer") {
    bgcolor = userTypeColor.dev;
    icon = isXSmall ? <CodeIcon htmlColor={bgcolor} /> : <CodeIcon />;
  }
  if (comment.role === "Project Manager") {
    bgcolor = userTypeColor.pm;
    icon = isXSmall ? <PersonIcon htmlColor={bgcolor} /> : <PersonIcon />;
  }

  return (
    <Box className={css.commentPersonDetails}>
      <Box
        display="flex"
        flexWrap="wrap"
        justifyContent="flex-start"
        alignItems="center"
      >
        <Avatar style={avatarStyles}>{initials}</Avatar>
        <Typography variant="body1" style={{ marginLeft: "8px" }}>
          {person.name}
        </Typography>

        <Box className={css.timeNameInfo}>
          <Typography variant="body2" style={{ marginLeft: "8px" }}>
            commented {moment(comment.createdAt).fromNow()}
          </Typography>
        </Box>
      </Box>
      <Box display="flex" alignItems="center">
        {isXSmall ? (
          icon
        ) : (
          <StyledChip
            icon={icon}
            color="secondary"
            bgcolor={bgcolor}
            label={comment.role}
            key="isClosed"
            size="small"
            className={css.chipComment}
          />
        )}
      </Box>
    </Box>
  );
};

export default ThreadComment;
