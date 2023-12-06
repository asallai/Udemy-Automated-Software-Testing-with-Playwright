import { FullConfig, Reporter, Suite } from  '@playwright/test/reporter'
import * as fs from 'fs'

class MyReporter implements Reporter {
    onBegin(suite) {
        console.log(`Execution of ${suite.allTests().length} tests`)        
    }

    onEnd(result) {
        console.log(`Execution finished with status of ${result.status}`)
    }

}
