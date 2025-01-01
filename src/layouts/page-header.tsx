import classNames from 'classnames';
import clsx from 'clsx';
import { PropsWithChildren } from 'react';

interface IProps {
  bordered?: boolean;
  className?:string
}

function PageHeader({ bordered, children, className }: PropsWithChildren<IProps>) {
  return (
    <div className={clsx(classNames('page-header', { border: bordered }), className)}>
      {children}
    </div>
  );
}

PageHeader.defaultProps = {
  bordered: false
};
export default PageHeader;
