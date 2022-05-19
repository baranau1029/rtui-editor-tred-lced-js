export const showToastMessage = (id: string, message: string) => {
  const autoHideTime = 2000;
  const toast = document.querySelector(`#${id}`);
  if (toast) {
    toast?.classList.add('show');
    setTimeout(() => {
      toast?.classList.remove('show');
      toast?.classList.add('hide');
    }, autoHideTime);
  }
};
