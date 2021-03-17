import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  root: {
    flex: 1,
  },
  img: {
    width: '100%',
    maxHeight: '400px',
  },
  heading: {
    marginBottom: 8,
  },
  imgContainer: {
    padding: 32,
  },
  item: {
    marginBottom: 32,
  },
  itemReverse: {
    marginBottom: 32,
    background: 'white',
    flexDirection: 'row-reverse',
  },
}));
