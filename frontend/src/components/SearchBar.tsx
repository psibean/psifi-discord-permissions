import classNames from 'classnames';
import { ChangeEventHandler, KeyboardEvent, useCallback, useEffect, useState } from 'react';
import { CgSearch, CgClose } from 'react-icons/cg';

export type SearchBarProps = {
  id: string;
  onChange: (value: string) => void;
  onClose?: () => void;
  onEscape?: () => void;
}

export default ({ id, onClose, onEscape, onChange }: SearchBarProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const [searchInputElement, setSearchInputElement] = useState(null as HTMLElement | null);

  useEffect(() => {
    const searchElement = searchInputElement ?? document.getElementById(id);
    searchElement?.getElementsByTagName('input')[0]?.focus();
  }, [])

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    event.preventDefault();
    if (onChange)
        onChange(event.target.value);
  }

  const handleClose: React.MouseEventHandler<SVGElement> = (event) => {
    event.preventDefault();
    if (onClose) {
      onClose();
    }
  }

  const handleEscape = (event: HTMLElementEventMap['keydown']) => {
    if ((event.key === 'Escape' || event.key === 'Esc')) {
      if (onEscape) {
        onEscape();
      }
    }
  }

  const handleFocus = useCallback(() => {
    setIsFocused(true);
    searchInputElement?.addEventListener('keydown', handleEscape);
  }, [isFocused])

  const handleBlur = useCallback(() => {
    setIsFocused(false);
    searchInputElement?.removeEventListener('keydown', handleEscape);
  }, [isFocused])

  useEffect(() => {
    const searchInputElement = document.getElementById(id);

    searchInputElement?.addEventListener('focus', handleFocus);
    searchInputElement?.addEventListener('blur', handleBlur);
    searchInputElement?.addEventListener('keydown', handleEscape);
    setSearchInputElement(searchInputElement);
    return () => {
      searchInputElement?.removeEventListener('focus', handleFocus);
      searchInputElement?.removeEventListener('blur', handleBlur);
      searchInputElement?.removeEventListener('keydown', handleEscape);
    }
  }, [])

  return (
    <div
      id={id}
      className={classNames(
        "flex group flex-row justify-center items-center align-center box-border border-t border-slate-100 dark:border-slate-800 h-12 py-2 pr-4 w-full",
        "focus:text-slate-900 focus:dark:text-slate-300",
        !isFocused && "border-slate-100 hover:text-slate-900",
        !isFocused && "text-slate-700 dark:text-slate-400 dark:hover:text-slate-300")}
      >
      <input className="w-full pl-4 bg-transparent focus:outline-none" onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur} type="text" placeholder="Search..." />
      <CgClose onMouseDown={handleClose} className="cursor-pointer w-6 h-6 hidden group-focus:block" />
      <CgSearch className="w-6 h-6 block group-focus:hidden" />
    </div>
  );
}