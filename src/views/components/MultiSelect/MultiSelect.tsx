import React, { useState, useRef, useEffect } from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';

export interface Option {
  id: string;
  label: string;
  isSelect?: boolean;
  isDisable?: boolean;
}

interface MultipleSelectProps {
  label?: string;
  value?: Option[];
  onChange?: (updatedItems: Option[]) => void;
  onBlur?: () => void;
  error?: boolean;
  size?: 'small' | 'medium';
  width?: number | '100%';
  menuHeight?: number;
}

const MultipleSelect: React.FC<MultipleSelectProps> = ({
  label = 'Select Items',
  value = [],
  onChange = () => {},
  onBlur = () => {},
  error = false,
  width = '100%',
  size = 'medium',
  menuHeight = 300,
}) => {
  const [data, setData] = useState<Option[]>([]);

  useEffect(() => {
    setData(
      value.map((item) => ({
        ...item,
        isSelect: item.isSelect ?? false,
        isDisable: item.isDisable ?? false,
      }))
    );
  }, [value]);

  const [menuWidth, setMenuWidth] = useState<number | null>(null);
  const controlRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (controlRef.current) {
      const controlWidth = controlRef.current.offsetWidth;
      setMenuWidth(controlWidth);
    }
  }, []);

  const handleChange = (event: SelectChangeEvent<string[]>) => {
    const value = event.target.value as string[];

    if (value.includes('all')) {
      const allSelected = data.every((item) => item.isSelect);
      const updatedData = data.map((item) => (item.isDisable ? item : { ...item, isSelect: !allSelected }));

      setData(updatedData);
      onChange(updatedData);
    } else {
      const updatedData = data.map((item) =>
        value.includes(item.id)
          ? { ...item, isSelect: !item.isDisable }
          : item.isSelect && !value.includes(item.id)
          ? { ...item, isSelect: false }
          : item
      );

      setData(updatedData);
      onChange(updatedData);
    }
  };

  const isAllSelected = data.every((item) => item.isSelect) && data.length > 0;

  const selectedLabels = data
    .filter((item) => item.isSelect)
    .map((item) => item.label)
    .join(', ');

  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: menuHeight,
        width: menuWidth ? `${menuWidth}px` : undefined, // Dynamically match control width
      },
    },
  };

  return (
    <Box ref={controlRef} sx={{ width }}>
      <FormControl fullWidth size={size}>
        <InputLabel
          id='multiple-select-label'
          shrink
          error={error}
          sx={{
            background: '#fff',
            padding: '0 4px',
          }}
        >
          {label}
        </InputLabel>
        <Select
          labelId='multiple-select-label'
          multiple
          value={data.filter((item) => item.isSelect).map((item) => item.id)}
          onChange={handleChange}
          onBlur={onBlur}
          input={<OutlinedInput label={label} error={error} />}
          renderValue={() => selectedLabels}
          MenuProps={MenuProps}
          sx={{
            fontSize: '14px',
          }}
        >
          {/* Select All */}
          <MenuItem value='all' disabled={data.every((item) => item.isDisable)}>
            <Checkbox size='small' checked={isAllSelected} />
            <ListItemText
              primary='Select All'
              primaryTypographyProps={{
                style: {
                  fontSize: '14px',
                },
              }}
            />
          </MenuItem>

          {/* Items */}
          {data.map((item) => (
            <MenuItem key={item.id} value={item.id} disabled={item.isDisable}>
              <Checkbox size='small' checked={item.isSelect} disabled={item.isDisable} />
              <Tooltip title={item.label}>
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{
                    style: {
                      fontSize: '14px',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      maxWidth: menuWidth ? menuWidth - 100 : undefined,
                    },
                  }}
                />
              </Tooltip>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default MultipleSelect;
