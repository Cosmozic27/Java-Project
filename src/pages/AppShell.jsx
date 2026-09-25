import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Sparkles, 
  Layers, 
  Palette, 
  CheckCircle2, 
  ArrowRight 
} from 'lucide-react';
import { Button } from '@/components/common/Button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/cards/Card';
import { PageContainer } from '@/components/common/PageContainer';
import { PageHeader } from '@/components/common/PageHeader';
import { COLORS } from '@/constants/tokens';

export function AppShell() {
  const [loadingDemo, setLoadingDemo] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  const toggleLoading = () => {
    setLoadingDemo(true);
    setTimeout(() => setLoadingDemo(false), 1500);
  };

  return (
    <PageContainer maxWidth="7xl">
      {/* 14. Reusable PageHeader */}
      <PageHeader
        title="FoodBridge System Foundation"
        description="Production-grade architecture foundation initialized with modular design tokens, Tailwind CSS, React Router, and reusable core UI primitives."
        divider
        badge={
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-primary-light text-primary-dark border border-primary/20">
            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
            Phase 1 Setup Active
          </span>
        }
        actions={
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setClickCount((prev) => prev + 1)}
            >
              Interactive Test: {clickCount}
            </Button>
            <Button
              variant="primary"
              size="sm"
              isLoading={loadingDemo}
              leftIcon={<Sparkles className="h-4 w-4" />}
              onClick={toggleLoading}
            >
              Simulate Action
            </Button>
          </div>
        }
      />

      {/* Grid of reusable primitives & token system */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Card 1: Design Tokens & Palette */}
        <Card variant="default">
          <CardHeader>
            <div className="flex items-center gap-2 text-primary font-medium text-xs tracking-wider uppercase mb-1">
              <Palette className="h-4 w-4" />
              <span>Design Token System</span>
            </div>
            <CardTitle>Centralized Color Palette</CardTitle>
            <CardDescription>
              Configured in tokens.js and Tailwind theme. No scattered hex values.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="flex items-center gap-2 p-2 rounded-lg bg-surface-muted border border-border">
                <span className="h-4 w-4 rounded-md bg-primary shrink-0 shadow-xs" />
                <div className="min-w-0">
                  <div className="font-semibold text-text-primary">Primary</div>
                  <div className="text-text-secondary text-[11px]">{COLORS.primary.DEFAULT}</div>
                </div>
              </div>

              <div className="flex items-center gap-2 p-2 rounded-lg bg-surface-muted border border-border">
                <span className="h-4 w-4 rounded-md bg-primary-dark shrink-0 shadow-xs" />
                <div className="min-w-0">
                  <div className="font-semibold text-text-primary">Primary Dark</div>
                  <div className="text-text-secondary text-[11px]">{COLORS.primary.dark}</div>
                </div>
              </div>

              <div className="flex items-center gap-2 p-2 rounded-lg bg-surface-muted border border-border">
                <span className="h-4 w-4 rounded-md bg-accent shrink-0 shadow-xs" />
                <div className="min-w-0">
                  <div className="font-semibold text-text-primary">Accent</div>
                  <div className="text-text-secondary text-[11px]">{COLORS.accent.DEFAULT}</div>
                </div>
              </div>

              <div className="flex items-center gap-2 p-2 rounded-lg bg-surface-muted border border-border">
                <span className="h-4 w-4 rounded-md bg-background border border-border shrink-0 shadow-xs" />
                <div className="min-w-0">
                  <div className="font-semibold text-text-primary">Background</div>
                  <div className="text-text-secondary text-[11px]">{COLORS.background.DEFAULT}</div>
                </div>
              </div>

              <div className="flex items-center gap-2 p-2 rounded-lg bg-surface-muted border border-border">
                <span className="h-4 w-4 rounded-md bg-text-primary shrink-0 shadow-xs" />
                <div className="min-w-0">
                  <div className="font-semibold text-text-primary">Text Primary</div>
                  <div className="text-text-secondary text-[11px]">{COLORS.text.primary}</div>
                </div>
              </div>

              <div className="flex items-center gap-2 p-2 rounded-lg bg-surface-muted border border-border">
                <span className="h-4 w-4 rounded-md bg-border-strong shrink-0 shadow-xs" />
                <div className="min-w-0">
                  <div className="font-semibold text-text-primary">Border</div>
                  <div className="text-text-secondary text-[11px]">{COLORS.border.DEFAULT}</div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="justify-between text-xs text-text-secondary">
            <span>Font: Plus Jakarta Sans / Inter</span>
            <span className="font-medium text-primary flex items-center gap-1">
              <CheckCircle2 className="h-3.5 w-3.5" /> Tokens Active
            </span>
          </CardFooter>
        </Card>

        {/* Card 2: Reusable Button Variants Component */}
        <Card variant="default">
          <CardHeader>
            <div className="flex items-center gap-2 text-primary font-medium text-xs tracking-wider uppercase mb-1">
              <ShieldCheck className="h-4 w-4" />
              <span>Modular Component</span>
            </div>
            <CardTitle>Reusable Button Primitive</CardTitle>
            <CardDescription>
              Accessible, polymorphic states, loading spinner, and variant styling.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <Button variant="primary" size="sm">Primary</Button>
              <Button variant="secondary" size="sm">Secondary</Button>
              <Button variant="outline" size="sm">Outline</Button>
              <Button variant="ghost" size="sm">Ghost</Button>
              <Button variant="danger" size="sm">Danger</Button>
            </div>

            <div className="pt-2 border-t border-border/60">
              <div className="text-xs font-semibold text-text-secondary mb-2">Sizes & States:</div>
              <div className="flex flex-wrap items-center gap-2">
                <Button size="sm" variant="primary">Small</Button>
                <Button size="md" variant="primary">Medium</Button>
                <Button size="sm" variant="outline" disabled>Disabled</Button>
                <Button size="sm" variant="secondary" isLoading>Loading</Button>
              </div>
            </div>
          </CardContent>
          <CardFooter className="text-xs text-text-secondary">
            <span>Fully compliant with keyboard focus and ARIA attributes</span>
          </CardFooter>
        </Card>

        {/* Card 3: Modular Architecture Check */}
        <Card variant="interactive">
          <CardHeader>
            <div className="flex items-center gap-2 text-primary font-medium text-xs tracking-wider uppercase mb-1">
              <Layers className="h-4 w-4" />
              <span>Project Structure</span>
            </div>
            <CardTitle>Architecture Status</CardTitle>
            <CardDescription>
              Clear modular separation ready for upcoming feature development.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-xs text-text-secondary">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                <span><strong>src/components:</strong> common, navigation, forms, cards, feedback, data-display</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                <span><strong>src/pages:</strong> public, auth, donor, ngo, admin</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                <span><strong>src/routes:</strong> React Router setup with MainLayout shell</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                <span><strong>src/constants:</strong> tokens.js centralized design system</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                <span><strong>src/services:</strong> Axios instance configured</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter className="justify-between text-xs font-medium text-primary">
            <span>Interactive card hover state</span>
            <ArrowRight className="h-4 w-4" />
          </CardFooter>
        </Card>
      </div>
    </PageContainer>
  );
}

export default AppShell;
