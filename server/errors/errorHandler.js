export default function error(err, _req, res, _next) {
  const status = err.status || 500;
  const message = err.message;
  res.status(status);
  res.send({
    error: {
      status,
      message,
    },
  });
}
