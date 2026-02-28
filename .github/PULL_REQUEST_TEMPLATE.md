###  Addressed Issues:
<!-- Link the issue this PR addresses -->
Fixes #(issue number)


###  Screenshots/Recordings:
<!-- If applicable, add screenshots or recordings. For keeper changes, prefer adding log snippets for one dry-run cycle and one real cycle. -->


###  Additional Notes:
<!-- Add keeper-specific context: target chain, strategy touched, contract address scope (if relevant), and rollback plan. -->


## Checklist
<!-- Mark items with [x] to indicate completion -->
- [ ] My code follows the project's code style and conventions
- [ ] I have made corresponding changes to the documentation
- [ ] My changes generate no new warnings or errors
- [ ] I ran `npm test` successfully
- [ ] I ran at least one keeper cycle locally (`npm run start:once`)
- [ ] If my change sends transactions, I tested with `DRY_RUN=true` first
- [ ] If I changed strategy logic, I added/updated tests for selection and execution paths
- [ ] I did not hardcode secrets (private keys, API keys, RPC auth tokens)
- [ ] I have joined the [Discord server](https://discord.gg/hjUhu33uAn) and I will share a link to this PR with the project maintainers there
- [ ] I have read the [Contributing Guidelines](./CONTRIBUTING.md)

## AI Notice - Important!

 We encourage contributors to use AI tools responsibly when creating Pull Requests. While AI can be a valuable aid, it is essential to ensure your keeper changes are deterministic, testable, and safe to run in production. Submissions that do not meet task requirements, fail tests, or skip operational validation may be closed without warning. Please understand every change you propose, especially around transaction execution and failure handling.

