// ─── Global Error Handler ─────────────────────────────────────────────────────

const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Internal Server Error';

  if (process.env.NODE_ENV === 'development') {
    console.error(`[${new Date().toISOString()}] ERROR:`, err);
  }

  // Firebase Admin errors
  if (err.code?.startsWith('auth/')) {
    statusCode = 401;
    message = 'Authentication error: ' + err.message;
  }

  // Firestore errors
  if (err.code === 5) { statusCode = 404; message = 'Document not found'; }
  if (err.code === 6) { statusCode = 409; message = 'Document already exists'; }
  if (err.code === 7) { statusCode = 403; message = 'Permission denied'; }

  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};

// ─── 404 Not Found ────────────────────────────────────────────────────────────

const notFound = (req, res) => {
  res.status(404).json({ success: false, message: `Route not found: ${req.method} ${req.originalUrl}` });
};

// ─── Async Handler ────────────────────────────────────────────────────────────

const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

module.exports = { errorHandler, notFound, asyncHandler };
