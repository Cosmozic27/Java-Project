import React, { useState, useMemo, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  HelpCircle,
  Search,
  Mail,
  MessageSquare,
  BookOpen,
  Leaf,
  HeartHandshake,
  ShieldCheck,
  Settings2,
  Package,
  X,
} from 'lucide-react';
import { PageContent } from '@/components/common/PageContent';
import { PageHeader } from '@/components/common/PageHeader';
import { Card } from '@/components/cards/Card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { cn } from '@/utils/cn';

// ─── FAQ Data ────────────────────────────────────────────────────────────────

const FAQ_CATEGORIES = [
  { id: 'all', label: 'All Topics', icon: BookOpen },
  { id: 'general', label: 'General', icon: Leaf },
  { id: 'donor', label: 'Donor', icon: Package },
  { id: 'ngo', label: 'NGO / Organization', icon: HeartHandshake },
  { id: 'admin', label: 'Admin', icon: ShieldCheck },
  { id: 'system', label: 'System', icon: Settings2 },
];

const FAQ_ITEMS = [
  // GENERAL
  {
    id: 'gen-1',
    category: 'general',
    question: 'What is FoodBridge?',
    answer:
      'FoodBridge is a surplus food redistribution platform that connects food donors (restaurants, hostels, canteens, and catering services) with verified NGOs and community organizations. Our goal is to ensure that surplus food reaches people in need rather than going to waste.',
  },
  {
    id: 'gen-2',
    category: 'general',
    question: 'How does FoodBridge work?',
    answer:
      'FoodBridge operates in three simple steps: (1) Donors post surplus food listings with details like food type, quantity, and pickup window. (2) Verified NGOs browse available listings and request pickups. (3) Pickup is coordinated between the donor and NGO, and the platform tracks the entire lifecycle from listing to completion.',
  },
  {
    id: 'gen-3',
    category: 'general',
    question: 'Who can use FoodBridge?',
    answer:
      'FoodBridge is open to three types of users: Food Donors (restaurants, hostels, canteens, corporate cafeterias), NGOs and community organizations that distribute food to those in need, and Platform Administrators who govern the system and verify participating organizations.',
  },

  // DONOR
  {
    id: 'don-1',
    category: 'donor',
    question: 'How do I create a food donation?',
    answer:
      'Navigate to "My Donations" in your portal sidebar and click "New Donation". Fill in the food details including type, quantity, preparation time, pickup window, and any special handling instructions. Once published, your listing becomes visible to verified NGOs in your area.',
  },
  {
    id: 'don-2',
    category: 'donor',
    question: 'How do I update an active donation?',
    answer:
      'Open "My Donations" and click on the donation you wish to modify. You can edit details as long as the donation has not been claimed. To cancel, use the "Cancel Donation" button on the donation detail page. Cancellations automatically notify any NGO that may have expressed interest.',
  },
  {
    id: 'don-3',
    category: 'donor',
    question: 'How can I view donation history?',
    answer:
      'Open "History" in the donor portal to review completed and expired donations. "My Donations" contains current listings and their live status.',
  },
  {
    id: 'don-4',
    category: 'donor',
    question: 'What happens after an NGO accepts my donation?',
    answer:
      'Once an NGO claims your donation, the status changes to "Claimed" and the pickup window you specified becomes active. The NGO coordinator is notified and will arrange to pick up within your specified time. You can track the status from your donations page and will be notified when the pickup is confirmed as complete.',
  },
  {
    id: 'don-5',
    category: 'donor',
    question: 'How does pickup coordination work?',
    answer:
      'After a claim, confirm the pickup window and handoff details with the NGO coordinator. Keep the food safely stored until collection and update the donation status when the pickup is complete.',
  },

  // NGO
  {
    id: 'ngo-1',
    category: 'ngo',
    question: 'How do I find available food?',
    answer:
      'The "Available Food" page in your NGO portal shows all active food listings from donors in your area. You can filter by food type, quantity, proximity, and pickup time. Each listing shows the donor name, food category, quantity, and expiry window.',
  },
  {
    id: 'ngo-2',
    category: 'ngo',
    question: 'How do I coordinate a pickup?',
    answer:
      'Click on any available food listing to view details. If the listing matches your capacity and logistics, click "Claim Pickup" to request the food. The donor is notified immediately and the listing status changes to "Claimed". Coordinate final pickup logistics directly with the donor contact provided.',
  },
  {
    id: 'ngo-3',
    category: 'ngo',
    question: 'How do I view accepted donations?',
    answer:
      'Your "My Claims" page lists all your active and past pickup requests with real-time status updates. You can see which pickups are pending confirmation, which are scheduled, and which have been completed. Status changes trigger notifications to help you stay informed.',
  },
  {
    id: 'ngo-4',
    category: 'ngo',
    question: 'How does donation status work?',
    answer:
      'A listing moves from Available to Claimed when your organization requests it, then to Collected after pickup and Completed after distribution is recorded. Check My Claims for the current status.',
  },
  {
    id: 'ngo-5',
    category: 'ngo',
    question: 'How do I manage my organization profile?',
    answer:
      'Open Profile from the account area to review your organization details. Profile edits in this prototype are not submitted to a backend; contact an administrator for verified account changes.',
  },

  // ADMIN
  {
    id: 'adm-1',
    category: 'admin',
    question: 'How do I manage users?',
    answer:
      'The "Users & Roles" section in the Admin portal provides a full list of registered donors and NGOs. You can view individual user profiles, verify accounts, adjust roles, and deactivate accounts that violate platform policies.',
  },
  {
    id: 'adm-2',
    category: 'admin',
    question: 'How do I manage donations?',
    answer:
      'The "All Donations" section lists food listings across donors. Review the available details and current status from the table and donation pages.',
  },
  {
    id: 'adm-3',
    category: 'admin',
    question: 'How do I manage organization accounts?',
    answer:
      'The "NGO Verification" section lists all organization applications. New NGOs must be verified before they can claim donations. Review submitted documentation, approve or reject applications, and manage verified NGO profiles from this section.',
  },
  {
    id: 'adm-4',
    category: 'admin',
    question: 'How do I monitor the platform?',
    answer:
      'Use the admin dashboard for platform activity summaries, then review users, donations, claims, and organization verification sections for operational details.',
  },
  {
    id: 'adm-5',
    category: 'admin',
    question: 'How do I access reports?',
    answer:
      'Open "Reports & Analytics" from the admin navigation to view available platform summaries and activity metrics.',
  },

  // SYSTEM
  {
    id: 'sys-1',
    category: 'system',
    question: 'What happens to expired food listings?',
    answer:
      'Food listings automatically transition to "Expired" status when the pickup window closes without a successful collection. Expired listings are removed from the available food pool and archived. Donors are notified so they can make alternative arrangements for the remaining food.',
  },
  {
    id: 'sys-2',
    category: 'system',
    question: 'How is pickup status updated?',
    answer:
      'Pickup status follows an automated lifecycle: Available → Claimed → Pickup Pending → Collected → Completed. Status changes occur when donors post, NGOs claim, pickups are scheduled, and collections are confirmed. Both parties receive notifications at each stage.',
  },
  {
    id: 'sys-3',
    category: 'system',
    question: 'Who can access donation information?',
    answer:
      'Donor organizations can see their own donations in full detail. NGOs can see available food listings and the claims they have made. Platform Administrators have full visibility across all donors, NGOs, donations, and claims for governance and oversight purposes.',
  },
];

