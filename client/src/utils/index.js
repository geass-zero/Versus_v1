/* Index.js */
/* Inside this file you will import your other helper files */

// Import each file using the * notation
// This will import automatically every function exported by these files
import * as Web3Util from './Web3.js';
import * as Accounts from './Accounts.js';
import * as Contracts from './Contracts.js';



// Export again
export {
    Web3Util,
    Accounts,
    Contracts
};
