export const cursorFocusOnEditor = (active: number | string) => {
  const editorElement: any = document.querySelector(`.editor-${active}`);
  if (editorElement) {
    editorElement.focus();
  }
};

export const $ = (window as any).$;

export const closeIssuesModal = () => {
  $('#editIssue').modal('hide');
};

export const triggetUpdateIssueForm = () => {
  $('#updateIssueButton').trigger('click');
};
