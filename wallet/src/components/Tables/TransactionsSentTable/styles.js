export const styles = theme => ({
  root: {
    width: "100%",
    overflowX: "auto",
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2
  },
  table: {
    minWidth: 700
  }
});
