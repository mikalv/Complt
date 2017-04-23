import { MDCSnackbar } from '@material/snackbar';

const snackbar = MDCSnackbar.attachTo(document.querySelector('.mdc-snackbar'));

export default snackbar.show.bind(snackbar);
