export const contributionColors = {
  NONE: 'bg-bg-surface2',
  FIRST_QUARTILE: 'bg-accent/25',
  SECOND_QUARTILE: 'bg-accent/50',
  THIRD_QUARTILE: 'bg-accent/75',
  FOURTH_QUARTILE: 'bg-accent',
};

export function isGithubActivity(data, year) {
  return data?.year === year
    && Number.isInteger(data.totalContributions) && data.totalContributions >= 0
    && typeof data.username === 'string'
    && /^https:\/\/github\.com\/[a-z\d-]+$/i.test(data.profileUrl)
    && Array.isArray(data.weeks) && data.weeks.length > 0 && data.weeks.length <= 54
    && data.weeks.every((week) => Array.isArray(week?.contributionDays)
      && week.contributionDays.length > 0 && week.contributionDays.length <= 7
      && week.contributionDays.every((day) => /^\d{4}-\d{2}-\d{2}$/.test(day?.date)
        && Number.isInteger(day.count) && day.count >= 0
        && Number.isInteger(day.weekday) && day.weekday >= 0 && day.weekday <= 6
        && Object.hasOwn(contributionColors, day.level)));
}
