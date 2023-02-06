import { useRouteError } from 'react-router-dom';
import MainNavigation from '../components/navigation/MainNavigation';

function ErrorPage() {
  const error = useRouteError();
  console.log(error);

  const displayStatusText = (error: unknown) => {
    if (error instanceof Response) return <p>{error.statusText}</p>;
  };

  return (
    <>
      <MainNavigation />
      <main id='error-content'>
        <h1>An error occurred!</h1>
        {displayStatusText(error)}
      </main>
    </>
  );
}

export default ErrorPage;
