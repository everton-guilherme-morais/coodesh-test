class StatusService {
    constructor(productRepository, cronService) {
        this.productRepository = productRepository;
        this.cronService = cronService;
        this.startTime = Date.now();
        console.log('CronService instance in StatusService:', this.cronService);
    }

    async getStatus() {
        let dbConnectionStatus = 'OK';
        try {
            await this.productRepository.getAll(1, 1);
        } catch (error) {
            dbConnectionStatus = 'ERROR';
        }

        const lastCronExecution = this.cronService.getLastExecutionTime();
        const uptime = process.uptime();
        const memoryUsage = process.memoryUsage();

        return {
            apiStatus: 'OK',
            dbConnectionStatus,
            lastCronExecution,
            uptime: this.formatUptime(uptime),
            memoryUsage: this.formatMemoryUsage(memoryUsage),
        };
    }

    formatUptime(uptime) {
        const hours = Math.floor(uptime / 3600);
        const minutes = Math.floor((uptime % 3600) / 60);
        const seconds = Math.floor(uptime % 60);
        return `${hours}h ${minutes}m ${seconds}s`;
    }

    formatMemoryUsage(memoryUsage) {
        return {
            rss: `${Math.round(memoryUsage.rss / 1024 / 1024 * 100) / 100} MB`,
            heapTotal: `${Math.round(memoryUsage.heapTotal / 1024 / 1024 * 100) / 100} MB`,
            heapUsed: `${Math.round(memoryUsage.heapUsed / 1024 / 1024 * 100) / 100} MB`,
            external: `${Math.round(memoryUsage.external / 1024 / 1024 * 100) / 100} MB`,
        };
    }
}

module.exports = StatusService;
