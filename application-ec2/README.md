## 참고사항

### 기존 application과의 차이점
#### frontend
- app.js  
  상수 BACKEND_URI를 선언할 때 http:// 없이 값 대입

- ecosystem.config.js  
  pm2가 사용할 js 추가

#### backend
- routes/messages.js  
  상수 DAILYLOG_DB_ADDR_QUERYSTRING 선언 후, mongoURI에 값을 대입할 때 사용

- ecosystem.config.js  
  pm2가 사용할 js 추가
