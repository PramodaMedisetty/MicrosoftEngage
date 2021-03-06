import ConnectionError from '../connection-error';
/**
 * Thrown when a connection to a database has invalid values for any of the connection parameters
 */
declare class InvalidConnectionError extends ConnectionError {
    constructor(parent: Error);
}
export default InvalidConnectionError;
