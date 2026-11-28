import type { PreviewKey } from "../../data/features";
import { AnalyticsMockup, InboxMockup, PipelineMockup } from "./crm";
import { BroadcastMockup, CalendarMockup, CommentDmMockup } from "./flows";
import { IntegrationsMockup, TeamMockup } from "./system";

const MOCKUPS: Record<
  PreviewKey,
  (props: { className?: string }) => JSX.Element
> = {
  inbox: InboxMockup,
  broadcast: BroadcastMockup,
  commentDm: CommentDmMockup,
  pipeline: PipelineMockup,
  analytics: AnalyticsMockup,
  team: TeamMockup,
  integrations: IntegrationsMockup,
  calendar: CalendarMockup,
};

const MOCKUP_DESCRIPTIONS: Record<PreviewKey, string> = {
  inbox: "Interactive mockup of GTMSip multi-agent WhatsApp and Instagram shared team inbox",
  broadcast: "Mockup of GTMSip template broadcast campaign builder and drip flow sequences",
  commentDm: "Mockup of GTMSip Instagram comment-to-DM automated responder and lead capture",
  pipeline: "Mockup of GTMSip visual CRM deal pipeline with in-chat Razorpay payment links",
  analytics: "Mockup of GTMSip analytics dashboard showing first response time and Meta ads attribution",
  team: "Mockup of GTMSip multi-brand workspace management and role-based permissions",
  integrations: "Mockup of GTMSip Claude Model Context Protocol (MCP) and HMAC webhook integrations",
  calendar: "Mockup of GTMSip multi-channel social content planning and publishing calendar",
};

export function Mockup({
  name,
  className,
}: {
  name: PreviewKey;
  className?: string;
}) {
  const Component = MOCKUPS[name] ?? InboxMockup;
  const description = MOCKUP_DESCRIPTIONS[name] ?? "GTMSip product interface preview";
  return (
    <figure role="img" aria-label={description} className="relative">
      <Component className={className} />
    </figure>
  );
}
