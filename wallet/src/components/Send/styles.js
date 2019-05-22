export const styles = theme => ({
  paper: {
    marginTop: theme.spacing.unit * 5,
    display: "flex",
    width: "50%", // Fix IE 11 issue.
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  input: {
    width: "60%"
  },
  title: {
    marginTop: `${theme.spacing.unit * 8}px`,
    marginBottom: `${theme.spacing.unit * 3}px`
  }
});
