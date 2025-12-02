
const logoMap = {
  'ATL': 'hawks_logo.svg',
  'BOS': 'boston_logo.svg',
  'CHI': 'bulls_logo.svg',
  'DAL': 'dallas_logo.svg',
  'DEN': 'nuggets_logo.svg',
  'GSW': 'golden_state_logo.svg',
  'LAL': 'lakers_logo.svg',
  'MIA': 'heat_logo.svg',
  'MIL': 'bucks_logo.svg',
  'NYK': 'new_york_logo.svg',
  'OKC': 'thunder_logo.svg',
  'SAS': 'spurs_logo.svg',
};

export const getTeamLogo = (abbreviation) => {
  if (!abbreviation) return '';
  const filename = logoMap[abbreviation.toUpperCase()];
  if (filename) {
    return `/nba_logos/${filename}`;
  }
  return '';
};
