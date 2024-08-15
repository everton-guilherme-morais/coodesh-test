class StatusController {
    constructor(statusService) {
        this.statusService = statusService;
    }

    async getStatus(req, res) {
        try {
            const status = await this.statusService.getStatus();
            res.json(status);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao obter status da API' });
        }
    }
}

module.exports = StatusController;
