import clsx from 'clsx';
import { useMemo, type Key } from 'react';
import { DataGrid, DataGridProps, DefaultColumnOptions } from 'react-data-grid';
import { renderCheckbox } from './cell-renders';
import { EmptyRowsRenderer } from './empty-row';
import { AppColumnOrColumnGroup, ExtraColumnProps } from './app-data-grid.type';
import { Maybe } from '@/types';

type AppDataGridProps<R, SR = unknown, K extends Key = Key> = DataGridProps<
  R,
  SR,
  K
> & {
  columns: readonly AppColumnOrColumnGroup<R, SR>[];
  defaultColumnOptions?: Maybe<
    DefaultColumnOptions<NoInfer<R>, NoInfer<SR>> & ExtraColumnProps
  >;
  gridLayout?: 'fill' | 'fit';
};

const AppDataGrid = <R, SR = unknown, K extends Key = Key>(
  props: AppDataGridProps<R, SR, K>,
) => {
  const { gridLayout, className, columns, ...rest } = props;

  const internalColumns = useMemo<AppColumnOrColumnGroup<R, SR>[]>(() => {
    const processColumns = (
      cols: readonly AppColumnOrColumnGroup<R, SR>[],
    ): AppColumnOrColumnGroup<R, SR>[] => {
      return cols.map((col) => {
        // for group
        if ('children' in col) {
          return {
            ...col,
            children: processColumns(col.children),
          };
        }

        const mergedCol = {
          textAlign: rest.defaultColumnOptions?.textAlign,
          ...col,
        };

        return {
          ...mergedCol,
          cellClass: clsx(mergedCol.cellClass, {
            'text-left': mergedCol.textAlign === 'left',
            'text-center': mergedCol.textAlign === 'center',
            'text-right': mergedCol.textAlign === 'right',
          }),

          // minWidth:
          //   mergedCol.minWidth ??
          //   Math.max(60, String(mergedCol.name ?? '').length * 6 + 24),
        };
      });
    };

    return processColumns(columns);
  }, [columns, rest.defaultColumnOptions]);

  return (
    <div className="rdg-container">
      <DataGrid
        rowHeight={30}
        renderers={{
          noRowsFallback: <EmptyRowsRenderer />,
          renderCheckbox,
        }}
        {...rest}
        columns={internalColumns}
        className={clsx(
          'app-data-grid',
          {
            'fill-grid': gridLayout === 'fill',
            'fit-grid ': gridLayout === 'fit',
          },
          className,
        )}
      />
    </div>
  );
};

export default AppDataGrid;
