import React from "react";
import { useTheme } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import {
  Chip,
  Typography,
  Box,
  useMediaQuery,
  Divider,
  Grid,
  ListItemText,
  List,
  ListItem,
  Avatar,
  ListItemAvatar,
} from "@material-ui/core";
import { useDispatch } from "react-redux";
import { exploreProjects } from "../../redux/actions";
import { useStyles as projDetStyles, getRandomColor } from "./projDetStyles";
import LoadingComponent from "../Utils/Loading";
import DescriptionOutlinedIcon from "@material-ui/icons/DescriptionOutlined";
import PersonIcon from "@material-ui/icons/Person";
import CodeIcon from "@material-ui/icons/Code";

const ProjectDetails = ({ project }) => {
  const css = projDetStyles();
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const history = useHistory();
  const dispatch = useDispatch();
  const handleChipClick = (tag) => () => {
    if (tag) {
      history.push(`/projects?query=${tag}&by=tag`);
    }
    dispatch(exploreProjects(tag, "tag"));
  };
  return Object.keys(project).length > 0 ? (
    <Box>
      <Typography variant="h4" className={css.projectTitle}>
        {project.name}
      </Typography>
      <Divider className={css.divider} />
      <Grid container justify="space-between">
        <Grid item sm={12} md={6}>
          {/* <ListItemText
            primary="Description"
            style={{ maxWidth: "48ch", overflowWrap: "break-word" }}
            secondary={project.description}
            primaryTypographyProps={{
              variant: "h6",
            }}
          />
          <ListItemText
            primary="Date of Creation"
            secondary={getDateTimeString(project.createdAt)}
            primaryTypographyProps={{ variant: "h6" }}
          /> */}
          <Box display="flex" alignItems="center">
            <DescriptionOutlinedIcon />
            <Typography variant="h5" style={{ marginLeft: "8px" }}>
              Description
            </Typography>
          </Box>
          {/* <Divider className={css.divider} /> */}
          <Box className={css.timeNameInfo} style={{ paddingLeft: "4px" }}>
            <Typography variant="body1" style={{ marginTop: "8px" }}>
              {project.description}
            </Typography>
          </Box>
          <br />
          {isSmall ? null : (
            <Box className={css.chipsBoxDesktop}>
              {project.tags.map((tag, idx) => (
                <Chip
                  color="secondary"
                  label={tag}
                  key={idx}
                  size="small"
                  clickable
                  className={css.chip}
                  onClick={handleChipClick(tag)}
                />
              ))}
            </Box>
          )}
        </Grid>
        {isSmall ? (
          <Grid item xs={12} sm={12}>
            <Box className={css.chipsBoxMobile}>
              {project.tags.map((tag, idx) => (
                <Chip
                  color="secondary"
                  label={tag}
                  key={idx}
                  size="small"
                  clickable
                  className={css.chip}
                  onClick={handleChipClick(tag)}
                />
              ))}
            </Box>
            <Divider className={css.divider} />
          </Grid>
        ) : null}
        <Grid item sm={12} md={5}>
          <Box display="flex" alignItems="center">
            <PersonIcon />
            <Typography variant="h5" style={{ marginLeft: "8px" }}>
              Project Manager
            </Typography>
          </Box>
          <List>
            <PersonItem person={project.projectManager} />
          </List>
          <Divider className={css.divider} />
          <Box display="flex" alignItems="center">
            <CodeIcon />
            <Typography variant="h5" style={{ marginLeft: "8px" }}>
              Developers
            </Typography>
          </Box>
          <List>
            {project.developers.map((developer) => (
              <>
                <PersonItem person={developer} />
                <Divider variant="inset" component="li" />
              </>
            ))}
          </List>
        </Grid>
      </Grid>
    </Box>
  ) : (
    <LoadingComponent />
  );
};

const PersonItem = ({ person }) => {
  const theme = useTheme();

  let names = person.name.split(" ");
  let initials = names[0].charAt(0).toUpperCase();
  if (names.length > 1)
    initials += names[names.length - 1].charAt(0).toUpperCase();

  const avatarStyles = {
    color: theme.palette.getContrastText(getRandomColor()),
    backgroundColor: getRandomColor(),
  };
  return (
    <ListItem alignItems="flex-start">
      <ListItemAvatar>
        <Avatar style={avatarStyles}>{initials}</Avatar>
      </ListItemAvatar>
      <ListItemText primary={person.name} secondary={person.email} />
    </ListItem>
  );
};

export default ProjectDetails;
