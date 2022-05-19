export const formatMark = (nodes: any) => {
  const newNodes: any = [];
  let nonMarkIndex = 0;
  let activeTools;
  nodes.forEach((node: any) => {
    if (node?.children) {
      node.children.forEach((item: any, index: number) => {
        if (item?.type === 'mark' && index !== 0) {
          const newChildren = node.children.slice(nonMarkIndex, index);
          activeTools = {...newChildren[0], text: ''};
          newChildren.unshift(activeTools);
          newChildren.push(activeTools);
          newNodes.push({type: 'paragraph', children: newChildren});
          newNodes.push({type: 'mark', children: item.children});
          nonMarkIndex = 0;
        } else if (nonMarkIndex === 0) {
          nonMarkIndex = index;
        }
      });
    }
  });
  if (newNodes.length) {
    if (newNodes[newNodes.length - 1]?.type === 'mark') {
      newNodes.push({type: 'paragraph', children: [activeTools]});
    }
    return newNodes;
  }
  return nodes;
};
