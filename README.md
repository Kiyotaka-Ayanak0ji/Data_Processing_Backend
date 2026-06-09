# Data_Processing_Backend
An API for data processing and RBAC for financial data, including complete authentication. 
- The Postman Collection for this API : [https://documenter.getpostman.com/view/53009591/2sBXwqtBGr]


### Features: 
- Allows users to signup as an **Admin**, **Analyst** or **Viewer** and privileges are accordingly modified andd handled by the API.
- Allows users to create financial records and sort and filter records.
- Uses JWT-based authentication and hashes passwords using bcrypt for secure storage of user credentials.
- Extract valuable insights from financial records such as total amount spent, total expense and duration-wise transaction data (Ex: 5 months, 1 year ,etc).
  
### Additional Features:
- Pagination ( Work In progress )
- Rate Limiting (Work In Progress)

### Tools Used:
- Express.JS
- Sequelize
- Sequelize-cli
- Pghstore
- bcrypt
- PostgreSQL
- Node.JS
- JWT (Json Web Token)

### Future Scope and Updates
- Future updates of this application includes a customizable multi-user dashboard with an option to visualize records and access analytics.
