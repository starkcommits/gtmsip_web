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

export function Mockup({
  name,
  className,
}: {
  name: PreviewKey;
  className?: string;
}) {
  const Component = MOCKUPS[name] ?? InboxMockup;
  return <Component className={className} />;
}
