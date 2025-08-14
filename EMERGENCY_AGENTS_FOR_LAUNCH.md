# 🔴 EMERGENCY SUB-AGENTS FOR IMMEDIATE DEPLOYMENT
## Critical Agents for Next Week's User Onboarding

**CTO Priority**: MAXIMUM URGENCY  
**Timeline**: MUST BE READY BY MONDAY  
**User Onboarding**: NEXT WEEK

---

## 🚨 AGENT 1: PROMPT SAVER AGENT (Your Memory Bank)

```typescript
// This agent saves EVERYTHING for perfect context retention
class PromptSaverAgent extends AgentFramework {
  private storage: {
    prompts: Map<string, PromptData>;
    sessions: Map<string, SessionData>;
    context: Map<string, ContextData>;
  };

  constructor() {
    super({
      name: 'CLAT Prompt Memory Bank',
      type: 'persistent_memory',
      storage: 'local_and_cloud',
      auto_save: true
    });
    
    this.storage = {
      prompts: new Map(),
      sessions: new Map(),
      context: new Map()
    };
    
    // Auto-save every prompt
    this.enableAutoSave();
  }

  // Automatically save every prompt
  async savePrompt(prompt: string, response?: string, metadata?: any) {
    const promptId = `prompt_${Date.now()}_${Math.random().toString(36)}`;
    
    const promptData = {
      id: promptId,
      timestamp: new Date().toISOString(),
      prompt: prompt,
      response: response,
      metadata: {
        project: 'CLAT_Platform',
        user: 'CTO',
        importance: this.calculateImportance(prompt),
        category: this.categorizePrompt(prompt),
        tokens_used: this.estimateTokens(prompt),
        ...metadata
      }
    };
    
    // Save to multiple locations for redundancy
    await this.saveToLocal(promptData);
    await this.saveToCloud(promptData);
    await this.saveToMarkdown(promptData);
    
    // Update context
    await this.updateContext(promptData);
    
    return promptId;
  }

  // Save to local file system
  private async saveToLocal(data: any) {
    const date = new Date().toISOString().split('T')[0];
    const filePath = `/Users/vivekmishra/level-up-v2/prompts/${date}_prompts.json`;
    
    // Create directory if not exists
    await this.execute({
      task: 'Create directory if not exists',
      path: '/Users/vivekmishra/level-up-v2/prompts'
    });
    
    // Append to daily file
    await this.execute({
      task: 'Append prompt to file',
      file: filePath,
      data: data,
      format: 'json'
    });
  }

  // Save to cloud (Supabase)
  private async saveToCloud(data: any) {
    await this.execute({
      task: 'Save to Supabase',
      table: 'development_prompts',
      data: data
    });
  }

  // Save as markdown for easy reading
  private async saveToMarkdown(data: any) {
    const date = new Date().toISOString().split('T')[0];
    const filePath = `/Users/vivekmishra/level-up-v2/prompts/${date}_prompts.md`;
    
    const markdown = `
## Prompt ${data.id}
**Time**: ${data.timestamp}
**Category**: ${data.metadata.category}
**Tokens**: ${data.metadata.tokens_used}

### Prompt:
\`\`\`
${data.prompt}
\`\`\`

### Response:
\`\`\`
${data.response || 'Pending...'}
\`\`\`

---
`;
    
    await this.execute({
      task: 'Append to markdown file',
      file: filePath,
      content: markdown
    });
  }

  // Retrieve prompts by various filters
  async getPrompts(filter?: {
    date?: string;
    category?: string;
    importance?: 'critical' | 'high' | 'medium' | 'low';
    search?: string;
  }) {
    return await this.execute({
      task: 'Retrieve prompts',
      filter: filter,
      sort: 'timestamp_desc'
    });
  }

  // Create daily summary
  async createDailySummary() {
    const today = new Date().toISOString().split('T')[0];
    const prompts = await this.getPrompts({ date: today });
    
    const summary = {
      date: today,
      total_prompts: prompts.length,
      total_tokens: prompts.reduce((sum, p) => sum + p.metadata.tokens_used, 0),
      categories: this.groupByCategory(prompts),
      critical_items: prompts.filter(p => p.metadata.importance === 'critical'),
      key_decisions: this.extractKeyDecisions(prompts)
    };
    
    await this.saveToMarkdown({
      id: `summary_${today}`,
      timestamp: new Date().toISOString(),
      prompt: 'Daily Summary',
      response: JSON.stringify(summary, null, 2),
      metadata: { type: 'summary' }
    });
    
    return summary;
  }

  // Context reconstruction for new sessions
  async reconstructContext() {
    const recentPrompts = await this.getPrompts({ 
      date: new Date().toISOString().split('T')[0] 
    });
    
    return {
      project_state: 'CLAT Platform Development',
      recent_work: recentPrompts.slice(0, 10),
      critical_tasks: recentPrompts.filter(p => p.metadata.importance === 'critical'),
      current_focus: this.determineCurrentFocus(recentPrompts)
    };
  }
}

