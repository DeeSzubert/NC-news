const ErrorPage = ({ message }) => {
  return <p>{message ? message : <p>page doesn't exists</p>}</p>;
};

export default ErrorPage;
