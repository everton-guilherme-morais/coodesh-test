class CronService {
    constructor() {
        this.lastExecutionTime = null;
    }
  
    updateExecutionTime() {
        this.lastExecutionTime = new Date();
    }
  
    getLastExecutionTime() {
        if (this.lastExecutionTime) {
            return this.formatDate(this.lastExecutionTime);
        }
        return 'Cron job ainda não executado';
    }
  
    formatDate(date) {
        return new Intl.DateTimeFormat('pt-BR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
        }).format(date);
    }
  }
  
  module.exports = CronService;
  