import { ReactElement } from 'react';
import style from './LoadingOverlay.module.scss';

interface OwnProps {
  isShow?: boolean;
}

function LoadingOverlay({ isShow = true }: OwnProps): ReactElement {
  return (
    <div className={style.wrap + (isShow ? ` ${style.show}` : '')}>
      <span className={style.loader}></span>
    </div>
  );
}

export default LoadingOverlay;
