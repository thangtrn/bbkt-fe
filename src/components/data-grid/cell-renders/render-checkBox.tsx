import { Checkbox } from 'antd';

// ---------------- selection ----------------
interface RenderCheckboxProps {
  checked?: boolean;
  disabled?: boolean;
  indeterminate?: boolean;
  tabIndex?: number;
  'aria-label'?: string;
  'aria-labelledby'?: string;
  onChange: (checked: boolean, isShiftClick: boolean) => void;
}

export function renderCheckbox({
  onChange,
  indeterminate,
  ...props
}: RenderCheckboxProps) {
  return (
    <Checkbox
      {...props}
      indeterminate={indeterminate}
      onChange={(e) => {
        onChange(e.target.checked, e.nativeEvent.shiftKey);
      }}
    />
  );
}
