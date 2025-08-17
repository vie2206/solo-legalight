# Dependabot Setup Guide

## Overview

Dependabot has been configured for automated dependency management across all SOLO by Legalight repositories. This ensures security updates are applied promptly and dependencies stay current.

## Configuration Summary

### Frontend Repository (`solo-legalight`)
- **Weekly Updates**: Monday 9:00 AM IST
- **Security Updates**: Daily
- **Groups**: React ecosystem, testing libraries, UI components, build tools
- **Limits**: 5 regular PRs, 10 security PRs

### Backend Repository (`solo-legalight-backend`) 
- **Weekly Updates**: Wednesday 9:00 AM IST
- **Security Updates**: Daily
- **Monthly Reviews**: 15th of each month for production deps
- **Groups**: Express, Supabase, authentication, AI services, file processing
- **Limits**: 5 regular PRs, 10 security PRs, 3 monthly review PRs

### Marketing Site (`solo-legalight/marketing`)
- **Weekly Updates**: Tuesday 9:00 AM IST  
- **Security Updates**: Daily
- **Groups**: Next.js, React, Radix UI, forms, build tools

## Update Schedule

| Day | Repository | Type | Time |
|-----|-----------|------|------|
| Monday | Frontend | Regular Updates | 9:00 AM IST |
| Tuesday | Marketing | Regular Updates | 9:00 AM IST |
| Wednesday | Backend | Regular Updates | 9:00 AM IST |
| Daily | All | Security Updates | As available |
| Monthly (15th) | Backend | Production Review | 9:00 AM IST |

## Dependency Groups

### Frontend Groups
- **react-ecosystem**: React, React DOM, React types
- **testing-libraries**: Jest, Testing Library packages  
- **ui-components**: Headless UI, Heroicons, Lucide, Framer Motion
- **build-tools**: TypeScript, Tailwind, PostCSS, Autoprefixer

### Backend Groups
- **express-ecosystem**: Express and related middleware
- **supabase-ecosystem**: Supabase client and utilities
- **authentication**: bcryptjs, JWT, Twilio
- **ai-services**: Anthropic, OpenAI SDKs
- **file-processing**: ExcelJS, Multer, CSV utilities

### Marketing Groups
- **nextjs-ecosystem**: Next.js and related packages
- **radix-ui**: All Radix UI components
- **form-handling**: React Hook Form, Zod validation
- **build-tools**: TypeScript, Tailwind, ESLint, Prettier

## Security Policies

### Automatic Approval
- **Patch updates** for dependencies with no breaking changes
- **Security patches** are automatically prioritized
- **Minor updates** for well-tested packages (React, Next.js)

### Manual Review Required
- **Major version updates** (breaking changes)
- **React Scripts updates** (pinned to avoid CRA issues)
- **Core framework updates** (React 19+ major versions)

## Managing Dependabot PRs

### PR Labels
- `dependencies`: All dependency updates
- `security`: Security-related updates  
- `frontend`: Frontend repository updates
- `backend`: Backend repository updates
- `marketing`: Marketing site updates

### Reviewing PRs

1. **Security Updates**: Merge immediately after CI passes
2. **Patch Updates**: Review changelog, merge if no issues
3. **Minor Updates**: Test locally if affecting core functionality  
4. **Major Updates**: Full testing required, coordinate with team

### Testing Checklist
- [ ] CI/CD pipeline passes
- [ ] Build completes successfully
- [ ] No TypeScript errors
- [ ] Core functionality works
- [ ] Performance not degraded

## Configuration Files

### Frontend: `.github/dependabot.yml`
```yaml
# Configured for React app with grouped updates
# Weekly schedule: Monday 9 AM IST
# Security updates: Daily
```

### Backend: `.github/dependabot.yml`  
```yaml
# Configured for Node.js backend
# Weekly schedule: Wednesday 9 AM IST
# Monthly production review: 15th of month
```

## Customization

### Adding New Dependency Groups
```yaml
groups:
  new-group-name:
    patterns:
      - "package-pattern-*"
      - "specific-package"
```

### Ignoring Specific Updates
```yaml
ignore:
  - dependency-name: "package-name"
    update-types: ["version-update:semver-major"]
```

### Changing Schedule
```yaml
schedule:
  interval: "weekly" # daily, weekly, monthly
  day: "monday"     # monday-sunday
  time: "09:00"     # HH:MM format
  timezone: "Asia/Kolkata"
```

## Troubleshooting

### Too Many PRs
- Reduce `open-pull-requests-limit`
- Add more packages to `ignore` list
- Use more specific `groups` to batch updates

### Failed Updates
- Check for breaking changes in changelog
- Test updates locally before merging
- Consider pinning problematic packages

### Security Alerts
- Always prioritize security updates
- Review GitHub Security Advisories
- Update immediately if actively exploited

## Monitoring

### GitHub Interface
- Repository → Insights → Dependency graph
- Security → Dependabot alerts
- Pull requests → Labels: dependencies

### Notifications
- Watch repository for Dependabot PRs
- Enable email notifications for security alerts
- Set up Slack integration for team updates

## Best Practices

1. **Review Weekly**: Check all pending Dependabot PRs
2. **Test Major Updates**: Always test breaking changes locally
3. **Monitor CI**: Ensure automated tests catch regressions
4. **Document Changes**: Note any manual configuration needed
5. **Team Communication**: Coordinate major updates with team

## Emergency Procedures

### Critical Security Vulnerability
1. Merge security PR immediately
2. Deploy to staging for testing
3. Deploy to production if tests pass
4. Monitor application for issues

### Broken Dependency
1. Revert the problematic PR
2. Add package to ignore list temporarily  
3. Investigate issue and fix manually
4. Remove from ignore list once resolved

## Support

For Dependabot issues:
- GitHub Dependabot Documentation
- Repository Issues tab
- Team lead for configuration changes