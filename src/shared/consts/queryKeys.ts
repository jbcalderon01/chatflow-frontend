export const queryKeys = {
  users: {
    me: ["users", "me"],
  },
  conversations: {
    me: ["conversations", "me"],
    id: (id: string) => ["conversations", "id", id],
  },
  projects: {
    all: ["projects", "all"],
  },
  dashboard: {
    metrics: ["dashboard", "metrics"],
  },
};