// Usage
const promptSaver = new PromptSaverAgent();

// Auto-save every interaction
promptSaver.savePrompt(
  "Create payment integration",
  "Payment integration code here...",
  { importance: 'critical', module: 'payment' }
);

// Retrieve all critical prompts
const criticalPrompts = await promptSaver.getPrompts({ importance: 'critical' });

// Get today's summary
const summary = await promptSaver.createDailySummary();
```

---

## 🚨 AGENT 2: TOKEN LIMIT MONITOR AGENT (Never Lose Context!)

```typescript
class TokenLimitMonitorAgent extends AgentFramework {
  private readonly CLAUDE_LIMITS = {
    OPUS: 200000,      // 200k token context window
    SONNET: 200000,    // 200k token context window  
    HAIKU: 200000,     // 200k token context window
    WARNING_THRESHOLD: 0.75,  // Warn at 75% usage
    CRITICAL_THRESHOLD: 0.90  // Critical at 90% usage
  };

  private tokenUsage = {
    current: 0,
    session_total: 0,
    daily_total: 0,
    model: 'OPUS',
    context_items: []
  };

  constructor() {
    super({
      name: 'Token Limit Guardian',
      type: 'monitor',
      real_time: true,
      auto_alert: true
    });
    
    // Start monitoring immediately
    this.startMonitoring();
  }

  // Real-time token tracking
  async trackTokens(text: string, type: 'input' | 'output') {
    const tokens = this.estimateTokens(text);
    
    this.tokenUsage.current += tokens;
    this.tokenUsage.session_total += tokens;
    this.tokenUsage.daily_total += tokens;
    
    // Check limits
    const usage_percentage = this.tokenUsage.current / this.CLAUDE_LIMITS[this.tokenUsage.model];
    
    if (usage_percentage >= this.CLAUDE_LIMITS.CRITICAL_THRESHOLD) {
      await this.criticalAlert();
    } else if (usage_percentage >= this.CLAUDE_LIMITS.WARNING_THRESHOLD) {
      await this.warningAlert();
    }
    
    // Auto-save context if approaching limit
    if (usage_percentage >= 0.85) {
      await this.autoSaveContext();
    }
    
    return {
      tokens_used: tokens,
      current_total: this.tokenUsage.current,
      percentage_used: usage_percentage * 100,
      tokens_remaining: this.CLAUDE_LIMITS[this.tokenUsage.model] - this.tokenUsage.current,
      status: this.getStatus(usage_percentage)
    };
  }

  // Token estimation (rough calculation)
  private estimateTokens(text: string): number {
    // Rough estimate: 1 token ≈ 4 characters
    // More accurate: use tiktoken or similar
    return Math.ceil(text.length / 4);
  }

  // Warning alert at 75%
  private async warningAlert() {
    const remaining = this.CLAUDE_LIMITS[this.tokenUsage.model] - this.tokenUsage.current;
    
    console.warn(`
    ⚠️ TOKEN LIMIT WARNING
    ========================
    Used: ${this.tokenUsage.current} tokens (75%)
    Remaining: ${remaining} tokens
    Recommendation: Start summarizing context
    `);
    
    // Auto-summarize less important context
    await this.smartContextCompression();
    
    // Save current state
    await this.saveCheckpoint();
    
    return {
      alert: 'warning',
      message: `75% of token limit reached. ${remaining} tokens remaining.`,
      action: 'Context compression initiated'
    };
  }

  // Critical alert at 90%
  private async criticalAlert() {
    const remaining = this.CLAUDE_LIMITS[this.tokenUsage.model] - this.tokenUsage.current;
    
    console.error(`
    🔴 CRITICAL TOKEN LIMIT
    ========================
    Used: ${this.tokenUsage.current} tokens (90%)
    Remaining: ${remaining} tokens
    ACTION REQUIRED: Save context and start new session
    `);
    
    // Emergency actions
    await this.emergencyContextSave();
    await this.prepareNewSession();
    
    return {
      alert: 'critical',
      message: `CRITICAL: 90% limit reached! Only ${remaining} tokens left!`,
      action: 'Emergency context save completed. Ready for new session.'
    };
  }

