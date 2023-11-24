import { PlaywrightTestConfig } from "@playwright/test"

const config: PlaywrightTestConfig = {
    timeout: 60000,
    testDir: "tests/api",
    retries: 0,
    use: {
        headless: true,
        viewport: { width: 1280, height: 720 },
        ignoreHTTPSErrors: true,
        actionTimeout: 10000,       
        video: "off",
        screenshot: "off"
    },
    projects: [
        { 
            name: 'Chromium',
            use: { browserName: 'chromium' }
        },
        {
            name: 'Firefox',
            use: { browserName: 'firefox' }
        },
        {
            name: "Webkit",
            use: { browserName: 'webkit' }
        }
    ]
}

export default config
