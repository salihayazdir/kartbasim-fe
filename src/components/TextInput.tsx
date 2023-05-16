import type { AriaTextFieldProps } from 'react-aria';
import { useTextField } from 'react-aria';
import { useRef } from 'react';

export default function TextInput(props: AriaTextFieldProps) {
  let { label } = props;
  let ref = useRef(null);
  let { labelProps, inputProps } = useTextField(
    {
      ...props,
      inputElementType: 'input',
    },
    ref
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: 200 }}>
      <label {...labelProps}>{label}</label>
      <input {...inputProps} ref={ref} />
    </div>
  );
}
