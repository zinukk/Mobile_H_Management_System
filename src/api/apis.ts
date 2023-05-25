const API = {
  getServing: '/api/monitoring-system/statistic',
  getStores: '/api/monitoring-system/store',
  getRecentErrors: '/api/monitoring-system/error-notice/all',
  postDates: '/api/monitoring-system/error-notice/by-time',
  getRobots: '/api/monitoring-system/robot?state=',
  getRobotsDetail: '/api/monitoring-system/robot/map_id',
  getErrorList: '/api/monitoring-system/error-statistic',
  postErrorDates: '/api/monitoring-system/error-statistic',
  postErrorDetail: '/api/monitoring-system/error-detail',
};

export default API;
