import MenuItem from "./MenuItem";


export type SubMenuItem = {
  label: string;
  path: string;
}

export type SubMenuProps = {
  title: string;
  items: SubMenuItem[];
}

export default ({ title, items }: SubMenuProps) => {

  return(<li className="mt-8">
    <h5 className="mb-4 font-semibold text-slate-900 dark:text-slate-200">
      { title }
    </h5>
    <ul className="space-y-4 border-l border-slate-100 dark:border-slate-800">
      {
        items.map(item => <MenuItem key={title + item.label} { ...item } />)
      }
    </ul>
  </li>)
}