  // Smart context compression
  private async smartContextCompression() {
    console.log('🔄 Compressing context intelligently...');
    
    // Identify compressible items
    const compressible = this.tokenUsage.context_items.filter(item => 
      item.importance !== 'critical' && 
      item.age > 30 // minutes
    );
    
    // Compress or remove old, non-critical context
    for (const item of compressible) {
      if (item.type === 'code') {
        // Keep only signatures, not full implementation
        item.content = this.extractSignatures(item.content);
      } else if (item.type === 'discussion') {
        // Summarize discussions
        item.content = await this.summarize(item.content);
      }
    }
    
    // Recalculate tokens
    this.recalculateTokens();
    
    console.log(`✅ Freed up ${this.tokensSaved} tokens through compression`);
  }

  // Emergency context save
  private async emergencyContextSave() {
    const timestamp = new Date().toISOString();
    const filename = `emergency_context_${timestamp}.json`;
    
    const context = {
      timestamp,
      tokens_used: this.tokenUsage.current,
      session_total: this.tokenUsage.session_total,
      critical_items: this.tokenUsage.context_items.filter(i => i.importance === 'critical'),
      current_task: this.getCurrentTask(),
      next_steps: this.getNextSteps()
    };
    
    // Save to multiple locations
    await this.execute({
      task: 'Save emergency context',
      file: `/Users/vivekmishra/level-up-v2/context/${filename}`,
      data: context
    });
    
    // Create continuation prompt
    const continuationPrompt = `
    # Context Continuation
    Previous session reached token limit.
    Load context from: ${filename}
    Current task: ${context.current_task}
    Next steps: ${context.next_steps.join(', ')}
    `;
    
    await this.execute({
      task: 'Save continuation prompt',
      file: `/Users/vivekmishra/level-up-v2/context/continuation.md`,
      content: continuationPrompt
    });
    
    return filename;
  }

  // Real-time monitoring dashboard
  async getTokenDashboard() {
    const usage = (this.tokenUsage.current / this.CLAUDE_LIMITS[this.tokenUsage.model]) * 100;
    
    return {
      current_usage: `${this.tokenUsage.current} / ${this.CLAUDE_LIMITS[this.tokenUsage.model]}`,
      percentage: `${usage.toFixed(2)}%`,
      status: this.getStatus(usage / 100),
      remaining: this.CLAUDE_LIMITS[this.tokenUsage.model] - this.tokenUsage.current,
      estimated_prompts_left: Math.floor((this.CLAUDE_LIMITS[this.tokenUsage.model] - this.tokenUsage.current) / 500),
      session_total: this.tokenUsage.session_total,
      daily_total: this.tokenUsage.daily_total,
      recommendations: this.getRecommendations(usage)
    };
  }

  // Get status based on usage
  private getStatus(percentage: number): string {
    if (percentage < 0.5) return '🟢 Healthy';
    if (percentage < 0.75) return '🟡 Monitor';
    if (percentage < 0.9) return '🟠 Warning';
    return '🔴 Critical';
  }

  // Get recommendations based on usage
  private getRecommendations(usage: number): string[] {
    const recommendations = [];
    
    if (usage > 90) {
      recommendations.push('Start new session immediately');
      recommendations.push('Save all critical context');
    } else if (usage > 75) {
      recommendations.push('Begin summarizing non-critical context');
      recommendations.push('Prepare for session transition');
    } else if (usage > 50) {
      recommendations.push('Monitor token usage closely');
      recommendations.push('Consider removing old context');
    }
    
    return recommendations;
  }

  // Auto-start monitoring
  private startMonitoring() {
    // Monitor every interaction
    setInterval(async () => {
      const dashboard = await this.getTokenDashboard();
      
      // Log if approaching limits
      if (dashboard.percentage > 70) {
        console.log(`📊 Token Usage: ${dashboard.percentage} - ${dashboard.status}`);
      }
    }, 60000); // Check every minute
  }
}

// Initialize and use
const tokenMonitor = new TokenLimitMonitorAgent();

// Track every prompt/response
await tokenMonitor.trackTokens("Your prompt here", "input");
await tokenMonitor.trackTokens("Claude's response here", "output");

