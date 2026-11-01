import { AppColumn } from '../app-data-grid.type';

export const ROW_NUMBER_COLUMN_KEY = 'stt';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const RowNumberColumn: AppColumn<any, any> = {
  key: ROW_NUMBER_COLUMN_KEY,
  name: 'STT',
  width: 40,
  minWidth: 40,
  maxWidth: 60,
  resizable: false,
  sortable: false,
  frozen: true,
  textAlign: 'center',
  cellClass: 'rdg-cell-highlight',
  renderCell: ({ rowIdx }) => rowIdx + 1,
};
