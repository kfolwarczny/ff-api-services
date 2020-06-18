import {APIClient, APIMapping} from '../../http';
import {Flowdsl} from '@flowfact/node-flowdsl';
import {FlywheelServiceTypes} from './FlywheelService.Types';

export class TransactionController extends APIClient {
    constructor() {
        super(APIMapping.flywheelService);
    }


    /**
     * Return all transactions for a specific phase
     * @param phaseName
     * @param view
     * @param {Flowdsl} flowdsl
     */
    async fetchForPhaseWithFilter(phaseName: string, view: string = 'card', flowdsl?: Flowdsl) {
        return this.invokeApiWithErrorHandling<FlywheelServiceTypes.Transaction[]>(`/transactions/phases/${phaseName}?view=${view}`, 'POST', flowdsl, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    /**
     * Return paged transactions for a specific phase and step
     * @param phaseName
     * @param stepName
     * @param view
     * @param page
     * @param {Flowdsl} flowdsl
     */
    async fetchForPhaseAndStepWithFilter(phaseName: string, stepName: string, view: string = 'card', page: number = 0, flowdsl?: Flowdsl) {
        return this.invokeApiWithErrorHandling<FlywheelServiceTypes.PagedTransactions>(`/transactions/phases/${phaseName}/${stepName}?view=${view}&page=${page}`, 'POST', flowdsl, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    /**
     * Moves a transaction to another phase
     * @param transactionId
     * @param fromPhaseName
     * @param toPhaseName
     */
    async move(transactionId: number, fromPhaseName: string, toPhaseName: string) {
        return this.invokeApiWithErrorHandling(`/transactions/${transactionId}`, 'PUT', {fromPhaseName, toPhaseName});
    }

    /**
     * TODO: Please comment this method
     * @param transactionId
     */
    async exitPhase(transactionId: number) {
        return this.invokeApiWithErrorHandling(
            `/transactions/${transactionId}`, 'PATCH',
            [{
                op: 'exitPhase',
            }],
            {
                headers: {
                    'Content-Type': 'application/json-patch+json',
                },
            },
        );
    }

    /**
     * TODO: Please comment this method
     * @param transactionId
     * @param entityId
     * @param targetPhase
     */
    async link(transactionId: number, entityId: string, targetPhase: number) {
        return this.invokeApiWithErrorHandling(
            `/transactions/${transactionId}`, 'PATCH',
            [{
                op: 'linkTransaction',
                entityId,
                targetPhase,
            }],
            {
                headers: {
                    'Content-Type': 'application/json-patch+json',
                },
            },
        );
    }
}