// ─── Main Page ────────────────────────────────────────────────────────────────

export function HelpFaqPage() {
  const { pathname } = useLocation();
  const portalRole = pathname.split('/')[1];
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState(
    ['admin', 'donor', 'ngo'].includes(portalRole) ? portalRole : 'all'
  );

  useEffect(() => {
    setActiveCategory(['admin', 'donor', 'ngo'].includes(portalRole) ? portalRole : 'all');
  }, [portalRole]);

  const filteredItems = useMemo(() => {
    let items = FAQ_ITEMS;
    if (activeCategory !== 'all') {
      items = items.filter((item) => item.category === activeCategory);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      items = items.filter(
        (item) =>
          item.question.toLowerCase().includes(q) ||
          item.answer.toLowerCase().includes(q)
      );
    }
    return items;
  }, [searchQuery, activeCategory]);

  const handleCategoryChange = (catId) => {
    setActiveCategory(catId);
  };

  return (
    <PageContent>
      <PageHeader
        title="Help & FAQs"
        description="Find answers to common questions about FoodBridge. Search or browse by category below."
        badge={
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-primary-light text-primary-dark border border-primary/20">
            <HelpCircle className="h-3.5 w-3.5" />
            Support Center
          </span>
        }
      />

      {/* Search Bar */}
      <div className="relative max-w-xl">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted pointer-events-none" />
        <input
          type="text"
          placeholder="Search questions and answers…"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-10 py-2.5 text-sm bg-surface border border-border rounded-xl text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40 transition-all"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => setSearchQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-secondary cursor-pointer"
            aria-label="Clear search"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      {/* Category Filter Tabs */}
      <div className="flex flex-wrap gap-2">
        {FAQ_CATEGORIES.map((cat) => {
          const Icon = cat.icon;
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => handleCategoryChange(cat.id)}
              className={cn(
                'inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all cursor-pointer',
                isActive
                  ? 'bg-primary text-white border-primary shadow-sm'
                  : 'bg-surface text-text-secondary border-border hover:border-border-strong hover:text-text-primary'
              )}
            >
              <Icon className="h-3.5 w-3.5" />
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* FAQ Accordions */}
      <Accordion type="multiple" className="space-y-3">
        {filteredItems.length === 0 ? (
          <Card className="text-center py-12">
            <HelpCircle className="h-10 w-10 text-text-muted mx-auto mb-3" />
            <p className="text-sm font-semibold text-text-primary mb-1">No results found</p>
            <p className="text-xs text-text-secondary">
              Try adjusting your search or browse a different category.
            </p>
          </Card>
        ) : (
          filteredItems.map((item) => (
            <AccordionItem
              key={item.id}
              value={item.id}
              className="overflow-hidden rounded-xl border border-border bg-surface px-5 transition-colors hover:border-border-strong"
            >
              <AccordionTrigger className="py-4 font-semibold text-text-primary hover:no-underline">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="border-t border-border/50 pt-3 text-text-secondary leading-relaxed">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))
        )}
      </Accordion>

      {/* Still Need Help Section */}
      <Card padding="lg" className="bg-gradient-to-br from-primary-light/60 to-accent-light border-primary/15">
        <div className="flex flex-col sm:flex-row sm:items-center gap-6">
          <div className="flex-1 space-y-1">
            <h2 className="text-base font-bold text-text-primary">Still need help?</h2>
            <p className="text-sm text-text-secondary leading-relaxed">
              Can't find what you're looking for? Reach out to the FoodBridge support team and we'll get back to you as soon as possible.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <a
              href="mailto:support@foodbridge.org"
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary-dark transition-colors shadow-sm"
            >
              <Mail className="h-4 w-4" />
              Email Support
            </a>
            <a
              href="mailto:feedback@foodbridge.org"
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-surface text-text-primary border border-border text-sm font-semibold hover:bg-background-subtle hover:border-border-strong transition-colors"
            >
              <MessageSquare className="h-4 w-4" />
              Send Feedback
            </a>
          </div>
        </div>
      </Card>
    </PageContent>
  );
}

export default HelpFaqPage;
