export namespace ImportPreparationServiceTypes {
    export type ImporterState = 'PREPARATION' | 'READY';

    export interface ImporterStatus {
        tableName: string;
        countMax: number;
        count: number;
        isDoneCount: number;
        state: ImporterState;
    }

    export interface TableDependency {
        id: string;
        sourceSystem: string;
        tableName: string;
        dependency: string;
    }
}