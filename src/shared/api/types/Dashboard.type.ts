export type GetDashboardMetricsResponse = {
  totalLeads: number;
  totalUnreadMessages: number;
  totalPotentialLeads: number;
  totalMessagesRespondedToday: number;
  conversationsByPriority: {
    HIGH: number;
    MEDIUM: number;
  };
  conversationsByStatus: {
    FOLLOW_UP: number;
    ACTIVE_LEAD: number;
  };
};
