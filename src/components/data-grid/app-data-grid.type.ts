import { CSSProperties } from 'react';
import { Column, ColumnGroup } from 'react-data-grid';

export type ExtraColumnProps = {
  textAlign?: CSSProperties['textAlign'];
};

export type AppColumn<TRow, TSummaryRow = unknown> = {
  [K in keyof TRow]: Column<TRow, TSummaryRow> & ExtraColumnProps;
}[keyof TRow];

export interface AppColumnGroup<R, SR = unknown> extends Omit<
  ColumnGroup<R, SR>,
  'children'
> {
  children: readonly AppColumnOrColumnGroup<R, SR>[];
}

export type AppColumnOrColumnGroup<R, SR = unknown> =
  AppColumn<R, SR> | AppColumnGroup<R, SR>;
