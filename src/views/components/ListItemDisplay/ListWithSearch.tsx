import React, { useState, useMemo } from 'react';
import {
  Box,
  InputBase,
  List,
  ListItem,
  ListItemText,
  Paper,
  Tooltip,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import './ListWithSearch.scss';

interface ListItemModel {
  id: string;
  label: string;
}

interface ListWithSearchProps {
  activeId?: string;
  items?: ListItemModel[];
  width?: string | number;
  height?: string | number;
  onChange?: (item: ListItemModel) => void;
}

const ListWithSearch: React.FC<ListWithSearchProps> = ({
  activeId,
  items = [],
  width = 300,
  height = 400,
  onChange,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Filter items based on the search term
  const filteredItems = useMemo(
    () =>
      items.filter((item) =>
        item.label.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    [items, searchTerm],
  );

  console.log(activeId);

  return (
    <Paper
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width,
        height,
        overflow: 'hidden',
        boxShadow: 'none',
      }}
    >
      <Box
        sx={{
          paddingTop: '6px',
          paddingBottom: '12px',
        }}
      >
        <InputBase
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder='Search...'
          fullWidth
          sx={{
            border: '1px solid #ccc',
            borderRadius: '4px',
            padding: '4px 8px',
            fontSize: '14px',
          }}
          endAdornment={<SearchIcon />}
        />
      </Box>

      <List
        sx={{
          flex: 1,
          overflowY: 'auto',
        }}
      >
        {filteredItems.map((item) => (
          <ListItem
            key={item.id}
            button='true'
            className={item.id === activeId ? 'listWithSearchItemSelected' : ''}
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              cursor: 'pointer',
            }}
            onClick={() => onChange && onChange(item)}
          >
            <Tooltip title={item.label}>
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{
                  fontSize: '14px',
                  noWrap: true,
                }}
              />
            </Tooltip>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default ListWithSearch;
