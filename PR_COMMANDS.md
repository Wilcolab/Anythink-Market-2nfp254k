# GitHub Pull Request Commands Reference

This file contains all the commands needed to manage the Pull Request for the Python to Node.js backend migration.

## 📋 Table of Contents
1. [Creating the Pull Request](#creating-the-pull-request)
2. [Adding Reviewers](#adding-reviewers)
3. [Managing Labels](#managing-labels)
4. [Viewing PR Status](#viewing-pr-status)
5. [Reviewing Process](#reviewing-process)
6. [Merging the PR](#merging-the-pr)

---

## Creating the Pull Request

### Create PR with Title and Description

```bash
gh pr create \
  --title "feat: Migrate Python Backend to Node.js/Express" \
  --body "$(cat PR_DESCRIPTION.md)" \
  --base main \
  --head migrate-python-to-node
```

**Shorter version** (manual description):
```bash
gh pr create \
  --title "feat: Migrate Python Backend to Node.js/Express" \
  --body "Complete migration from Python/FastAPI to Node.js/Express with MVC architecture, comprehensive testing, and documentation." \
  --base main \
  --head migrate-python-to-node
```

**Interactive version** (opens editor):
```bash
gh pr create --base main --head migrate-python-to-node
```

---

## Adding Reviewers

### Add Individual Reviewers

```bash
# Add reviewer by username
gh pr edit migrate-python-to-node --add-reviewer USERNAME

# Add multiple reviewers
gh pr edit migrate-python-to-node --add-reviewer USER1,USER2,USER3
```

### Add Team Reviewers (if you have teams)

```bash
# Add team reviewer
gh pr edit migrate-python-to-node --add-reviewer ORG/TEAM-NAME
```

### Example:
```bash
# Add specific users
gh pr edit migrate-python-to-node --add-reviewer johnsmith,janedoe

# Add organization team
gh pr edit migrate-python-to-node --add-reviewer Wilcolab/backend-team
```

---

## Managing Labels

### Add Labels to PR

```bash
# Add single label
gh pr edit migrate-python-to-node --add-label "enhancement"

# Add multiple labels
gh pr edit migrate-python-to-node --add-label "enhancement,migration,backend"
```

### Common Label Examples:

```bash
# Enhancement/Feature
gh pr edit migrate-python-to-node --add-label "enhancement"

# Migration related
gh pr edit migrate-python-to-node --add-label "migration"

# Backend changes
gh pr edit migrate-python-to-node --add-label "backend"

# Documentation
gh pr edit migrate-python-to-node --add-label "documentation"

# Testing
gh pr edit migrate-python-to-node --add-label "testing"

# Ready for review
gh pr edit migrate-python-to-node --add-label "ready-for-review"

# MLH/WILCO Quest
gh pr edit migrate-python-to-node --add-label "mlh-quest"
```

### Remove Labels

```bash
gh pr edit migrate-python-to-node --remove-label "work-in-progress"
```

---

## Viewing PR Status

### View PR Details

```bash
# View PR in browser
gh pr view migrate-python-to-node --web

# View PR in terminal
gh pr view migrate-python-to-node

# View PR checks/status
gh pr checks migrate-python-to-node

# View PR diff
gh pr diff migrate-python-to-node
```

### List All PRs

```bash
# List all open PRs
gh pr list

# List all PRs (including closed)
gh pr list --state all

# List your PRs
gh pr list --author @me
```

---

## Reviewing Process

### Request Review from Others

```bash
# Request review from specific users
gh pr edit migrate-python-to-node --add-reviewer username1,username2

# Request review from team
gh pr edit migrate-python-to-node --add-reviewer Wilcolab/reviewers
```

### Review Commands (For Reviewers)

```bash
# Approve PR
gh pr review migrate-python-to-node --approve

# Approve with comment
gh pr review migrate-python-to-node --approve --body "Great work! LGTM 👍"

# Request changes
gh pr review migrate-python-to-node --request-changes --body "Please address the following issues..."

# Add comment without approval
gh pr review migrate-python-to-node --comment --body "Question about the implementation..."
```

### Add Comments to Specific Files (For Reviewers)

```bash
# Comment on PR
gh pr comment migrate-python-to-node --body "Great migration! The test coverage is excellent."

# Add comment to specific file (requires line number)
gh pr review migrate-python-to-node \
  --comment \
  --body "Consider adding error handling here"
```

---

## Merging the PR

### Merge Strategies

#### 1. **Squash Merge** (Recommended - Clean History)
```bash
gh pr merge migrate-python-to-node --squash --delete-branch
```

With custom commit message:
```bash
gh pr merge migrate-python-to-node \
  --squash \
  --delete-branch \
  --subject "feat: Migrate Python Backend to Node.js/Express" \
  --body "Complete migration with MVC architecture, testing, and documentation"
```

#### 2. **Merge Commit** (Preserves All Commits)
```bash
gh pr merge migrate-python-to-node --merge --delete-branch
```

#### 3. **Rebase and Merge** (Linear History)
```bash
gh pr merge migrate-python-to-node --rebase --delete-branch
```

### Merge Options

```bash
# Merge and keep branch
gh pr merge migrate-python-to-node --squash

# Merge with auto-merge (when checks pass)
gh pr merge migrate-python-to-node --squash --auto

# Merge without deleting branch
gh pr merge migrate-python-to-node --squash --delete-branch=false
```

---

## Complete Workflow Example

Here's a complete workflow from PR creation to merge:

```bash
# 1. Create the Pull Request
gh pr create \
  --title "feat: Migrate Python Backend to Node.js/Express" \
  --body "$(cat PR_DESCRIPTION.md)" \
  --base main \
  --head migrate-python-to-node

# 2. Add reviewers
gh pr edit migrate-python-to-node --add-reviewer johnsmith,janedoe

# 3. Add labels
gh pr edit migrate-python-to-node --add-label "enhancement,migration,backend,ready-for-review"

# 4. View PR status
gh pr view migrate-python-to-node

# 5. Wait for reviews and approvals...

# 6. After approval, merge PR
gh pr merge migrate-python-to-node --squash --delete-branch
```

---

## Automated PR Creation with All Options

Complete command with everything in one step:

```bash
gh pr create \
  --title "feat: Migrate Python Backend to Node.js/Express" \
  --body "$(cat PR_DESCRIPTION.md)" \
  --base main \
  --head migrate-python-to-node \
  --reviewer johnsmith,janedoe \
  --label "enhancement,migration,backend,ready-for-review" \
  --assignee @me
```

---

## Troubleshooting

### If PR Creation Fails

```bash
# Check if you're on the right branch
git branch

# Check remote
git remote -v

# Check if branch is pushed
git log origin/migrate-python-to-node

# Force push if needed
git push -f origin migrate-python-to-node
```

### If Reviewers Don't Exist

```bash
# List available users in organization
gh api /orgs/Wilcolab/members --jq '.[].login'

# Check if user has access
gh api /repos/Wilcolab/Anythink-Market-2nfp254k/collaborators/USERNAME
```

### Check PR Status

```bash
# View PR details
gh pr view migrate-python-to-node

# Check if PR can be merged
gh pr status

# View PR checks
gh pr checks migrate-python-to-node
```

---

## Additional Useful Commands

### Update PR Description

```bash
gh pr edit migrate-python-to-node --body "$(cat PR_DESCRIPTION.md)"
```

### Update PR Title

```bash
gh pr edit migrate-python-to-node --title "feat: Complete Backend Migration to Node.js"
```

### Add Assignees

```bash
gh pr edit migrate-python-to-node --add-assignee @me
gh pr edit migrate-python-to-node --add-assignee username1,username2
```

### Mark as Draft

```bash
gh pr ready migrate-python-to-node --undo  # Mark as draft
gh pr ready migrate-python-to-node          # Mark as ready
```

### Close PR (Without Merging)

```bash
gh pr close migrate-python-to-node
```

### Reopen PR

```bash
gh pr reopen migrate-python-to-node
```

---

## Web Interface Alternative

If you prefer the web interface:

```bash
# Open PR in browser
gh pr view migrate-python-to-node --web

# Open repo PR page
gh browse -- pulls
```

---

## Summary: Quick Commands

**Essential commands you'll need:**

```bash
# 1. Create PR
gh pr create --title "feat: Migrate Python Backend to Node.js/Express" --body "$(cat PR_DESCRIPTION.md)"

# 2. Add reviewers (replace with actual usernames)
gh pr edit migrate-python-to-node --add-reviewer USERNAME1,USERNAME2

# 3. Add labels
gh pr edit migrate-python-to-node --add-label "enhancement,migration,backend"

# 4. View PR
gh pr view migrate-python-to-node --web

# 5. Merge when approved
gh pr merge migrate-python-to-node --squash --delete-branch
```

---

## Notes

- Replace `USERNAME` with actual GitHub usernames
- Replace `Wilcolab` with your organization name if different
- Some commands require repository permissions
- Team reviewers require organization membership
- Labels must already exist in the repository

---

**Ready to create your PR!** 🚀

Use these commands to complete your MLH WILCO quest workflow.
