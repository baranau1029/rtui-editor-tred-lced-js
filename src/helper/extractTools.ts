export const extractTools = (target: string) => {
  const tools: string[] = [];
  if (target.includes('rtui-ial-class-bold') && !tools.includes('bold')) {
    tools.push('bold');
  } else if (target.includes('rtui-ial-class-italic') && !tools.includes('italic')) {
    tools.push('italic');
  } else if (target.includes('rtui-ial-class-underline') && !tools.includes('underline')) {
    tools.push('underline');
  } else if (target.includes('rtui-ial-class-superscript') && !tools.includes('superscript')) {
    tools.push('superscript');
  } else if (target.includes('rtui-ial-class-subscript') && !tools.includes('subscript')) {
    tools.push('subscript');
  } else if (target.includes('rtui-ial-class-smallcaps') && !tools.includes('smallcaps')) {
    tools.push('smallcaps');
  }
  return tools;
};
