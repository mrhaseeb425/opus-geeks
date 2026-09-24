// Single source for every company number shown on the site: Home stat cards,
// About stats, Portfolio header, the Home culture section, Careers copy and
// page meta all read from here, so a figure can never disagree with itself.

export const COMPANY = {
  name: "Opus Geeks",
  teamSize: 26,
  cities: ["Karachi", "Florida"],
  offices: 2,
};

// Team size is always shown as the exact figure ("26"), never rounded.
export const TEAM_SIZE_LABEL = String(COMPANY.teamSize);

// `value` is what CountUp animates to; it always lands on exactly this text.
// TODO(content): confirm Happy Clients, Projects Completed and Awards Won
// before launch. Remove any figure that can't be backed up.
export const STATS = [
  { key: "clients", label: "Happy clients", value: "120+", icon: "users" },
  {
    key: "projects",
    label: "Projects delivered",
    value: "180+",
    icon: "briefcase",
  },
  { key: "team", label: "Team members", value: TEAM_SIZE_LABEL, icon: "layers" },
  { key: "awards", label: "Awards won", value: "12+", icon: "award" },
];

export const statValue = (key) => STATS.find((stat) => stat.key === key)?.value;