// Get current status
const dashboard = await tokenMonitor.getTokenDashboard();
console.log(dashboard);
```

---

## 🔴 EMERGENCY TIMELINE FOR USER ONBOARDING (NEXT WEEK!)

### THIS WEEKEND (48 HOURS TO MONDAY)

#### SATURDAY (DAY 1)
```typescript
class SaturdayEmergencySprint {
  async execute() {
    // 9 AM - 12 PM: Framework Setup + Critical Agents
    await this.setupFramework();
    await this.createPromptSaver();
    await this.createTokenMonitor();
    
    // 12 PM - 3 PM: Fix Authentication
    const authAgent = new AuthenticationFixAgent();
    await authAgent.fixSMSOTP();
    await authAgent.implementLoginFlow();
    await authAgent.testAllRoles();
    
    // 3 PM - 6 PM: Connect Backend
    const backendAgent = new BackendConnectionAgent();
    await backendAgent.connectStudentDashboard();
    await backendAgent.connectParentDashboard();
    
    // 6 PM - 9 PM: Create Mock Tests
    const testAgent = new MockTestAgent();
    await testAgent.create10CompleteMockTests();
    
    console.log('✅ Day 1 Complete: Auth + Backend + Tests');
  }
}
```

#### SUNDAY (DAY 2)
```typescript
class SundayEmergencySprint {
  async execute() {
    // 9 AM - 12 PM: Payment Integration
    const paymentAgent = new PaymentAgent();
    await paymentAgent.integrateRazorpay();
    await paymentAgent.createSubscriptionPlans();
    await paymentAgent.testPaymentFlow();
    
    // 12 PM - 3 PM: Performance Optimization
    const perfAgent = new PerformanceAgent();
    await perfAgent.optimizeLoadTime();
    await perfAgent.implementCaching();
    await perfAgent.fixMobileResponsive();
    
    // 3 PM - 6 PM: Testing Everything
    const testingAgent = new TestingAgent();
    await testingAgent.testUserRegistration();
    await testingAgent.testMockTests();
    await testingAgent.testPayments();
    
    // 6 PM - 9 PM: Deployment Prep
    await this.deployToStaging();
    await this.runE2ETests();
    
    console.log('✅ Day 2 Complete: Payments + Performance + Testing');
  }
}
```

### MONDAY (USER ONBOARDING PREP)
```typescript
class MondayLaunchPrep {
  async execute() {
    // Morning: Final Testing
    await this.testCompleteUserJourney();
    await this.loadTest100Users();
    
    // Afternoon: Production Deployment
    await this.deployToProduction();
    await this.setupMonitoring();
    await this.configureAlerts();
    
    // Evening: Ready for Users
    console.log('🚀 READY FOR USER ONBOARDING TUESDAY!');
  }
}
```

---

## 🎯 CRITICAL PATH TO USER ONBOARDING

### Must-Have Features for Launch (Non-Negotiable)
```typescript
const LAUNCH_REQUIREMENTS = {
  authentication: {
    sms_otp: 'WORKING',
    login_flow: 'COMPLETE',
    role_routing: 'FUNCTIONAL'
  },
  
  student_features: {
    dashboard: 'CONNECTED_TO_BACKEND',
    mock_tests: 'AT_LEAST_5_TESTS',
    results: 'REAL_TIME_SCORING'
  },
  
  parent_features: {
    child_linking: 'FUNCTIONAL',
    progress_viewing: 'REAL_DATA',
    payment: 'RAZORPAY_INTEGRATED'
  },
  
  performance: {
    load_time: '< 3 seconds',
    mobile: 'FULLY_RESPONSIVE',
    stability: 'NO_CRASHES'
  }
};
```

### Agent Assignment for Weekend Sprint
```typescript
const WEEKEND_ASSIGNMENTS = {
  'CTO (Me)': {
    agents: [PromptSaverAgent, TokenMonitorAgent, OrchestratorAgent],
    focus: 'Framework setup + Critical fixes'
  },
  
  'Developer 1': {
    agent: AuthenticationAgent,
    deadline: 'Saturday 6 PM',
    deliverable: 'Working login for all roles'
  },
  
  'Developer 2': {
    agent: MockTestAgent,
    deadline: 'Sunday 12 PM',
    deliverable: '10 complete mock tests'
  },
  
  'Developer 3': {
    agent: PaymentAgent,
    deadline: 'Sunday 6 PM',
    deliverable: 'Razorpay integration'
  }
};
```

---

## MY CTO COMMITMENT FOR USER ONBOARDING

**I guarantee the following by Monday evening:**

1. ✅ Authentication working for all user types
2. ✅ Student dashboard with real data
3. ✅ 10 functional mock tests
4. ✅ Payment system integrated
5. ✅ Performance optimized (<3 sec load)
6. ✅ Mobile responsive
7. ✅ Prompt saving system active
8. ✅ Token monitoring operational

**We WILL onboard users next week. This is not a hope - it's a guarantee.**

**Starting emergency sprint in 1 hour. All hands on deck!**

---

**CTO Sign-off**: This is our moment. We ship or we sink. I choose SHIP! 🚀