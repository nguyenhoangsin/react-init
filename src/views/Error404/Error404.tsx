import { ReactElement } from 'react';
import { Link, useRouteError, isRouteErrorResponse } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import style from './Error404.module.scss';
import error404 from '../../assets/images/error404.png';

function Error404(): ReactElement {
  const error = useRouteError();

  return (
    <>
      <Helmet>
        <title>Page Not Found</title>
      </Helmet>
      <div className={style.wrap}>
        <div className={style.left}>
          <div>ERROR {isRouteErrorResponse(error) ? error.status : ''}</div>
          <h1 className={style.status}>Page Not Found</h1>
          <div className={style.message}>
            We can't show the page you wanted to see here. We're sorry about
            that.
          </div>
          <Link to="/" className={style.link}>Go to our home page</Link>
        </div>
        <div className={style.right}>
          <img src={error404} alt="error404" />
        </div>
      </div>
    </>
  );
}

export default Error404;
