export class TestSuite {
    results: (TestSuite | TestSuiteResult)[] = [];
    started: number = Date.now();
    ended!: number;
    success = true;
    label: string;

    constructor(label: string) {
        this.label = label;
    }

    add(label: string, success: boolean) {
        if (!success)
            this.success = false;
        this.results.push({ label, success, timestamp: Date.now() });
    }

    end() {
        if (!this.ended)
            this.ended = Date.now();
    }
}

interface TestSuiteResult {
    label: string;
    success: boolean;
    timestamp: number;
}
