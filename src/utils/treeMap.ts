export function treeMap(array: any, fn: (obj: any) => any, children: string = 'children'): any {
  if (!Array.isArray(array)) return array
  return array.map((item) => {
    const newItem = fn(item)
    if (newItem[children] && Array.isArray(newItem[children])) {
      newItem[children] = treeMap(newItem[children], fn, children)
    }
    return newItem
  });
}
