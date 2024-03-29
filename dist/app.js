'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const express_1 = __importDefault(require('express'));
const cors_1 = __importDefault(require('cors'));
const http_status_1 = __importDefault(require('http-status'));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
// parser
app.use(express_1.default.json());
// app.use(cookieParser());
app.use(express_1.default.urlencoded({ extended: true }));
app.get('/', (req, res) => {
  res.send('This is our tour backEnd');
});
app.get('/api/v1', (req, res) => {
  res.send({
    name: 'backend',
  });
});
// handle not route
app.use((req, res, next) => {
  res.status(http_status_1.default.NOT_FOUND).json({
    success: false,
    message: 'Not Found',
    errorMessages: [
      {
        path: req.originalUrl,
        message: 'API Not Found',
      },
    ],
  });
  next();
});
exports.default = app;
