import { FullConfig, Suite, TestCase, TestResult, Reporter } from '@playwright/test';
import * as fs from 'fs';

class MyHtmlReporter implements Reporter {
  private results: any[] = [];

  onBegin(config: FullConfig, suite: Suite) {
    console.log(`📊 Starting test run with ${suite.allTests().length} tests...`);
  }

  onTestEnd(test: TestCase, result: TestResult) {
    this.results.push({
      name: test.title,
      status: result.status,
      duration: result.duration,
      errorMessage: result.error?.message || null,
      errorStack: result.error?.stack || null,
      file: test.location.file,
      line: test.location.line,
      column: test.location.column,
      retry: result.retry,
    });
  }

  onEnd() {
    const passed = this.results.filter(r => r.status === 'passed').length;
    const failed = this.results.filter(r => r.status === 'failed').length;
    const skipped = this.results.filter(r => r.status === 'skipped').length;

    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Playwright Test Report</title>
  <style>
    body { font-family: Arial, sans-serif; margin: 20px; background: #f4f6f8; }
    h1 { text-align: center; margin-bottom: 20px; }
    .summary { display: flex; justify-content: center; gap: 20px; margin-bottom: 20px; }
    .summary div { background: #fff; padding: 15px 20px; border-radius: 8px; font-weight: bold; box-shadow: 0 2px 6px rgba(0,0,0,0.1); }
    .test { padding: 15px; margin: 12px 0; border-radius: 8px; background: #fff; box-shadow: 0 1px 4px rgba(0,0,0,0.08); }
    .passed { border-left: 6px solid #34c759; }
    .failed { border-left: 6px solid #ff3b30; }
    .skipped { border-left: 6px solid #ffcc00; }
    .test h3 { margin: 0 0 8px; }
    .meta { font-size: 0.9em; color: #555; margin-bottom: 8px; }
    .error-message { color: #ff3b30; font-weight: bold; margin-top: 5px; }
    .error-stack { background: #2d2d2d; color: #f1f1f1; padding: 10px; border-radius: 6px; margin-top: 8px; font-family: monospace; font-size: 0.85em; white-space: pre-wrap; display: none; }
    .toggle-btn { cursor: pointer; color: #007bff; text-decoration: underline; font-size: 0.85em; }
  </style>
  <script>
    function toggleStack(id) {
      const el = document.getElementById(id);
      el.style.display = (el.style.display === "none" ? "block" : "none");
    }
  </script>
</head>
<body>
  <h1>📊 Playwright Test Report</h1>
  <div class="summary">
    <div>✅ Passed: ${passed}</div>
    <div>❌ Failed: ${failed}</div>
    <div>⚠️ Skipped: ${skipped}</div>
    <div>📂 Total: ${this.results.length}</div>
  </div>
  ${this.results.map((r, i) => `
    <div class="test ${r.status}">
      <h3>${r.name}</h3>
      <div class="meta">📄 ${r.file}:${r.line}:${r.column} | ⏱ ${r.duration} ms | 🔁 Retry: ${r.retry}</div>
      <p>Status: <strong>${r.status.toUpperCase()}</strong></p>
      ${r.errorMessage ? `<p class="error-message">Error: ${r.errorMessage}</p>` : ""}
      ${r.errorStack ? `<span class="toggle-btn" onclick="toggleStack('stack${i}')">Show/Hide Stack Trace</span>
      <pre id="stack${i}" class="error-stack">${r.errorStack}</pre>` : ""}
    </div>
  `).join('')}
</body>
</html>
`;

    fs.writeFileSync('playwright-report.html', html);
    console.log('📄 Custom HTML report saved: playwright-report.html');
  }
}

export default MyHtmlReporter;
